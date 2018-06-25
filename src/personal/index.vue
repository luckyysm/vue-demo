<template>
    <div class="wrap">
        <div class="head">
            <div class="logo">
                
            </div>
            <div class="use_bind">
                <p class="login_num" v-if="bind">{{login_num}}</p>
                <p class="login_num" v-else>未绑定</p>
                <p class="login_out" v-if="bind">{{login_out}}</p>
                <p class="login_out" v-else @click="binduser">立即绑定</p>
            </div> 

        </div>
        <div class="list">
            <ul id="lists">
                <template v-for="list in lists">
                    <li v-if="list.idname==='contact'">
                        <a href="tel:17600299652" :id="list.idname">
                            <i></i>
                            <p>{{list.name}}</p>
                            <span></span>
                        </a>
                   
                    </li>
                    <li v-else>
                        <a :href = "list.linkurl" :id="list.idname">
                            <i></i>
                            <p>{{list.name}}</p>
                            <span></span>
                        </a>
                    </li>

                </template>

            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            login_num: "17600299652",
            login_out: "解除绑定",
            bind: false,
            lists: [
                {
                    idname:"wallet",
                    name:"我的钱包",
                    linkurl: './mywallet',
                    registurl: '../page/login',
                    // image: "../images/qianbao.png",

                },
                {
                    idname:"records",
                    name:"充电记录",
                    linkurl: './records',
                    registurl: '../page/login',
                    // image: "../images/charge_list.png",

                },
                {
                    idname:"contact",
                    name:"联系客服",
                    linkurl: 'tel:010-86466273',
                    // image: "../images/contact.png",

                },
                {
                    idname:"aboutus",
                    name:"关于我们",
                    linkurl: 'http://m.i-ev.com/?m=tmpphone&c=index&a=about_ju',
                    // image: "../images/aboutus.png",

                }
            ]

            
        }
    },
    methods:{
        binduser: function(){

        }
    }
    
}
</script>
<style lang="scss">
@import "../style/scss/personal/index.scss";

</style>

