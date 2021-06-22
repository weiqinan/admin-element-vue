<template>
    <div class="neiye_body" style="min-height:600px;">
        <div class="sec_title_line">
            <i class="ico_ring"></i>我的消息
        </div>
        
        <div class="msg_list">
            <div class="hd">
                <div class="fl">
                    <a :class="[current === 0 ? 'primary': '']" @click="changeTab(0)">交易动态</a>
                    <a :class="[current === 1 ? 'primary': '']" @click="changeTab(1)">账户信息</a>
                </div>
                <div class="fr">
                    <a href="#" class="default">全部标记为已读</a>
                    <a href="#" class="default">清空</a>
                </div>
            </div>
            <ul class="bd">
                <ul v-if="current === 1">
                    <li>
                        <i class="ico_msg"></i>
                        <div class="content">
                            <h6 class="title">账户信息</h6>
                            <p class="desc">您的、75账户已被您删除，此账户已从账户管理移除</p>
                        </div>
                        <div class="action">
                            <a href="#">删除</a>
                            <span>2021-08-12 18:28:50</span>
                        </div>
                    </li>
                    <li>
                        <i class="ico_msg"></i>
                        <div class="content">
                            <h6 class="title">账户信息</h6>
                            <p class="desc">您的、75账户已被您删除，此账户已从账户管理移除</p>
                        </div>
                        <div class="action">
                            <a href="#">删除</a>
                            <span>2021-08-12 18:28:50</span>
                        </div>
                    </li>
                    <li>
                        <i class="ico_msg"></i>
                        <div class="content">
                            <h6 class="title">账户信息</h6>
                            <p class="desc">您的、75账户已被您删除，此账户已从账户管理移除</p>
                        </div>
                        <div class="action">
                            <a href="#">删除</a>
                            <span>2021-08-12 18:28:50</span>
                        </div>
                    </li>
                </ul>
                <div v-else class="empty-area">
                    <img src="../../assets/img/empty-mes.png" />
                </div>
            </ul>
        </div>
    </div>

</template>
<style>
@import "../../assets/css/style.css";
.empty-area{
    padding: 160px 0 260px;
}
.empty-area img{
    display: block;
    margin: 0 auto;
    height: 101px;
}
</style>
<script>
export default {
    name: 'AccountMes',
    props: {
        current: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            emptyMark: true,
            innercurrent: -1
        };
    },
    watch: {
        current(val) {
            this.innercurrent = val;
        }
    },
    methods: {
        openSet() {
            this.emptyMark = false;
        },
        cancel() {
            this.emptyMark = true;
        },
        changeTab(index) {
            this.$router.push({ path: `/account?mode=mes&current=${index}` });
            // this.$emit('change', { index });
        }
    },
    created() {
        // this.test();
    }
};
</script>