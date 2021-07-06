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
                    <a @click="updateMessageViewed" class="default">全部标记为已读</a>
                    <a @click="clearAll" class="default">清空</a>
                </div>
            </div>
            <div class="bd" v-if="current === 1">
                <ul v-if="accountList.length">
                    <li v-for="(item, index) in accountList" :key="index">
                        <template v-if="item.showMark">
                            <i class="ico_msg"></i>
                            <div class="content">
                                <h6 class="title">{{item.subject}} 
                                    <span v-if="item.viewed" class="mark">[已读]</span>
                                    <span v-else class="un-mark">[未读]</span>
                                </h6>
                                <p class="desc">{{item.content}}</p>
                            </div>
                            <div class="action">
                                <a @click="deleteFunc(item)">删除</a>
                                <span>{{item.ontime}}</span>
                            </div>
                        </template>
                    </li>
                </ul>

                <div v-else class="empty-area">
                    <img src="../../assets/img/empty-mes.png" />
                </div>
            </div>

            <div class="bd" v-else>
                <ul v-if="tradeList.length">
                    <li v-for="(item, index) in tradeList" :key="index">
                        <template v-if="item.showMark">
                            <i class="ico_msg"></i>
                            <div class="content">
                                <h6 class="title">{{item.subject}} 
                                    <span v-if="item.viewed" class="mark">[已读]</span>
                                    <span v-else class="un-mark">[未读]</span>
                                </h6>
                                <p class="desc">{{item.content}}</p>
                            </div>
                            <div class="action">
                                <a @click="deleteFunc(item)">删除</a>
                                <span>{{item.ontime}}</span>
                            </div>
                        </template>
                    </li>
                </ul>
                <div v-else class="empty-area">
                    <img src="../../assets/img/empty-mes.png" />
                </div>
            </div>
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
.un-mark{
    display: inline-block;
    margin-left: 10px;
    color: red;
    vertical-align: top;
    font-size: 12px;
}

.mark{
    display: inline-block;
    margin-left: 10px;
    color:#999;
    vertical-align: top;
    font-size: 12px;
}
</style>
<script>
import { getUserAccountMessage, getUserTradeMessage, updateMessageViewed, deleteMessagge } from '@/service/user';

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
            userId: '',
            accountList: [],
            tradeList: [],
            innercurrent: -1
        };
    },
    watch: {
        current(val) {
            console.log('current', val);
            this.innercurrent = val;
        }
    },
    methods: {
        getUserAccountMessage() {
            getUserTradeMessage({ userId: this.userId }).then((data) => {
                if (data && data.length) {
                    data.map((item) => {
                        item.showMark = true;
                        return item;
                    });
                    this.accountList = data;
                } else {
                    this.accountList = [];
                }
            });
        },
        getUserTradeMessage() {
            getUserAccountMessage({ userId: this.userId }).then((data) => {
                if (data && data.length) {
                    data.map((item) => {
                        item.showMark = true;
                        return item;
                    });
                    this.tradeList = data;
                } else {
                    this.tradeList = [];
                }
            });
        },
        updateMessageViewed() {
            if (this.current === 1) {
                for (const i in this.accountList) {
                    const item = this.accountList[i];
                    const id = item.logid;
                    updateMessageViewed({ logid: id, viewed: 1 }).then((data) => {
                        if (data) {
                            item.viewed = 1;
                        }
                    });
                }
            } else {
                for (const i in this.tradeList) {
                    const item = this.tradeList[i];
                    const id = item.logid;
                    updateMessageViewed({ logid: id, viewed: 1 }).then((data) => {
                        if (data) {
                            item.viewed = 1;
                        }
                    });
                }
            }
        },
        deleteFunc(item) {
            deleteMessagge({ logid: item.logid }, { showLoading: true }).then((data) => {
                if (data) {
                    this.getData();
                }
            });
        },
        clearAll() {
            if (this.current === 1) {
                for (const i in this.accountList) {
                    const item = this.accountList[i];
                    const length = this.accountList.length;
                    const lastItem = this.accountList[length -1];
                    const id = item.logid;
                    deleteMessagge({ logid: id }).then((data) => {
                        if (!data) {
                            this.$message.error('有消息删除失败，请稍后重试');
                        } else {
                            item.showMark = false;
                        }
                        if (id === lastItem.logid) {
                            this.getData();
                        }
                    });
                }
            } else {
                for (const i in this.tradeList) {
                    const item = this.tradeList[i];
                    const id = item.logid;
                    deleteMessagge({ logid: id }).then((data) => {
                        console.log(i);
                        if (!data) {
                            this.$message.error('有消息删除失败，请稍后重试');
                        } else {
                            item.showMark = false;
                        }
                    });
                }
            }
        },
        openSet() {
            this.emptyMark = false;
        },
        cancel() {
            this.emptyMark = true;
        },
        changeTab(index) {
            this.$router.push({ path: `/account?mode=mes&current=${index}` });
        },
        getData() {
            if (this.current === 1) {
                this.getUserAccountMessage();
            } else {
                this.getUserTradeMessage();
            }
        }
    },
    created() {
        // this.test();
        const userId = localStorage.getItem('webUserId') || '';
        this.userId = userId;
        this.getData();
    }
};
</script>