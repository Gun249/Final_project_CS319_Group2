const express = require('express'); // ใช้ express ในการเชื่อมต่อ server และ client
const router = express.Router();
const axios = require('axios'); // ใช้ axios ในการดึงข้อมูลจาก api


router.get('/api',async (req, res) => {
    const locate = require('./../map/locate.json');
    try{    
        const { data } = await axios.get("https://app.rid.go.th/reservoir/api/dam/public"); // ดึงข้อมูลจาก api โดยใช้ axios
        // res.send(data); // ส่งข้อมูลกลับไปยัง client
        const locateData = data;
        const newData = [];
        for(const i in data.data){
            const iData = data.data[i];
            // console.log(iData.region);
            const region = iData.region;
            newData[i] = {
                region: region,
                dam: []
            }
            // newData[i];
            // newData[i].region = iData.region;
            for(const dam of iData.dam) {
                const find = locate.find((item) => item.id === dam.id);
                if(find){
                    dam.lat = find.latitude;
                    dam.lng = find.longitude;
                    dam.province = find.province;
                    dam.region = find.region;
                }
                newData[i].dam.push(dam);
            }
        }
        data.data = newData;
        res.send(data);
        // res.send(newData);
    }
    catch(error){
        console.log(error); // แสดง error ใน console
        res.status(500).send("Internal Server Error"); // ส่ง error 500 กลับไปยัง client
    }
});

module.exports = router;