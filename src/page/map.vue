<template>
    <div class="wrap">
        <div class="search">
            <div class="search_wrap" style="overflow: inherit;">
                <input type="text" id="search" placeholder="请输入您要去的地点" v-on:input="keyUpSearch" ref="searchText" >
                <img src="../images/search.png" class="search-icon">
                <img src="../images/search_close.png" class="search-empty" v-show="closetext" @click="clearSearch">
                <span class="change-model">
                    <router-link :to="{path:'./lists',
                                    query:{mylat: this.myLat, mylng: this.myLng, lng:this.viewCenter.lng, lat:this.viewCenter.lat, elec:this.elec, opentype:this.opentype, fast:this.fast, store:this.store}}" 
                                    style="color:#333;text-decoration:none;">
                    </router-link>
                </span>
                <div id="search-con"><ul></ul></div>
            </div>
            <div id="temp" style="display:none"></div>
            <div class="search_list" id="search_list">
                <ul>
                    <li v-for="lists in stationList" :data-lat="lists.location.lat" :data-lng="lists.location.lng"  @click="selectPosition(lists.location.lng,lists.location.lat)">{{lists.name}}</li>
                </ul>

            </div>
        </div>
        <div class="container">
            <div id="container" class="mymap">
                <span class="marker" v-for="(item,index) in data" :key="index"  @click="stationClick(e,index)"></span>
                
            </div>
            <div class="shaixuan">
                <router-link :to="{path:'./filter',query:{elec:this.elec,opentype:this.opentype,fast:this.fast,store:this.store}}"></router-link>
            </div>
            <div class="mine">
                <!-- <a href="/open/member">
                    <img src="/Public/open/images/mine.png" alt="">
                </a> -->
                <router-link to="../personal/index">
                    <img src="../images/mine.png" alt="">
                </router-link>
            </div>
        </div>
    </div>
   
    
</template>
<script>
    // import VueAMap from 'vue-amap';
    // import AMap from 'Amap';
    import pileIcon from "../images/pile_icon.png";
    var map ;
    var geolocation;
    var marker;
    var markers = [];
    export default {
        data(){
            return{
                stationList:[],
                closetext: false,
                // focusState: false,
                center:[],
                elec:"", //充电类型（国标，特斯拉）
                opentype:"", //对内对外
                fast:"", //快慢充
                store:"", // 运营商
                myLat:"", //我的位置的纬度
                myLng:"", //我的位置的经度
                viewCenter:"",
                viewNorthWest:"",
                viewSouthEast:"" ,
                data:"",//地图站点数据
                stationItem:"",

            }
        },
        mounted: function(){
            this.init();
            //做个判断，地址栏是否包括elec等字段
            this.elec =this.$route.query.elec;
            this.opentype =this.$route.query.opentype;
            this.fast =this.$route.query.fast;
            this.store =this.$route.query.store;
        },
        methods:{
            init: function(){
                var that = this;
                map = new AMap.Map('container',{
                    // center: [116.397428, 39.90923],
                    // center: this.center,
                    resizeEnable: true,
                    zoom: 15
                }),
                map.plugin('AMap.Geolocation', function() {
                    geolocation = new AMap.Geolocation({
                        timeout: 10000,
                        GeoLocationFirst: false,
                        maximumAge: 0 //定位结果缓存0毫秒，默认：0
                    });
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', function(data) {
                        that.myLng = data.position.getLng(); //定位成功返回的经度
                        that.myLat = data.position.getLat(); //定位成功返回的纬度

                        that.getData();
                        
                    }); //返回定位信息
                    AMap.event.addListener(geolocation, 'error', function(data) {
                        if (data.info == 'FAILED') {
                            // alert(data);
                            that.getData();
                            
                        }
                    });
                }),
                AMap.event.addListener(map,'moveend',this.getData);
                AMap.event.addListener(map,'markerClick',function(){
                    console.log(1123)
                });
            },
            // 地图桩数据 
            getData: function(){
                if(markers){
                    map.remove(markers);
                }
                var that = this;
                this.viewCenter = map.getCenter();
                //当前视口的西南纬度和经度
                this.viewNorthWest = map.getBounds().getNorthWest();
                //当前视口的东北纬度和经度
                this.viewSouthEast = map.getBounds().getSouthEast();
                this.$http.get('http://windyboy.net/open/location/get_index',{
                    params:{
                        lat_l: that.viewNorthWest.lat,
                        lng_l: that.viewNorthWest.lng,
                        lat_r: that.viewSouthEast.lat,
                        lng_r: that.viewSouthEast.lng,
                        my_lat: that.myLat,
                        my_lng: that.myLng,
                        elec: that.elec, //充电接口类型
                        owner: that.opentype, //对内外
                        operator: that.store, //运营商
                        terminal: that.fast ,  //终端 快慢充
                        zoom_level: 15
                    },
                }).then(function(response){
                    if(response.data.code === "OK"){
                        that.data = response.data.data;
                        that.data.forEach((obj,index)=>{
                            that.marker(pileIcon,obj)
                        })
                    }
                
                })
            },
            //地图打点 
            marker: function(iconPath,obj){
                var icon = new AMap.Icon({
                    image: iconPath,
                    size: new AMap.Size(24, 36)
				})
				marker = new AMap.Marker({
					icon: icon,
					// content: content,
					position: [ obj.longitude ,  obj.latitude ],
					offset: new AMap.Pixel(-12,-36),
					map:map,
					zIndex:99
                });
                markers.push(marker);

            },
            //站点点击
            stationClick: function(e){
                console.log(e);
            },
            clearSearch: function(){
                this.stationList=[];
                this.$refs.searchText.value="";
                this.closetext = false;

            },
            selectPosition: function(lng,lat){
                this.center = [Number(lng),Number(lat)];
                this.stationList=[];
                map.setCenter(this.center);

            },
            keyUpSearch: function() { 
                // console.log("change");
                var _this = this;
                var txt = this.$refs.searchText.value;
                txt === "" ? _this.closetext = false : _this.closetext = true;
             
                AMap.service(["AMap.PlaceSearch"], function() { 
                    var placeSearch = new AMap.PlaceSearch({ 
                        //构造地点查询类 
                        pageSize: 6,
                        pageIndex: 1, 
                        city: "", 
                        //城市 
                        cityLimit: 'true', 
                        panel: 'temp'
                        //搜索结果的展示面板对元素id，不知道为什么一定要有该参数，最终获取的结果才更完整，参数更多跟完整，
                        //所以我在页面随便写了一个<div id="temp" style="display:none"></div>
                    });
                    //关键字查询
                    placeSearch.search(txt, function(status, result) {
                  
                        if (status == 'complete' && result.info == 'OK') {
                            // console.log(result.poiList);
    
                            if (result.poiList.count>0) {
                            //这里可以console.log(result)，查看所有返回的参数，遍历展示这些基本的，我就不赘述
                            //_this.searchData = result.poiList.pois
                                _this.stationList = result.poiList.pois;

                            }else{
                                _this.stationList = [];
                            }

                        }else{
                             _this.stationList = [];
                        }
                        // console.log(result.poiList.count);
               
                    })
                })

            }

        }
    }

</script>
<style lang="scss">

@import "../style/scss/_index";
@import "../style/base/_mixin";
</style>

