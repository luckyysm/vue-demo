<template>
    <div class="lists_wrap">
        <div class="search">
            <div class="search_wrap">
                <input type="text" id="search" placeholder="请输入您要去的地点" v-on:input="keyUpSearch" ref="searchText" >
                <img src="../images/search.png" class="search-icon">
                <img src="../images/search_close.png" class="search-empty"  v-show="closetext" @click="clearSearch"></img>
                <span class="list-shaixuan"><router-link :to="{path:'./filter',query:{elec:this.elec,opentype:this.opentype,fast:this.fast,store:this.store}}" active-class="active"></router-link></span>
                <span class="change-model"><router-link to="./map" active-class="active"></router-link></span>
                <div id="search-con"><ul></ul></div>
            </div>
            <div id="temp" style="display:none"></div>
            <div class="search_list" id="search_list">
                <ul>
                    <li v-for="lists in stationList" :data-lat="lists.location.lat" :data-lng="lists.location.lng"  @click="selectPosition(lists.location.lng,lists.location.lat)">{{lists.name}}</li>
                </ul>

            </div>
        </div>
        <div class="station-lists">
            <ul class="list-ul">
                <li v-for="">
                    <router-link to="./sitedetails" >
                        <!-- <div class="to-more" :data-name="" :data-address="" :data-mobile="" :data-lat="" :data-lng="" :data-operator="" :data-freemodel="" :data-price="" :data-survice="" :data-time="" :data-parking="" :data-delay="" :data-quick="" :data-slow="" :data-img="" :data-rb="" > -->
                        <div class="to-more">
                            <div class="point-name">
                                <p class="name-left">
                                    法制晚报
                                </p>
                                <p class="message-right message-right-ls">
                                    <span>路书</span>
                                </p>
                            </div>
                            <div class="point-message">
                                <div class="pay-filter">
                                    <span>支付方式</span>
                                    <p>聚能充APP、普天电卡</p>
                                </div>
                                <div class="fee-section">
                                    <span>收费说明</span>
                                    <p>
                                        电费："",服务费：“”，停车费：“”
                                    </p>
                                </div>
                                <div class="point-num">
                                    <p class="point-quick">快充:3个</p>
                                    <p class="point-slow">慢充:3个</p>
                                    <p class="point-miles">0.08km</p>
                                </div>

                            </div>

                        </div>
                    </router-link>


                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            stationList:[],
            closetext: false,
            active: false,
            elec:"", //充电类型（国标，特斯拉）
            opentype:"", //对内对外
            fast:"", //快慢充
            store:"", // 运营商
        }
        
    },
    mounted: function(){
        //做个判断，地址栏是否包括elec等字段
        this.elec = this.$route.query.elec;
        this.opentype = this.$route.query.opentype;
        this.fast = this.$route.query.fast;
        this.store = this.$route.query.store;
    },
    methods:{
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
                    console.log(status);
                    console.log(result);
                    if (status == 'complete' && result.info == 'OK') {
                        // console.log(result.poiList);

                        if (result.poiList.count>0) {
                        //这里可以console.log(result)，查看所有返回的参数，遍历展示这些基本的，我就不赘述
                        //_this.searchData = result.poiList.pois
                            _this.stationList = result.poiList.pois;

                            console.log(_this.stationList);
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
@import "../style/scss/lists";
@import "../style/base/_mixin";
</style>
