function datadam(rainArray){ 
    unit = "ล้านลูกบาศก์เมตร"
    axios({
        method: 'get',
        url: 'http://localhost:3000/api'
    })
    .then(function (response) {
        
        
        const data = response.data.data; // ดึงข้อมูลจาก response.data.data
        const namedamArray = []; // สร้าง array เพื่อเก็บชื่อเขื่อน
        const regionArray = []; // สร้าง array เพื่อเก็บภูมิภาค
        const storageArray = []; // สร้าง array เพื่อเก็บปริมาณที่กักเก็บ
        const capacityArray = []; // สร้าง array เพื่อเก็บปริมาณที่กักเก็บสูงสุด
        const ownerArray = []; // สร้าง array เพื่อเก็บเจ้าของเขื่อน
        const active_storageArray = []; // สร้าง array เพื่อเก็บปริมาณน้ำที่ใช้ได้
        const dead_storageArray = []; // สร้าง array เพื่อเก็บปริมาณน้ำที่ใช้ไม่ได้
        const volumeArray = []; // สร้าง array เพื่อเก็บปริมาณน้ำในเขื่อน
        const percent_storageArray = []; // สร้าง array เพื่อเก็บเปอร์เซ็นต์ปริมาณน้ำที่ใช้ได้
        const provinceArray = []; // สร้าง array เพื่อเก็บจังหวัด
        const latitudeArray = []; // สร้าง array เพื่อเก็บละติจูด
        const longitudeArray = []; // สร้าง array เพื่อเก็บลองติจูด


        data.forEach(region => { // วนลูปเพื่อดึงข้อมูลภูมิภาค
            region.dam.forEach(dam => { // วนลูปเพื่อดึงข้อมูลเขื่อน
                namedamArray.push(dam.name); // เพิ่มชื่อเขื่อนลงใน array
                storageArray.push(dam.storage); // เพิ่มปริมาณที่กักเก็บลงใน array
                capacityArray.push(dam.capacity); // เพิ่มปริมาณที่กักเก็บสูงสุดลงใน array
                ownerArray.push(dam.owner); // เพิ่มเจ้าของเขื่อนลงใน array
                active_storageArray.push(dam.active_storage); // เพิ่มปริมาณน้ำที่ใช้ได้ลงใน array
                dead_storageArray.push(dam.dead_storage); // เพิ่มปริมาณน้ำที่ใช้ไม่ได้ลงใน array
                volumeArray.push(dam.volume); 
                percent_storageArray.push(dam.percent_storage);
                provinceArray.push(dam.province);
                latitudeArray.push(dam.lat);
                longitudeArray.push(dam.lng); 
                regionArray.push(dam.region);    
            });
            
            
        });
        init(namedamArray,storageArray,capacityArray,ownerArray,active_storageArray,dead_storageArray,volumeArray,percent_storageArray,longitudeArray,provinceArray,latitudeArray,regionArray,rainArray); // เรียกใช้ฟังก์ชัน init
    });
    
}
datadam(); 

function init(namedamArray,storageArray,capacityArray,ownerArray,active_storageArray,dead_storageArray,volumeArray,percent_storageArray,longitudeArray,provinceArray,latitudeArray,regionArray,rainArray) { // ฟังก์ชัน init สำหรับแสดงผลข้อมูล
    // พิกัดเขื่อน
    var detailTextarray = []
    
    var map = new longdo.Map({ // สร้างแผนที่
        placeholder: document.getElementById('map') // กำหนดตำแหน่งที่แสดงแผนที่
    });    
    
    for(var i = 0; i < longitudeArray.length; i++){
        var detailText = `เจ้าของ : ${ownerArray[i]} <br> ปริมาณที่กักเก็บ : ${storageArray[i]} ล้านลูกบาศก์เมตร<br> 
        ปริมาณที่กักเก็บสูงสุด : ${capacityArray[i]} ล้านลูกบาศก์เมตร<br>
        ปริมาณน้ำที่ใช้ได้ : ${active_storageArray[i]} ล้านลูกบาศก์เมตร<br>
        ปริมาณน้ำที่ใช้ไม่ได้ : ${dead_storageArray[i]} ล้านลูกบาศก์เมตร<br>
        ปริมาณน้ำในเขื่อน : ${volumeArray[i]} ล้านลูกบาศก์เมตร<br>
        เปอร์เซนต์ปริมาณน้ำต่อปริมาณกักเก็บ: ${percent_storageArray[i]} % <br>
        ปริมาตรฝน ${rainArray[i]} มม.`; // สร้างตัวแปร detailText เพื่อเก็บข้อความที่จะแสดงใน popup
        detailTextarray.push(detailText)
    }
    createmaker(map,namedamArray,detailTextarray,longitudeArray,provinceArray,latitudeArray,regionArray,percent_storageArray,rainArray);
}
function createmaker(map,namedamArray,detailTextarray,longitudeArray,provinceArray,latitudeArray,regionArray,percent_storageArray,rainArray){
    for(var i = 0; i < longitudeArray.length; i++){
        if(rainArray[i] >= 0 && rainArray[i] <= 10){
            iconurl = 'img/ปักหมุดสีฟ้า.png'
    } else if(rainArray[i] > 10 && rainArray[i] <= 35){
            iconurl = 'img/ปักหมุดสีเขียว.png'

    } else if(rainArray[i] > 35 && rainArray[i] <= 90){
            iconurl = 'img/ปักหมุดสีเหลือง.png'
    } else if(rainArray[i] > 90){
            iconurl = 'img/ปักหมุดสีแดง.png'
    }
    }

    for(var i = 0; i < longitudeArray.length; i++){
        var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i]},  
        {
        title: namedamArray[i], // กำหนดชื่อ marker
        icon: { 
            url: iconurl, // กำหนด icon ของ marker
            offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
            detail: detailTextarray[i] // กำหนดข้อความใน popup
            
        
        });
        map.Overlays.add(marker);
    }
    const uprovince = document.getElementById("province");
    uprovince.addEventListener('change', function () {
        map.Overlays.clear();
        if (uprovince.value === "Default") {
            for(var i = 0; i < longitudeArray.length; i++){

                var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i]},  
                {
                title: namedamArray[i], // กำหนดชื่อ marker
                icon: { 
                    url: iconurl, // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                    detail: detailTextarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker);
            }
        } else {
            for (i = 0; i < provinceArray.length; i++) {
                if (uprovince.value === provinceArray[i]) {
                    var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i] },  
                    {
                        title: namedamArray[i],
                        icon: {
                            url: iconurl,
                            offset: { x: 12, y: 45 }
                        },
                        detail: detailTextarray[i]
                    });
                    map.Overlays.add(marker);
                }
            }
        }
    });
    const uregion = document.getElementById("region");
    uregion.addEventListener('change', function () {
        map.Overlays.clear();
        if (uregion.value === "Default") {
            for(var i = 0; i < longitudeArray.length; i++){

                var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i]},  
                {
                title: namedamArray[i], // กำหนดชื่อ marker
                icon: { 
                    url: iconurl, // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                    detail: detailTextarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker);
            }
        } else {
            for (i = 0; i < provinceArray.length; i++) {
                if (uregion.value === regionArray[i]) {
                    var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i] },  
                    {
                        title: namedamArray[i],
                        icon: {
                            url: iconurl,
                            offset: { x: 12, y: 45 }
                        },
                        detail: detailTextarray[i]
                    });
                    map.Overlays.add(marker);
                }
            }
        }

    });
    var storage = document.getElementById("storage");
    var buttons = storage.getElementsByTagName("button");
    
    for (var i = 0; i < buttons.length; i++) {
        var btn = buttons[i];
    
        btn.addEventListener('click', (function (buttonValue) {
            return function () {
                map.Overlays.clear();
                console.log("Clicked button value:", buttonValue);
    
                for (let j = 0; j < percent_storageArray.length; j++) {
                    console.log('percent_storageArray[' + j + ']:', percent_storageArray[j]);
                    
                    if (typeof percent_storageArray[j] === 'number' && !isNaN(percent_storageArray[j])) {
                        // Parse buttonValue as a float
                        var floatValue = parseFloat(buttonValue);
    
                        if (!isNaN(floatValue) && floatValue <= percent_storageArray[j]) {
                            var marker = new longdo.Marker({ lon: longitudeArray[j], lat: latitudeArray[j] },
                                {
                                    title: namedamArray[j],
                                    icon: {
                                        url: iconurl,
                                        offset: { x: 12, y: 45 }
                                    },
                                    detail: detailTextarray[j]
                                });
    
                            map.Overlays.add(marker);
                        }
                    } else {
                        console.log('Invalid value for percent_storageArray[' + j + ']:', percent_storageArray[j]);
                    }
                }
            };
        })(btn.value));
    }
    
}

function updateProvinces() {
    var selectedRegion = document.getElementById("region").value;
    var allProvinceGroups = document.getElementsByClassName("province-group");
    for (var i = 0; i < allProvinceGroups.length; i++) {
        allProvinceGroups[i].style.display = "none";
    }
    var selectedProvinceGroup = document.getElementById(selectedRegion);
    if (selectedProvinceGroup) {
        selectedProvinceGroup.style.display = "block";
    }
}


function weatherData(){
    axios.get("json/weather-data.json")
    .then(function (response) {
        const weather = response.data
        const weatherArray = Object.values(weather)
        var rainArray = []
        weatherArray.forEach(base => {
            if(base.rain === undefined){
                rainArray.push(0)
            }else{
                rain = Object.values(base.rain)
                rainArray.push(rain)
            }
        });
        console.log(rainArray)
        
    datadam(rainArray)
    })
    .catch(err => console.log(err))
}
weatherData()


