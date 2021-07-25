<template>
<div class="main">
    <div class="index_tips" v-if="showTip">
        <a class="close" @click="close_tips"></a>
        <p>您正在访问的是量化街，本网站所提供的内容及信息均遵守中华人民共和国香港特别行政区的法律法规。</p>
    </div>
    <div class="index_head">
        <div class="hd">
            <a class="fr" @click="turnToRank">查看总排行榜</a>
            <div class="sec_title"><i class="top3"></i>每月量化街TOP3</div>
        </div>
        <div class="sec_top3" v-if="tableData.length">
            <div class="section">
                <template v-if="tableData[0]">
                    <div class="username">{{tableData[0].accountnickname}}</div>
                    <div class="info">
                        <div class="left">
                            <strong>总盈利</strong>
                            <code>{{tableData[0].profit_rate}}%</code>
                        </div>
                        <div class="right">
                            <li>
                                <label>月龄</label>{{tableData[0].years}}月
                            </li>
                            <li>
                                <label>月盈利率</label>{{tableData[0].avgprofit_rate}}%
                            </li>
                            <li>
                                <label>最大浮亏</label>{{tableData[0].maxdrawdown_rate}}%
                            </li>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div style="height:138px;"></div>
                </template>
            </div>
            
            <div class="section">
                <template v-if="tableData[1]">
                    <div class="username">{{tableData[1].accountnickname}}</div>
                    <div class="info">
                        <div class="left">
                            <strong>总盈利</strong>
                            <code>{{tableData[1].profit_rate}}%</code>
                        </div>
                        <div class="right">
                            <li>
                                <label>月龄</label>{{tableData[1].years}}月
                            </li>
                            <li>
                                <label>月盈利率</label>{{tableData[1].avgprofit_rate}}%
                            </li>
                            <li>
                                <label>最大浮亏</label>{{tableData[1].maxdrawdown_rate}}%
                            </li>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div style="height:138px;"></div>
                </template>
            </div>
            <div class="section">
                <template v-if="tableData[2]">
                    <div class="username">{{tableData[2].accountnickname}}</div>
                    <div class="info">
                        <div class="left">
                            <strong>总盈利</strong>
                            <code>{{tableData[2].profit_rate}}%</code>
                        </div>
                        <div class="right">
                            <li>
                                <label>月龄</label>{{tableData[2].years}}月
                            </li>
                            <li>
                                <label>月盈利率</label>{{tableData[2].avgprofit_rate}}%
                            </li>
                            <li>
                                <label>最大浮亏</label>{{tableData[2].maxdrawdown_rate}}%
                            </li>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div style="height:138px;"></div>
                </template>
            </div>
        </div>
        <div style="clear:both;"></div>
    </div>

    <div class="index_adv">
        <img src="../../assets/img/index_adv.png" />
    </div>

    <div class="index_body">
        <div class="hd">
            <div class="sec_title"><i class="index_paihangbang"></i>收益排行榜</div>
            <div class="tab">
                <ul>
                    <li @click="showMenu('1')" :class="[currentMenu === '1' ? 'active': '']">实盘认证</li>
                    <li @click="showMenu('0')" :class="[currentMenu === '0' ? 'active': '']">模拟账户</li>
                </ul>
            </div>
            <a @click="turnToRank">更多</a>
        </div>
        <div class="bd" style="display:block">
            <div class="infinite-list-wrapper" ref="infiniteListWrapperMain" style="overflow:auto">
                <el-table
                    v-infinite-scroll="getData"
                    infinite-scroll-disabled="disabled"
                    :data="tableData"
                    >
                    <el-table-column
                        prop="name"
                        label="基本信息"
                        width="240">
                        <template slot-scope="{row, $index}">
                            <div class="names-container" @click="showDetailItem(row)">
                                <el-popover
                                    v-if="hasLogin"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div class="item-popup-area">
                                        <p class="num">总盈利率第<span class="color">{{$index + 1}}</span>名</p>
                                        <img class="avartar-item" :src="row.header_icon" />
                                        <div class="info">
                                            <div class="username jieq">{{row.usernickname}}</div>
                                            <div class="action">
                                                <img :src="row.usergroup_icon" />
                                                <img :src="row.trader_icon" />
                                            </div>
                                        </div>
                                        <p class="font-font">交易策略：{{row.tradestraregy_desc}}</p>
                                        <ul class="item-ul">
                                            <li>
                                                <p class="num">$ {{row.profit}}</p>
                                                <p class="font">总盈亏</p>
                                            </li>
                                            <li>
                                                <p class="num">{{row.win_rate}} %</p>
                                                <p class="font">准确率</p>
                                            </li>
                                            <li>
                                                <p class="num">{{row.profit_rate_inner}} %</p>
                                                <p class="font">盈利率</p>
                                            </li>
                                            <li>
                                                <p class="num">{{row.maxdrawdown_rate}} %</p>
                                                <p class="font">净值回撤率</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="avator-area" slot="reference">
                                        <span class="xuhao">{{$index + 1}}</span>
                                        <img class="avartar" :src="row.header_icon" />
                                    </div>
                                </el-popover>

                                <div class="avator-area" v-else>
                                    <span class="xuhao">{{$index + 1}}</span>
                                    <img class="avartar" :src="row.header_icon" />
                                </div>
                                <div class="info">
                                    <div class="username jieq">{{row.usernickname}}</div>
                                    <div class="action">
                                        <img :src="row.usergroup_icon" />
                                        <img :src="row.trader_icon" />
                                    </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="symbol"
                        label="专注品种"
                        min-width="100">
                        <template slot-scope="{row}">
                            <span v-if="row.symbol">{{row.symbol}}</span>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="profit_rate"
                        label="总盈亏"
                        min-width="100">
                        <template slot-scope="{row}">
                            <span class="code">{{row.profit_rate}} %</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="years"
                        label="月龄"
                        min-width="100">
                        <template slot-scope="{row}">
                            <span class="code">{{row.years}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="avgprofit_rate"
                        label="月盈利率"
                        min-width="100">
                        <template slot-scope="{row}">
                            <span class="code">{{row.avgprofit_rate}} %</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="maxdrawdown_rate"
                        label="最大浮亏"
                        min-width="100">
                        <template slot-scope="{row}">
                            <span class="code">{{row.maxdrawdown_rate}} %</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="走势图"
                        min-width="230">
                        <template slot-scope="{row}">
                            <div class="chart_bg_area">
                                <img class="phb_zhexiantu" @click="gotoLook(row.userid)" src="../../assets/img/chart_bg.png" />
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <p v-if="loading" class="tips">加载中...</p>
                <p v-if="noMore" class="tips">没有更多了</p>
            </div>
            
        </div>
        <!-- <div class="item load-more">
            <button type="button" class="load-more-btn" @click="getData(true)">加载更多</button>
        </div> -->
    </div>

    <p class="page-tip">
        风险提示： 保证金交易是杠杆产品，存在较高的风险，不适合所有投资者。决定参与交易前 ，您应该谨慎考虑您的投资目标、经验等级及风险承受能力。您可能会亏损部分或者全部资金。交易者应该清楚的了解与交易相关联的所有风险，如果您有任何疑问，可在必要时向独立的金融顾问征询意见。过去的交易成绩并不代表以后的交易成绩，牛人榜所列信息仅供参考，不构成投资建议，也不代表任何形式的推荐或诱导信息。
    </p>
</div>
</template>
<style lang="scss">
.infinite-list-wrapper{
    height: 1400px;
}
.tips{
    text-align: center;
    margin-top: 10px;
}
.main{
    background: #fff;
}
.load-more{
    padding-bottom: 20px;
    .load-more-btn{
        padding: 10px 40px;
        margin: 20px auto;
        display: block;
        border-radius: 6px;
    }
}
table tbody tr:nth-child(2n+1) {
    background: #fbfbfb;
}
.names-container{
    padding-top: 20px;
    display: flex;
    cursor: pointer;
    .avator-area{
        width: 130px;
    }
    .info{
        flex: 1;
        padding-top: 10px;
    }
}
.page-tip{
    font-size: 12px;
    color: #AEAEAE;
    line-height: 24px;
    padding: 20px 20px 40px;
}

.item-popup-area{
    .avartar-item{
        width: 80px;
        margin: 0 auto;
        display: block;
        height: 80px;
        margin-top: 40px;
        margin-bottom: 10px;
    }
    .num{
        font-size: 14px;
        color: #000;
        .color{
            color: #EA5B55;
        }
    }
    .info{
        text-align: center;
        font-size: 14px;
        margin-bottom: 10px;
        .username{
            display: inline-block;
            vertical-align: middle;
        }
        .action{
            display: inline-block;
            vertical-align: middle;
            img{
                display: inline-block;
                vertical-align: middle;
                width: 16px;
            }
        }
    }
    .font-font{
        text-align: center;
        margin-bottom: 20px;
        color: #979797;
    }
    .item-ul{
        li{
            float: left;
            width: 25%;
            text-align: center;
            box-sizing: border-box;
            margin-bottom: 10px;
            border-right: 1px solid #ddd;
            .num{
                color: #78DFB3;
            }
            .font{
                color: #979797;
            }
        }
        li:last-child{
            border-right: 0 none;
        }
    }
}
</style>
<style scoped>
.chart_bg_area{
    padding: 8px 8px 4px;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    background: #fff;
    width: 214px;
}
</style>
<script>
import { getHomeTopRank, getUserAccountBaseStatInfo } from '@/service/user';
// import { Base64 } from 'js-base64';
// import md5 from 'js-md5';
// import format from 'date-fns/format';

export default {
    data() {
        return {
            tableData: [],
            pageNo: 1,
            currentMenu: '0',
            accountType: '0',
            loading: false,
            noMore: false,
            showTip: true,
            keywords: '',
            hasLogin: false
        };
    },
    computed: {
      disabled () {
        return this.loading || this.noMore;
      }
    },
    mounted() {
        const userId = localStorage.getItem('webUserId') || '';
        if(userId) {
            this.hasLogin = true;
        }
    },
    created() {
        this.$bus.on('message', this.loadSearch);
    },
    beforeDestroy() {
        this.$bus.off('message', this.loadSearch);
    },
    methods: {
        loadSearch(data) {
            console.log(data);
            this.keywords = data.data;
            this.pageNo = 1;
            this.tableData = [];
            this.getData();
        },
        showMenu(item) {
            this.currentMenu = item;
            this.accountType = item;
            this.pageNo = 1;
            this.tableData = [];
            this.getData();
        },
        close_tips() {
            this.showTip = false;
        },
        turnToRank() {
            this.$router.push({ path: '/rank' });
        },
        gotoLook(){
            console.log('gotoLook');
        },
        getData() {
            this.loading = true;
            getHomeTopRank({
                accountType: this.accountType,
                pageNo: this.pageNo,
                keywords: this.keywords,
                pageSize: 10
            }).then((data) => {
                if (data && data.length) {
                    this.$refs.infiniteListWrapperMain.scrollTop = this.$refs.infiniteListWrapperMain.scrollTop - 140;
                    this.pageNo += 1;
                    data.map((item) => {
                        this.doData(item);
                        return item;
                    });
                    this.tableData = this.tableData.concat(data);
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.noMore = true;
                }
            });
        },
        async doData(data) {
            const url = 'http://mt4.ecn.cc/';
            if (data.header_icon) {
                const urlStr1 = data.header_icon.replace(/\\/g, "/");
                data.header_icon = `${url}${urlStr1}`;
            }

            if (data.trader_icon) {
                const urlStr2 = data.trader_icon.replace(/\\/g, "/");
                data.trader_icon = `${url}${urlStr2}`;
            }
            
            if (data.usergroup_icon) {
                const urlStr3 = data.usergroup_icon.replace(/\\/g, "/");
                data.usergroup_icon = `${url}${urlStr3}`;
            }
            const infodata = await this.getInfo(data);
            if (infodata) {
                data.profit = infodata.profit;
                data.win_rate = infodata.winrate;
                data.tradestraregy_desc = infodata.tradestraregy_desc;
                data.profit_rate_inner = infodata.profit_rate;
                data.maxdrawdown_rate = infodata.maxdrawdown_rate;
            }
        },
        showDetailItem(data) {
            this.$router.push({ path: '/detail', query: { accountNo: data.accountno, usernickname: data.usernickname } });
        },
        async getInfo(data) {
            const item = await getUserAccountBaseStatInfo({accountNo: data.accountno});
            return item;
        }
    }
};
</script>