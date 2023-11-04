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

// app.get('/test',async (req, res) => {
//     try{    
//         var final = [];
//         const response = await axios.get("https://app.rid.go.th/reservoir/api/dam/public");
//         const dammm = response.data.data;
//         dammm.forEach(region => {
//             console.log(dammm);
//             final = [{
//                 region: region.region,
//                 dam: region.dam,
//             }]
//             // region.dam.forEach(dam => {
//             //     console.log("ชื่อ : " + dam.name);
//             //     namedam = dam.name
//             //     console.log("ปริมาณที่กักเก็บ : " + dam.storage + " "+ unit);
//             //     console.log("ปริมาณที่กักเก็บสูงสุด : " + dam.capacity +" " +  unit);
//             //     console.log("เจ้าของ : " + dam.owner);
//             // });

            
//         });
        
//         res.send(final);
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//     }
// });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});