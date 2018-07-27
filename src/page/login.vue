<template>
    
<div class="login_wrap">
    <div class="head">
        <div class="bg"></div>
        <div class="logo">
            <img src="../images/logo.png" alt="">
            <p>聚能充</p>
        </div>
    </div>
    <div class="wrap">
        <div class="gl-con">
            <div class="gl-tel">
                <input type="text" id="login-tel" placeholder="请输入手机号" v-model="mobile">
                <img src="../images/tel.png" alt="加载失败">
         
            </div>
            <div class="gl-code">
                <input type="text" id="login-code" placeholder="请输入短信验证码" v-model="messagecode">
                <img src="../images/message.png">
                <button class="getcode" :class="{'noclick':code===false}" id="getyzm" v-on:click="scancode" >{{showtext}}</button>
                <div class="code-hover"></div>

            </div>
            <div class="gl-pro">

                <button id="login-sub" @click="login">登录</button>
 
                <div class="agree">
                    <p>登录即同意<a href="http://m.i-ev.com/index.php?m=phone&c=index&a=agreement&app=yes">《协议》</a></p>
                    <p class="error_yzm"  @click="noget">收不到验证码?</p>
                </div>
            </div>
        </div>
    </div>
    <div class="mask_kefu" v-show="kefu"></div>
    <div class="tan_tips" v-show="kefu">
        <div class="contact">
            <p>联系客服</p>
            <p>400-650-0599</p>
        </div>
        <div class="btn_select">
            <p class="cancel" @click="cancel">取消</p>
            <p class="call"><a href="tel:400-650-0599">拨打</a></p>
        </div>

    </div>
    <Tips :number="tipstext" v-show="error"></Tips>
</div>

    
    
</template>
<script>
import Tips from '../components/tips/tips.vue'
export default{
    
    data() {
        return {
            code:true,
            timer: null,
            count: '',
            showtext: '获取',
            mobile:"",
            messagecode: "",
            kefu: false,
            error: false,
            tipstext: ""

        }
    },
    components: {
        Tips
    },
   
    methods: {  
        cancel: function(){
            this.kefu = false;
        },
         //收不到验证码
        noget: function() {
            this.kefu = true;
        },
        showmask: function() {  

            //使用this访问数据  
            if(!this.code) return;
            this.code = false;

        },
        errornone: function(){
            let timeout;
            timeout = setTimeout(()=>{
                this.error  =false;
                clearTimeout(timeout);
            },2000)
        },
        // 登录
        login: function(){
            // console.log(this.messagecode);
            if(!this.messagecode){
                // alert("验证码不正确");
                this.tipstext = "验证码不正确";
                this.error = true;
                this.errornone();
           
            }else{
                //请求登录接口 
                // this.$http.post('http://open.i-ev.com/index.php/open/public/userRegister', {
                //     mobile: this.mobile, code: this.messagecode
                    
                // })
                // .then(function (response) {
                //     console.log(response);
                // })
                // .catch(function (error) {
                //     console.log(error);
                // });
                this.$router.push({path:'./home',query:{mobile:this.mobile}})


            }
        },
        closemask: function(){

            let message = this.mobile;
            let options = {
                okText: '确定',  // 本地化确认按钮文字提示内容
                cancelText: '取消',  //本地化关闭按钮文字提示内容
            }
            this.$dialog.alert(message, options);


        },
        scancode: function(){
            let pattern = /0?(13|14|15|16|17|18|19)[0-9]{9}$/;
            if(!pattern.test(this.mobile)){
                this.tipstext = "手机号不正确";
                this.error = true;
                this.errornone();
            }else{
                this.getcode();
            }
        },
        getcode: function(){
            const time_count = 5;
            if(!this.timer){
                this.count = time_count;
                this.code = false;
                this.timer = setInterval(() => {
                    if(this.count > 0 && this.count <= time_count){
                        this.count--;
                        this.showtext = this.count + "s";

                    }else{
                        this.code = true;
                        clearInterval(this.timer);
                        this.timer = null;
                        this.showtext = "获取";
                    }

                },1000)
                this.$http.post('http://open.i-ev.com/index.php/open/public/userRegister', {
                    mobile: this.mobile,
                    
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }

        }  
    }  
}
 

</script>
<style lang="scss" scoped>

@import "../style/scss/login.scss";
</style>

