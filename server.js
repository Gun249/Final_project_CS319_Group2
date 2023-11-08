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


const routers = require('./routes/router'); // ใช้ router ในการเชื่อมต่อ server และ client
app.use('/', routers); // ใช้ router ในการเชื่อมต่อ server และ client


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`); // แสดงข้อความเมื่อ server ทำงาน
});