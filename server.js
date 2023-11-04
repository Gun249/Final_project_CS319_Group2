const express = require('express');
const axios = require('axios');
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();
const PORT = 3000;  
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/api',async (req, res) => {
    try{    
        const response = await axios.get("https://app.rid.go.th/reservoir/api/dam/public");
        res.send(response.data);
        
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});