<template>
    
    <div id="container" class="mymap"></div>
   
    
</template>
<script>
    // import VueAMap from 'vue-amap';
    // import AMap from 'Amap';
    var map ;
    export default {
        mounted: function(){
            this.init()
        },
        methods:{
            init: function(){
                map = new AMap.Map('container',{
                    center: [116.397428, 39.90923],
                    resizeEnable: true,
                    zoom: 10
                })
                AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
                    map.addControl(new AMap.ToolBar())
                    map.addControl(new AMap.Scale())
                })
            }
        }
    }

</script>
<style lang="scss">

@import "../style/scss/_index.scss";
</style>

