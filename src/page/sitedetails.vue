<template>
    <div class="detail_wrap">
        <div class="global-more" style="display:block">
            <div class="wrap">
                <div style="width: 100%;">
                    <div class="gm-content-top clearfix">
                        <div class="content-top">
                            <div class="top-point-pic">
                                <img src="../images/default.png">
                      
                            </div>
                            <div class="top-point-des">
                                <p class="gm-header-name">法制晚报</p>
                                <span>开放时间</span>
                                <p class="header-open-time">
                                    00:00 - 24:00
                                </p>
                            </div>
                        </div>
                        <div class="gm-number clearfix">
                            <div class="gm-quick">快充10个</div>
                            <div class="gm-slow">慢充5个</div>
                        </div>
                    </div>
                    <div class="gm-address">
                        <h2>站点地址</h2>
                        <p id="address">北京市朝阳区高碑店惠河南街1110号A座</p>
                        <notempty name="list.road_book">
                        <div class="road-book clearfix" style="display:block;">
                            <span>路书</span>
                            <span>最后100米精确行驶路线</span>
                            <span class="look">立即查看</span>
                            <i class="look"></i>

                        </div>
                        </notempty>
                    </div>
                    <div class="gm-content">
                        <div class="gm-content-more clearfix gm-operator">
                            <p class="name">运营商</p>
                            <p class="des">普天新能源</p>
                        </div>
                        <div class="gm-content-more clearfix gm-freemodel">
                            <p class="name">支付方式</p>
                            <p class="des">聚能充APP、普天电卡</p>
                        </div>
                        <div class="gm-content-more clearfix gm-price">
                            <p class="name">充电单价</p>
                            <p class="des">1.4500元</p>
                        </div>
                        <div class="gm-content-more clearfix gm-survice">
                            <p class="name">服务费</p>
                            <p class="des"></p>
                        </div>
                        <div class="gm-content-more clearfix gm-parking">
                            <p class="name">停车费</p>
                            <p class="des"></p>
                        </div>
                        <div class="gm-content-more clearfix gm-other">
                            <p class="name">站点备注</p>
                            <p class="des"></p>
                        </div>
                        <div class="point-line">
                            <div class="wrap">
                                <div class="point-do clearfix">
                                    <div class="daohang" style="width: 100%; border-right: none;"><i></i><span>导航</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="rb-pic-box">
            <div class="wrap">
                <div class="rb-point-title">
                    <i class="rb-header-close"></i>
                    <p>{$list.name}</p>
                </div>
                <div class="rb-pic">
                    <notempty name="list.road_book_list">
                        <foreach name="list.road_book_list" item="road">
                            <img src="{$road}" alt="">
                        </foreach>
                    </notempty>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{

    }
    
}
</script>
<style lang="scss">
@import "../style/scss/sitedetails";

</style>


