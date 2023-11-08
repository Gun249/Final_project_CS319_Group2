// ก่อนจะเริ่ม run ให้พิมพ์คำสั่ง npm i ก่อนเพื่อติดตั้ง package ที่จำเป็น
// หลังจากนั้นให้พิมพ์คำสั่ง npm start เพื่อเริ่มรัน server
// 
const express = require('express'); // ใช้ express ในการเชื่อมต่อ server และ client
const axios = require('axios'); // ใช้ axios ในการดึงข้อมูลจาก api
const cors = require('cors'); // ใช้ cors ในการเชื่อมต่อ server และ client
var bodyParser = require('body-parser')  // ใช้ body-parser ในการดึงข้อมูลจาก api
const app = express(); 
const PORT = 3000;   // ใช้ port 3000
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))  
app.use(bodyParser.json())

app.get('/api',async (req, res) => {
    try{    
        const response = await axios.get("https://app.rid.go.th/reservoir/api/dam/public"); // ดึงข้อมูลจาก api โดยใช้ axios
        res.send(response.data); // ส่งข้อมูลกลับไปยัง client
        
    }
    catch(error){
        console.log(error); // แสดง error ใน console
        res.status(500).send("Internal Server Error"); // ส่ง error 500 กลับไปยัง client
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`); // แสดงข้อความเมื่อ server ทำงาน
});