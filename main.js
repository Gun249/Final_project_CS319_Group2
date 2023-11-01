const express = require('express');
const axios = require('axios');
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();
const PORT = 3000;  
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});