<template>
    <div id='dmap'>
    
        <input v-model="myPlace" placeholder="원하는 병원을 입력하세요">
        <button v-on:click="find">찾기</button>
        <br>
        <br>
        <button v-on:click="hos"> 주변 병원찾기</button>
        <p></p>
        <div id="map" style='width:100%; height:500px'></div>
       <br>

    </div>
</template>

<script>

var map=null;
var markers = [];

var positions=new Array();
var data=new Array()
var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";


export default {
    name:'dmap',
    data(){
        return{
            myPlace:"",
            map:null,
        }
    },

    created(){

        //주소 저장
        let add,lat,lng;
        // 주소-좌표 변환 객체를 생성합니다
        let geocoder;
        const scope = this;

        this.$http.get('/map/user').then((result)=>{

            add=result.data.address
            console.log(add)
            geocoder= new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(add, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                lat=result[0].y
                lng=result[0].x
                console.log(lat)
                console.log(lng)

                var container = document.getElementById('map');

                var options = {
                   center: new kakao.maps.LatLng(lat, lng),
                   level: 3
                };
        
                map = new kakao.maps.Map(container, options);
                scope.map=map;
            }       
            });

            
        })
    },

    methods:{
        find: function(){
            // 장소 검색 객체를 생성합니다
            var ps = new kakao.maps.services.Places(); 
            let map=this.map

            ps.keywordSearch(this.myPlace, placesSearchCB); 
            function placesSearchCB (data, status, pagination) {
                
                if (status === kakao.maps.services.Status.OK) {
                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    
                    var bounds = new kakao.maps.LatLngBounds();

                    for (var i=0; i<data.length; i++) {
                        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    }       

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds)

                } 
            }
        },
        hos: function(){
            const scope = this;
            this.$http.get('/map').then((result)=>{
            data=result.data
            console.log(result.data)
            console.log(data)
            positions = [];
            markers=[];
            for(let i=0;i<data.length;i++){
                let hospital=new Object();
                hospital._id=data[i]._id;
                hospital.title=data[i].title;
                hospital.latlng=new kakao.maps.LatLng(data[i].lat,data[i].lng)

                positions.push(hospital)
            }

            console.log(positions)

            for (var i = 0; i < positions.length; i++) {

           // 마커 이미지의 이미지 크기 입니다
           var imageSize = new kakao.maps.Size(24, 35);

           // 마커 이미지를 생성합니다    
           var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

           // 마커를 생성합니다
           var marker = new kakao.maps.Marker({
               map: map, // 마커를 표시할 지도
               position: positions[i].latlng, // 마커를 표시할 위치
               title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니
               image: markerImage // 마커 이미지 
           });

           markers.push(marker);
        }
        
        for (let i = 0; i < markers.length; i++) {
            console.log("length:xxxxx:"+markers.length);
           kakao.maps.event.addListener(markers[i], 'click', function () {
                scope.$router.push({
                    name:"map_book",
                    params:{
                        hos:positions[i]
                    }
                })
                console.log("position here" + positions[i]);
           });
        }
        })
        }
    }
}
</script>

<style>
   
</style>