const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const appid = "460000a9c169e1ecc9ea0c9eecec39e4";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routers = require('./routes/router');
app.use('/', routers);

app.post('/test', async (req, res) => {
    try {
        const lon = req.body.lon;
        const lat = req.body.lat;
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric&lang=th`);
        const weatherData = []
        weatherData.push(weather.data);
        res.json(weatherData);
    } catch (error) {
        console.error('Error in /test endpoint:', error);

        if (error.response && error.response.status) {
            return res.status(error.response.status).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
