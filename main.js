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

        data.forEach(region => { // วนลูปเพื่อดึงข้อมูลภูมิภาค
            console.log("ภูมิภาค : " + region.region); // แสดงภูมิภาค
            regionArray.push(region.region); // เพิ่มภูมิภาคลงใน array
            region.dam.forEach(dam => { // วนลูปเพื่อดึงข้อมูลเขื่อน
                console.log("ชื่อ : " + dam.name); // แสดงชื่อเขื่อน
                namedamArray.push(dam.name); // เพิ่มชื่อเขื่อนลงใน array
                
                console.log("ปริมาณที่กักเก็บ : " + dam.storage + " "+ unit); // แสดงปริมาณที่กักเก็บ
                storageArray.push(dam.storage); // เพิ่มปริมาณที่กักเก็บลงใน array
                
                console.log("ปริมาณที่กักเก็บสูงสุด : " + dam.capacity +" " +  unit); // แสดงปริมาณที่กักเก็บสูงสุด
                capacityArray.push(dam.capacity); // เพิ่มปริมาณที่กักเก็บสูงสุดลงใน array
                console.log("เจ้าของ : " + dam.owner); // แสดงเจ้าของเขื่อน
                ownerArray.push(dam.owner); // เพิ่มเจ้าของเขื่อนลงใน array
                active_storageArray.push(dam.active_storage); // เพิ่มปริมาณน้ำที่ใช้ได้ลงใน array
                dead_storageArray.push(dam.dead_storage); // เพิ่มปริมาณน้ำที่ใช้ไม่ได้ลงใน array
                volumeArray.push(dam.volume); 
                percent_storageArray.push(dam.percent_storage);     
                init(namedamArray,storageArray,capacityArray,ownerArray,active_storageArray,dead_storageArray,volumeArray,percent_storageArray); // เรียกใช้ฟังก์ชัน init
            });
            
        });
    });

    
}
datadam(); 

function init(namedamArray,storageArray,capacityArray,ownerArray,active_storageArray,dead_storageArray,volumeArray,percent_storageArray) { // ฟังก์ชัน init สำหรับแสดงผลข้อมูล
    // พิกัดเขื่อน
    var detailTextarray = []
    const Longitude = ["99.12266322806133","99.62560355263315","99.64294322934713","100.42160001638017","99.41126708215302","98.97268331056529","100.56359048755601","99.03423685564","102.62022567641446","103.7430287433701"
    ,"103.44146131403791","101.56058913168101","101.78087786051069","102.14764393352284","102.24924087404906","102.760262627293","103.9731070183201","101.64974556054497","102.61898275731708","105.43011042244777"
    ,"101.05999133758326","99.43310208139135","99.67146616154585","99.1249846939014","98.68765885442677","101.32160605560233","101.65128060980906","100.97726347863085","101.26522390317758","101.56235843828713","102.03218429393267"
    ,"99.79422001453311","99.62760708336137","98.8060051027748","101.27083039729656"]; 
    const Latitude = ["18.924875160076116","18.52344284300219","18.809254588395685","17.189584177366743","17.324265983811234","17.242694628017123","17.764062677298583","19.175241730573095"
    ,"17.369525355890246","17.309185336272172","16.60235987598631","14.865217750798084","14.505516883391001","14.483795743223821","14.402613895151704","14.300152011817762","16.978103714309814"
    ,"16.535659057019267","16.775605934195433","15.205624224129815","14.866406314737441","15.540691006494155","14.840408139745358","14.410877917568946","14.830886930090456","14.314203092174996"
    ,"13.433985308754838","13.205243432600728","12.946599904635278","12.98542875727285","14.075240787362631","12.457276117910444","12.914894575420938","8.972541376396636","6.157523473115944"]

    var map = new longdo.Map({ // สร้างแผนที่
        placeholder: document.getElementById('map') // กำหนดตำแหน่งที่แสดงแผนที่
    });    
    
    for(var i = 0; i < Longitude.length; i++){
        var detailText = `เจ้าของ : ${ownerArray[i]} <br> ปริมาณที่กักเก็บ : ${storageArray[i]} ล้านลูกบาศก์เมตร<br> 
        ปริมาณที่กักเก็บสูงสุด : ${capacityArray[i]} ล้านลูกบาศก์เมตร<br>
        ปริมาณน้ำที่ใช้ได้ : ${active_storageArray[i]} ล้านลูกบาศก์เมตร<br>
        ปริมาณน้ำที่ใช้ไม่ได้ : ${dead_storageArray[i]} ล้านลูกบาศก์เมตร<br>
        ปริมาณน้ำในเขื่อน : ${volumeArray[i]} ล้านลูกบาศก์เมตร<br>
        เปอร์เซนต์ปริมาณน้ำต่อปริมาณกักเก็บ: ${percent_storageArray[i]} %`; // สร้างตัวแปร detailText เพื่อเก็บข้อความที่จะแสดงใน popup
        detailTextarray.push(detailText)
    }
    createmaker(map,namedamArray,detailTextarray,Longitude,Latitude,detailTextarray);
}
function createmaker(map,namedamArray,detailTextarray,Longitude,Latitude){

    //ภาคเหนือ
    // เขื่อนเชียงใหม่
    const ChiangMaiLongitude = ["99.12266322806133","99.03423685564"]
    const ChiangMaiLatitude = ["18.924875160076116","19.175241730573095"]
    const ChiangMaidamname = ["เขื่อนแม่กวงอุดมธารา","เขื่อนแม่งัดสมบูรณ์ชล"]
    var detailTextchiangmaiarray = []
    detailTextchiangmaiarray.push(detailTextarray[0],detailTextarray[7])
    //เขื่อนลำปาง
    const LampangLongitude = ["99.62560355263315","99.64294322934713","99.41126708215302"]
    const LampangLatitude = ["18.52344284300219","18.809254588395685","17.324265983811234"]
    const Lampangdamnname = ["เขื่อนกิ่วลม","เขื่อนกิ่วคอหมา","เขื่อนแม่มอก"]
    var detailTextlampangarray = []
    detailTextlampangarray.push(detailTextarray[1],detailTextarray[2],detailTextarray[4])
    //เขื่อนพิษณุโลก
    const Phitsanuloklongitude = ["100.42160001638017"]
    const PhitsanulokLatitude = ["17.189584177366743"]
    const Phitsanulokdamnname = ["เขื่อนแควน้อยบำรุงแดน"]
    var detailTextphitsanulokarray = []
    detailTextphitsanulokarray.push(detailTextarray[3])
    //เขื่อนตาก
    const Taklongitude = ["98.97268331056529"]
    const TakLatitude = ["17.242694628017123"]
    const Takdamnname = ["เขื่อนภูมิพล"]
    var detailTexttakarray = []
    detailTexttakarray.push(detailTextarray[5])
    // เขื่อนอุตรดิตถ์
    const Uttaraditlongitude = ["100.56359048755601"]
    const UttaraditLatitude = ["17.764062677298583"]
    const Uttaraditdamnname = ["เขื่อนสิริกิติ์"]
    var detailTextuttaraditarray = []
    detailTextuttaraditarray.push(detailTextarray[6])

    //ภาพตะวันออกเฉียงเหนือ
    //เขื่อนอุดรธานี
    const UdonThanilongitude = ["102.62022567641446"]
    const UdonThaniLatitude = ["17.369525355890246"]
    const UdonThanidamname = ["เขื่อนห้วยหลวง"]
    var detailTextudonthaniarray = []
    detailTextudonthaniarray.push(detailTextarray[8])
    //เขื่อนนสกลนคร
    const SakonNakhonlongitude = ["103.7430287433701","103.9731070183201"]
    const SakonNakhonLatitude = ["17.309185336272172","16.978103714309814"]
    const SakonNakhondamname = ["เขื่อนน้ำอูน","เขื่อนน้ำพุง"]
    var detailTextsakonnakhonarray = []
    detailTextsakonnakhonarray.push(detailTextarray[9],detailTextarray[16])
    //เขื่อนกาฬสินธุ์
    const Kalasinlongitude = ["103.44146131403791"]
    const KalasinLatitude = ["16.60235987598631"]
    const Kalasindamname = ["เขื่อนลำปาว"]
    var detailTextkalasinarray = []
    detailTextkalasinarray.push(detailTextarray[10])
    //เขื่อนนครราชสีมา
    const NakhonRatchasimalongitude = ["101.56058913168101","101.78087786051069","102.14764393352284","102.24924087404906"]
    const NakhonRatchasimaLatitude = ["14.865217750798084","14.505516883391001","14.483795743223821","14.402613895151704"]
    const NakhonRatchasimadamname = ["เขื่อนลำตะคอง","เขื่อนลำพระเพลิง","เขื่อนมูลบน ","เขื่อนลำแซะ"]
    var detailTextnakhonratchasimaarray = []
    detailTextnakhonratchasimaarray.push(detailTextarray[11],detailTextarray[12],detailTextarray[13],detailTextarray[14])
    //เขื่อนบุรีรัมย์
    const Buriramlongitude = ["102.760262627293"]
    const BuriramLatitude = ["14.300152011817762"]
    const Buriramdamname = ["เขื่อนลำนางรอง"]
    var detailTextburiramarray = []
    detailTextburiramarray.push(detailTextarray[15])
    //เขื่อนชัยภูมิ
    const Chaiyaphumlongitude = ["101.64974556054497"]
    const ChaiyaphumLatitude = ["16.535659057019267"]
    const Chaiyaphumdamname = ["เขื่อนจุฬาภรณ์"]
    var detailTextchaiyaphumarray = []
    detailTextchaiyaphumarray.push(detailTextarray[17])
    //เขื่อนขอนแก่น
    const KhonKaenlongitude = ["102.61898275731708"]
    const KhonKaenLatitude = ["16.775605934195433"]
    const KhonKaendamname = ["เขื่อนอุบลรัตน์"]
    var detailTextkhonkaenarray = []
    detailTextkhonkaenarray.push(detailTextarray[18])
    //เขื่อนอุบลราชธานี
    const UbonRatchathanilongitude = ["105.43011042244777"]
    const UbonRatchathaniLatitude = ["15.205624224129815"]
    const UbonRatchathanidamname = ["เขื่อนสิรินธร"]
    var detailTextubonratchathanilarray = []
    detailTextubonratchathanilarray.push(detailTextarray[19])


    for(var i = 0; i < Longitude.length; i++){
        var marker = new longdo.Marker({ lon: Longitude[i], lat: Latitude[i] },  
        {
        title: namedamArray[i], // กำหนดชื่อ marker
        icon: { 
            url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
            offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
            detail: detailTextarray[i] // กำหนดข้อความใน popup
            
        
        });
        map.Overlays.add(marker);
    }
    // ตัวเลือกจังหวัด
    const uprovince = document.getElementById("province");
    uprovince.addEventListener('change', function () {
        map.Overlays.clear();
        if(uprovince.value == "Default"){    
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: Longitude[i], lat: Latitude[i] },  
                {
                title: namedamArray[i], // กำหนดชื่อ marker
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                    detail: detailTextarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker);
            }
        } else if(uprovince.value == "ChiangMai"){
                    for(var i = 0; i < Longitude.length; i++){
                    var marker = new longdo.Marker({ lon: ChiangMaiLongitude[i], lat: ChiangMaiLatitude[i] },  
                    {
                    title: ChiangMaidamname[i], // กำหนดชื่อ marker
                    icon: { 
                        url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
                        offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                        detail: detailTextchiangmaiarray[i] // กำหนดข้อความใน popup
                    });
                    map.Overlays.add(marker); // แสดง marker บนแผนที่
            }
        }

         else if(uprovince.value == "Lampang"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: LampangLongitude[i], lat: LampangLatitude[i] },  
                {
                title: Lampangdamnname[i], // กำหนดชื่อ marker
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                    detail: detailTextlampangarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker); // แสดง marker บนแผนที่
            }
        }else if(uprovince.value == "Phitsanulok"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: Phitsanuloklongitude[i], lat: PhitsanulokLatitude[i] },  
                {
                title: Phitsanulokdamnname[i], // กำหนดชื่อ marker
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                    detail: detailTextphitsanulokarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker); // แสดง marker บนแผนที่
            }
        } else if(uprovince.value == "Tak"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: Taklongitude[i], lat: TakLatitude[i] },  
                {
                title: Takdamnname[i], // กำหนดชื่อ marker
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                    detail: detailTexttakarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker); // แสดง marker บนแผนที่
            }
        } else if(uprovince.value == "Uttaradit"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: Uttaraditlongitude[i], lat: UttaraditLatitude[i] },  
                {
                title: Uttaraditdamnname[i], // กำหนดชื่อ marker
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                    detail: detailTextuttaraditarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker); // แสดง marker บนแผนที่
            }
        } else if(uprovince.value == "UdonThani"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: UdonThanilongitude[i], lat: UdonThaniLatitude[i] },  
                {
                title: UdonThanidamname[i], // กำหนดชื่อ marker
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                detail: detailTextudonthaniarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker); // แสดง marker บนแผนที่
            }
        } else if(uprovince.value == "SakonNakhon"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: SakonNakhonlongitude[i], lat: SakonNakhonLatitude[i] },  
                {
                title: SakonNakhondamname[i], // กำหนดชื่อ marker
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png', // กำหนด icon ของ marker
                    offset: { x: 12, y: 45 }}, // กำหนดตำแหน่งของ icon ของ marker
                
                detail: detailTextsakonnakhonarray[i] // กำหนดข้อความใน popup
                });
                map.Overlays.add(marker); // แสดง marker บนแผนที่
            }
        } else if(uprovince.value == "Kalasin"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: Kalasinlongitude[i], lat: KalasinLatitude[i] },  
                {
                title: Kalasindamname[i], // กำหนดชื่อ marker
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                    offset: { x: 12, y: 45 }},
                detail: detailTextkalasinarray[i]
                })
                map.Overlays.add(marker); 
            }
        } else if(uprovince.value == "NakhonRatchasima"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: NakhonRatchasimalongitude[i], lat: NakhonRatchasimaLatitude[i] },  
                {
                title: NakhonRatchasimadamname[i], 
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                    offset: { x: 12, y: 45 }},
                detail: detailTextnakhonratchasimaarray[i]
                });
                map.Overlays.add(marker); 
            }
        } else if(uprovince.value == "Buriram"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: Buriramlongitude[i], lat: BuriramLatitude[i] },  
                {
                title: Buriramdamname[i], 
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                    offset: { x: 12, y: 45 }},
                detail: detailTextburiramarray[i]
                });
                map.Overlays.add(marker); 
            }
        } else if(uprovince.value == "Chaiyaphum"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: Chaiyaphumlongitude[i], lat: ChaiyaphumLatitude[i] },  
                {
                title: Chaiyaphumdamname[i], 
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                    offset: { x: 12, y: 45 }},
                detail: detailTextchaiyaphumarray[i]
                });
                map.Overlays.add(marker); 
            }
        } else if(uprovince.value == "KhonKaen"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: KhonKaenlongitude[i], lat: KhonKaenLatitude[i] },  
                {
                title: KhonKaendamname[i], 
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                    offset: { x: 12, y: 45 }},
                detail: detailTextkhonkaenarray[i]
                });
                map.Overlays.add(marker); 
            }
        } else if(uprovince.value == "UbonRatchathani"){
            for(var i = 0; i < Longitude.length; i++){
                var marker = new longdo.Marker({ lon: UbonRatchathanilongitude[i], lat: UbonRatchathaniLatitude[i] },  
                {
                title: UbonRatchathanidamname[i], 
                icon: { 
                    url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
                    offset: { x: 12, y: 45 }},
                detail: detailTextubonratchathanilarray[i]
                });
                map.Overlays.add(marker); 
            }
        }
    });
}