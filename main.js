function datadam(){ 
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
                // console.log("ชื่อ : " + dam.name); // แสดงชื่อเขื่อน
                namedamArray.push(dam.name); // เพิ่มชื่อเขื่อนลงใน array
                
                // console.log("ปริมาณที่กักเก็บ : " + dam.storage + " "+ unit); // แสดงปริมาณที่กักเก็บ
                storageArray.push(dam.storage); // เพิ่มปริมาณที่กักเก็บลงใน array
                
                // console.log("ปริมาณที่กักเก็บสูงสุด : " + dam.capacity +" " +  unit); // แสดงปริมาณที่กักเก็บสูงสุด
                capacityArray.push(dam.capacity); // เพิ่มปริมาณที่กักเก็บสูงสุดลงใน array
                // console.log("เจ้าของ : " + dam.owner); // แสดงเจ้าของเขื่อน
                ownerArray.push(dam.owner); // เพิ่มเจ้าของเขื่อนลงใน array
                active_storageArray.push(dam.active_storage); // เพิ่มปริมาณน้ำที่ใช้ได้ลงใน array
                dead_storageArray.push(dam.dead_storage); // เพิ่มปริมาณน้ำที่ใช้ไม่ได้ลงใน array
                volumeArray.push(dam.volume); 
                percent_storageArray.push(dam.percent_storage);
                console.log(percent_storageArray)
                provinceArray.push(dam.province);
                latitudeArray.push(dam.lat);
                longitudeArray.push(dam.lng); 
                regionArray.push(dam.region);    
                // console.log(regionArray)
                
                init(namedamArray,storageArray,capacityArray,ownerArray,active_storageArray,dead_storageArray,volumeArray,percent_storageArray,longitudeArray,provinceArray,latitudeArray,regionArray); // เรียกใช้ฟังก์ชัน init
            });
            
        });
    });
}
datadam(); 

function init(namedamArray,storageArray,capacityArray,ownerArray,active_storageArray,dead_storageArray,volumeArray,percent_storageArray,longitudeArray,provinceArray,latitudeArray,regionArray) { // ฟังก์ชัน init สำหรับแสดงผลข้อมูล
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
        เปอร์เซนต์ปริมาณน้ำต่อปริมาณกักเก็บ: ${percent_storageArray[i]} %`; // สร้างตัวแปร detailText เพื่อเก็บข้อความที่จะแสดงใน popup
        detailTextarray.push(detailText)
    }
    createmaker(map,namedamArray,detailTextarray,longitudeArray,provinceArray,latitudeArray,regionArray,percent_storageArray);
}
function createmaker(map,namedamArray,detailTextarray,longitudeArray,provinceArray,latitudeArray,regionArray,percent_storageArray){
    for(var i = 0; i < longitudeArray.length; i++){

        var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i]},  
        {
        title: namedamArray[i], // กำหนดชื่อ marker
        icon: { 
            url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
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
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
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
                            url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
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
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
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
                            url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
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
    
        btn.addEventListener('click', function () {
            console.log("Button clicked: " + this.value);
            map.Overlays.clear();
    
            if (this.value == "Default") {
                for (let j = 0; j < percent_storageArray.length; j++) {
                    console.log("Creating marker for Default");
                    var marker = new longdo.Marker({ lon: longitudeArray[j], lat: latitudeArray[j]},  
                    {
                        title: namedamArray[j],
                        icon: { 
                            url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                            offset: { x: 12, y: 45 }
                        },
                        detail: detailTextarray[j]
                    });
                    map.Overlays.add(marker);
                }
            } else {
                
                for (let j = 0; j < percent_storageArray.length; j++) {
                    if(percent_storageArray[j] != null){
                        if (this.value >= percent_storageArray[j]) {
                            
                            console.log("Creating marker for value: " + this.value);
                            var marker = new longdo.Marker({ lon: longitudeArray[j], lat: latitudeArray[j] },  
                            {
                                title: namedamArray[j],
                                icon: {
                                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                                    offset: { x: 12, y: 45 }
                                },
                                detail: detailTextarray[j]
                            });
                            map.Overlays.add(marker);

                    }
                    } else if(percent_storageArray[j] == null){
                        console.log("ข้อมูลยังไม่อัปเดต")
                        alert("ข้อมูลยังไม่อัปเดต");
                        break;
                    }
                }
            }
        });
    }
    
    
    

    // const storage = document.getElementById("storage");
    // var buttons = storage.getElementsByTagName("button");
    
    // for (var i = 0; i < buttons.length; i++) {
    //     var btn = buttons[i];
    
    //     btn.addEventListener('click', function () {
    //         map.Overlays.clear();
    
    //         if (this.value === "Default") {

    //         } else {
    //             for (var i = 0; i < provinceArray.length; i++) {
    //                 if (this.value === percent_storageArray[i]) {
    //                     var marker = new longdo.Marker({ lon: longitudeArray[i], lat: latitudeArray[i] },  
    //                     {
    //                         title: namedamArray[i],
    //                         icon: {
    //                             url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
    //                             offset: { x: 12, y: 45 }
    //                         },
    //                         detail: detailTextarray[i]
    //                     });
    //                     map.Overlays.add(marker);
    //                 }
    //             }
    //         }
    //     });
    // }
}