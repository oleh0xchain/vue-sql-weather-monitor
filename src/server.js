import express from 'express';
import sql from 'mssql';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
    user: 'group8',
    password: 'Zxcqwe123!!',
    server: 'weathergroup8.database.windows.net/',
    database: 'weather8',
    options: {
        encrypt: true,
        trustServerCertificate: true,
        connectTimeout: 30000,
    },
};

// Test the connection
async function testDatabaseConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Database connected successfully!');
        pool.close(); // Close the connection after testing
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

testDatabaseConnection();

// API endpoint to fetch weather data based on location
app.get('/weather', async (req, res) => {
    console.log('Weather endpoint accessed');
    const { location } = req.query; // Получаем местоположение из параметра запроса
    console.log(`Backend: Location parameter is ${location}`);
    let deviceId;


    // Определяем device_id на основе переданного местоположения
    switch (location) {
        case 'Enschede':
            console.log('Matched case: Enschede');
            deviceId = 'lht-saxion';
            break;
        case 'Wierden':
            console.log('Matched case: Wierden');
            deviceId = 'lht-wierden';
            break;
        case 'Gronau':
            console.log('Matched case: Gronau');
            deviceId = 'lht-gronau';
            break;
        case 'Lora':
            try {
                const pool = await sql.connect(dbConfig);

                const query = `
                    SELECT 
                        lora.message_id,
                        lora.illumination,
                        lora.pressure,
                        lora.temperature,
                        lora.rssi AS connection_status,
                        lora.timestamp,
                        lora.humidity
                    FROM dbo.lora lora
                    ORDER BY lora.timestamp DESC;
                `;

                console.log('Executing query for Enschede (our sensor):', query);

                const result = await pool.request().query(query);

                res.json(result.recordset);
                pool.close();
                return; // Выходим из функции, т.к. запрос обработан
            } catch (err) {
                console.error('Ошибка запроса для Enschede (our sensor):', err.message);
                res.status(500).json({ error: 'Ошибка сервера при получении данных для Enschede (our sensor)' });
                return;
            }
        default:
            return res.status(400).json({ error: 'Invalid location' });
    }


    try {
        const pool = await sql.connect(dbConfig);

        const query = `
            SELECT TOP 1
                    um.device_id,
                    um.message_id,
                   lht.battery_voltage,
                   lht.battery_status,
                   lht.illumination,
                   lht.humidity,
                   lht.temperature,
                   rx.rssi
            FROM [wet].[uplink_messages] um
                LEFT JOIN [wet].[lht_data] lht
            ON um.message_id = lht.message_id
                LEFT JOIN [wet].[rx_metadata] rx
                ON um.message_id = rx.message_id
            WHERE um.device_id = @deviceId
            ORDER BY um.message_id DESC;

        `;

        const result = await pool.request()
            .input('deviceId', sql.NVarChar, deviceId) // Указываем device_id как параметр
            .query(query);

        res.json(result.recordset); // Возвращаем результат
        pool.close();
    } catch (err) {
        console.error('Ошибка запроса:', err.message);
        res.status(500).send('Ошибка сервера при получении данных о погоде');
    }
});


app.get('/weather/:location', async (req, res) => {
    const { location } = req.params;
    console.log('Received location:', location);
    const { parameter, timeRange } = req.query;

    // Определяем deviceId на основе местоположения
    let deviceId;
    let isLoraSensor = false;

    switch (location) {
        case 'Enschede':
            deviceId = 'lht-saxion';
            break;
        case 'Wierden':
            deviceId = 'lht-wierden';
            break;
        case 'Gronau':
            deviceId = 'lht-gronau';
            break;
        case 'Lora':
            isLoraSensor = true; // Помечаем, что данные берутся из таблицы `dbo.lora`
            break;
        default:
            return res.status(400).json({ error: 'Invalid location' });
    }

    // Определяем временной диапазон для фильтрации данных
    let timeCondition;
    switch (timeRange) {
        case '1day':
            timeCondition = 'timestamp >= DATEADD(day, -1, GETDATE())';
            break;
        case '3days':
            timeCondition = 'timestamp >= DATEADD(day, -3, GETDATE())';
            break;
        case '7days':
            timeCondition = 'timestamp >= DATEADD(day, -7, GETDATE())';
            break;
        default:
            return res.status(400).json({ error: 'Invalid time range' });
    }

    try {
        const pool = await sql.connect(dbConfig);

        let query;

        // Строим запрос в зависимости от типа сенсора
        if (isLoraSensor) {
            // Запрос для нового сенсора `Lora`
            query = `
                SELECT
                    message_id,
                    ${parameter} AS parameter_value,
                    timestamp
                FROM dbo.lora
                WHERE ${timeCondition}
                ORDER BY timestamp ASC;
            `;
        } else {
            // Запрос для старых сенсоров
            query = `
                SELECT um.device_id,
                       um.message_id,
                       lht.${parameter} AS parameter_value,
                       um.timestamp
                FROM [wet].[uplink_messages] um
                JOIN [wet].[lht_data] lht
                ON um.message_id = lht.message_id
                WHERE um.device_id = @deviceId AND ${timeCondition}
                ORDER BY um.timestamp ASC;
            `;
        }

        // Выполняем запрос к базе данных
        const result = await pool.request()
            .input('deviceId', sql.NVarChar, deviceId) // `deviceId` только для старых сенсоров
            .query(query);

        res.json(result.recordset); // Возвращаем результат
        pool.close();
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send('Server error while fetching weather data');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is hosting on http://localhost:${PORT}`);
});
