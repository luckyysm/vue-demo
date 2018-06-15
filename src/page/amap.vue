<template>
    
    <!-- <div id="container" class="mymap" style="width:500px;height:300px"></div> -->
    <h2>啊啊啊啊啊啊啊</h2>
    <!-- <div vid="amap" :zoom="zoom" :amap-manager="amapManager" :center="center" ref="map" class="amap-demo"></div> -->
    
    
</template>
<script>
    import VueAMap from 'vue-amap';
    let amapManager = new VueAMap.AMapManager();
    export default {
        data(){
            return {
                zoom: 10,
                center: [116.383798, 39.908315],
                amapManager: amapManager
            }
        }
    }
</script>
