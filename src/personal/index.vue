<template>
    <div class="wrap">
        <div class="head">
            <div class="logo">
                
            </div>
            <div class="use_bind">
                <p class="login_num">{{login_num}}</p>
                <p class="login_out">{{login_out}}</p>
            </div>

        </div>
        <div class="list">
            <ul id="lists">
                <template v-for="list in lists">
                    <li>
                        <router-link to = "list.linkurl">
                            <!-- <i></i>
                            <p>{{list.name}}</p>
                            <span></span> -->
                        </router-link>

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
            lists: [
                {
                    idname:"wallet",
                    name:"我的钱包",
                    linkurl: './mywallet',
                    image: "../images/qianbao.png",

                },
                {
                    idname:"records",
                    name:"充电记录",
                    linkurl: './records',
                    image: "../images/charge_list.png",

                },
                {
                    idname:"contact",
                    name:"联系客服",
                    linkurl: '',
                    image: "../images/contact.png",

                },
                {
                    idname:"aboutus",
                    name:"关于我们",
                    linkurl: './aboutus',
                    image: "../images/aboutus.png",

                }
            ]

            
        }
    }
    
}
</script>
<style lang="scss">
@import "../style/scss/personal/index.scss";

</style>

