function datadam(){ 
    unit = "ล้านลูกบาศก์เมตร"
    axios({
        method: 'get',
        url: 'http://localhost:3000/api'
    })
    .then(function (response) {
        const data = response.data.data;
        const namedamArray = [];
        const regionArray = [];
        const storageArray = [];
        const capacityArray = [];
        const ownerArray = [];

        data.forEach(region => {
            console.log("ภูมิภาค : " + region.region);
            regionArray.push(region.region);
            region.dam.forEach(dam => {
                console.log("ชื่อ : " + dam.name);
                namedamArray.push(dam.name);
                console.log("ปริมาณที่กักเก็บ : " + dam.storage + " "+ unit);
                storageArray.push(dam.storage);
                
                console.log("ปริมาณที่กักเก็บสูงสุด : " + dam.capacity +" " +  unit);
                capacityArray.push(dam.capacity);
                console.log("เจ้าของ : " + dam.owner);
                ownerArray.push(dam.owner);
                init(namedamArray,storageArray,capacityArray);
            });
            
        });
    });

    
}

datadam();

function init(namedamArray,storageArray,capacityArray) {
    // พิกัดเขื่อน
    
    const Longitude = ["99.12266322806133","99.62560355263315","99.64294322934713","100.42160001638017","99.41126708215302","98.97268331056529","100.56359048755601","99.03423685564","102.62022567641446","103.7430287433701"
    ,"103.44146131403791","101.56058913168101","101.78087786051069","102.14764393352284","102.24924087404906","102.760262627293","103.9731070183201","101.64974556054497","102.61898275731708","105.43011042244777"
    ,"101.05999133758326","99.43310208139135","99.67146616154585","99.1249846939014","98.68765885442677","101.32160605560233","101.65128060980906","100.97726347863085","101.26522390317758","101.56235843828713","102.03218429393267"
    ,"99.79422001453311","99.62760708336137","98.8060051027748","101.27083039729656"];
    const Latitude = ["18.924875160076116","18.52344284300219","18.809254588395685","17.189584177366743","17.324265983811234","17.242694628017123","17.764062677298583","19.175241730573095"
    ,"17.369525355890246","17.309185336272172","16.60235987598631","14.865217750798084","14.505516883391001","14.483795743223821","14.402613895151704","14.300152011817762","16.978103714309814"
    ,"16.535659057019267","16.775605934195433","15.205624224129815","14.866406314737441","15.540691006494155","14.840408139745358","14.410877917568946","14.830886930090456","14.314203092174996"
    ,"13.433985308754838","13.205243432600728","12.946599904635278","12.98542875727285","14.075240787362631","12.457276117910444","12.914894575420938","8.972541376396636","6.157523473115944"]
    var map = new longdo.Map({
        placeholder: document.getElementById('map')
    });
    map.Event.bind('overlayClick', function(event) {

    });
for(var i = 0; i < Longitude.length; i++){
        // var detailText =  "ปริมาณที่กักเก็บ : " + storageArray[i] + " ล้านลูกบาศก์เมตร\n" +
        //     "ปริมาณที่กักเก็บสูงสุด : " + capacityArray[i] + " ล้านลูกบาศก์เมตร" ;    
        var marker = new longdo.Marker({ lon: Longitude[i], lat: Latitude[i] },
        {
        title: namedamArray[i],
        icon: {
            url: 'https://map.longdo.com/mmmap/images/pin_mark.png',
            offset: { x: 12, y: 45 }},
            // detail: detailText,
            // draggable: true
            
        
        });
        map.Overlays.add(marker);
    }
}