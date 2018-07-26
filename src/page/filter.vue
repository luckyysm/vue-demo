<template>
    <div class="filter_wrap">
        <div class="filter">
            <div class="m-container">
                <div class="m-jiekou">
                    <p>充电接口</p>
                    <ul class="clearfix">
                        <li  v-for="(item,index) in charging" @click="chargeClick(index,chargingArr)" :class="{ clickActive: index===chargeCurrent}">{{item.name}}</li>

                    </ul>
                </div>
                <div class="m-kaifang">
                    <p>开放属性</p>
                    <ul class="clearfix">
                        <li  v-for="(item,index) in open" @click="openClick(index,openArr)" :class="{ clickActive: index===openCurrent}">{{item.name}}</li>

                    </ul>
                </div>
                <div class="m-speed">
                    <p>快充慢充</p>
                    <ul class="clearfix">
                        <li  v-for="(item,index) in speed" @click="speedClick(index,speedArr)" :class="{ clickActive: index===speedCurrent}">{{item.name}}</li>
                    </ul>
                </div>
        
                <div class="m-yunying">
                    <p>运营商</p>
                    <ul class="clearfix">
                        <li v-for="(item,index) in operator" @click="operatorClick(index,operatorArr)" :class="{ clickActive: operatorArr[index]}">{{item.name}}</li>
         
                    </ul>
                </div>
            </div>
            <div class="m-submit clearfix">
                <div class="p-reset" @click="resetFunction">重置</div>
                <div class="p-submit">
                    <router-link :to="{path:'./map',query:{elec: chargeCurrent === ''?'':chargeCurrent+1,opentype: openCurrent===''?'':openCurrent+1,fast: speedCurrent===''?'':speedCurrent+1,store:operatorCurrent}}">确定</router-link>
                </div>
            </div>
      
        </div>
    </div>
</template>
<script>
var chargings = [{"name":"国标"},{"name":"特斯拉"}];
var opens = [{"name":"对外开放"},{"name":"对内开放"}];
var speeds = [{"name":"快充"},{"name":"慢充"}];
var operators =[
    {"name":"联合电动"},
    {"name":"特来电"},
    {"name":"国家电网"},
    {"name":"普天新能源"},
    {"name":"星星充电"},
    {"name":"小易充电"},
    {"name":"智充"},
    {"name":"EV能源"},
    {"name":"其他"},

];

export default {

    data(){
        return{
            operator:operators, 
            operatorArr:[],
            charging: chargings,
            chargingArr:[],
            open: opens,
            openArr:[],
            speed: speeds,
            speedArr:[],
            chargeCurrent:"",
            openCurrent:"",
            speedCurrent:"",
            operatorCurrent:"",
            opertIndex:"",
            opertSelect:[],
            //地址栏参数
            urloperatorArr:[],
 
        }
    },
    mounted(){
        this.initFunction();
        this.chargeCurrent = this.$route.query.elec === "" ? "" : Number(this.$route.query.elec) -1;
        this.openCurrent = this.$route.query.opentype === "" ? "" : Number(this.$route.query.opentype)-1;
        this.speedCurrent = this.$route.query.fast === "" ? "" : Number(this.$route.query.fast)-1;
        this.urloperatorArr = this.$route.query.store.split(",");
        console.log(this.urloperatorArr);
   
        // for(let k = 0; k<this.urloperatorArr.length;k++){
        //     for(let j=0;j<this.operator.length;j++){
        //         console.log(j);
        //         console.log(this.operator[j].name);
        //         // console.log(this.operator[j].name.indexOf(this.urloperatorArr[k])>-1);
        //         if(this.operator[j].name.indexOf(this.urloperatorArr[k])>-1){
        //             this.operatorArr.splice(j,1,true);
        //             break;

        //         }

        //     }
           
        // }
        
    },
    methods:{
        initFunction(){
 
            this.selectFunction(this.operator,this.operatorArr);
            this.selectFunction(this.charging,this.chargingArr);
            this.selectFunction(this.open,this.openArr);
            this.selectFunction(this.speed,this.speedArr);
            
        },
        selectFunction(select,selectArr){
            for(let i=0;i<select.length;i++){
                selectArr.push(false);
            };
        },
        operatorClick(index,arr){
            let tempindex,tempname;
            for(let i=0; i<arr.length; i++){
                if(i===index){
                    tempname = this.operator[index].name;
                    // arr[index] ? arr.splice( index,1,false) : arr.splice(index,1,true);
                    if(arr[index]){
                        //取消选中
                        arr.splice( index,1,false);
                        tempindex = this.opertSelect.indexOf(tempname);
                        this.opertSelect.splice(tempindex,1);
                        
                    }else{
                        //选中
                        arr.splice(index,1,true);
                        this.opertSelect.push(tempname);

                    }
                    this.operatorCurrent = this.opertSelect.join(",");
       
                }
            }
        },
        chargeClick(index){
            this.chargeCurrent = index === this.chargeCurrent ? "" : index;
        },
        openClick(index){
            this.openCurrent = index === this.openCurrent ? "" : index;
        },
        speedClick(index){
            this.speedCurrent = index === this.speedCurrent ? "" : index;
        },
        resetFunction(){
            this.chargeCurrent = "";
            this.openCurrent = "";
            this.speedCurrent = "";
            this.operatorArr = [];
            this.selectFunction(this.operator,this.operatorArr);
        }

    }
      
}
</script>
<style lang="scss">
@import "../style/scss/filter";
</style>

