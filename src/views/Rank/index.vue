<template>
    <div class="page">
        <div class="index_body">
            <div class="hd">
                <div class="sec_title"><i class="index_paihangbang"></i>收益排行榜</div>
                <div class="tab">
                    <ul>
                        <li @click="showMenu('1')" :class="[currentMenu === '1' ? 'active': '']">实盘认证</li>
                        <li @click="showMenu('0')" :class="[currentMenu === '0' ? 'active': '']">模拟账户</li>
                    </ul>
                </div>
                <a href="#">更多</a>
            </div>
        </div>
        <div class="charts-container">
            <div class="charts-title-area">
                <div class="title">交易时间：</div>
                <div :class="['btn-item item', currentCode === index ? 'active': '']" v-for="(item, index) in tradeMonthsCodeArr" :key="index" @click="tradeMonthsCodeChange(item.key, index)">{{item.value}}</div>
            </div>

            <div class="charts-title-area">
                <div class="title">活跃程度：</div>
                <div :class="['btn-item item', currentDaysCode === index? 'active': '']" v-for="(item, index) in activityDaysCodeArr" @click="activityDaysCodeChange(item.key, index)" :key="index">{{item.value}}</div>
            </div>

            <div class="charts-title-area" v-if="tradersArr.length">
                <div class="title">交易商：</div>
                <div :class="['btn-item item', currentTraders === index ? 'active': '']" v-for="(item, index) in tradersArr" @click="tradersChange(item.traderid, index)" :key="index">{{item.tradername}}</div>
            </div>

            <div class="charts-title-area">
                <div class="title">持仓时间：</div>
                <div :class="['btn-item item', currentPeriodCode === index ? 'active': '']" v-for="(item, index) in holdPeriodCodeArr" @click="holdPeriodCodeChange(item.key, index)" :key="index">{{item.value}}</div>
            </div>

            <div class="index_body">
                <div class="bd">
                    <div class="infinite-list-wrapper" ref="infiniteListWrapper" v-if="traderId" style="overflow:auto">
                        <el-table
                            v-infinite-scroll="dataChange"
                            infinite-scroll-distance="100"
                            infinite-scroll-disabled="disabled"
                            :data="tableData"
                            stripe
                            >
                            <el-table-column
                                fixed
                                prop="name"
                                label="基本信息"
                                width="280">
                                <template slot-scope="{row, $index}">
                                    <div class="names-container" @click="showDetailItem(row)">
                                        <div class="avator-area">
                                            <span class="xuhao">{{$index + 1}}</span>
                                            <img class="avartar" v-if="row.header_icon" :src="row.header_icon" />
                                        </div>
                                        <div class="info">
                                            <div class="username jieq">{{row.usernickname}}</div>
                                            <div class="action">
                                                <img v-if="row.usergroup_icon" :src="row.usergroup_icon" />
                                                <img v-if="row.trader_icon" :src="row.trader_icon" />
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="symbol"
                                label="专注品种"
                                min-width="120">
                                <template slot-scope="{row}">
                                    <span v-if="row.symbol">{{row.symbol}}</span>
                                    <span v-else>--</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="profit_rate"
                                label="总盈亏"
                                min-width="120">
                                <template slot-scope="{row}">
                                    <span class="code">{{row.profit_rate}} %</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="years"
                                label="年龄"
                                min-width="120">
                                <template slot-scope="{row}">
                                    <span class="code">{{row.years}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="avgprofit_rate"
                                label="月盈利率"
                                min-width="120">
                                <template slot-scope="{row}">
                                    <span class="code">{{row.avgprofit_rate}} %</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="maxdrawdown_rate"
                                label="最大浮亏"
                                min-width="120">
                                <template slot-scope="{row}">
                                    <span class="code">{{row.maxdrawdown_rate}} %</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="走势图"
                                min-width="260">
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
            </div>
        </div>
        
         <p class="page-tip">
            风险提示： 保证金交易是杠杆产品，存在较高的风险，不适合所有投资者。决定参与交易前 ，您应该谨慎考虑您的投资目标、经验等级及风险承受能力。您可能会亏损部分或者全部资金。交易者应该清楚的了解与交易相关联的所有风险，如果您有任何疑问，可在必要时向独立的金融顾问征询意见。过去的交易成绩并不代表以后的交易成绩，牛人榜所列信息仅供参考，不构成投资建议，也不代表任何形式的推荐或诱导信息。
        </p>

    </div>
</template>
<style>
@import "../../assets/css/style.css";
</style>
<style lang="scss">
.page{
    background: #fff;
    padding: 20px;
}
table tbody tr:nth-child(2n+1) {
    background: #fbfbfb;
}
.names-container{
    display: flex;
    .avator-area{
        width: 130px;
    }
    .info{
        flex: 1;
        padding-top: 10px;
    }
}
.page-tip{
    font-size: 14px;
    color: #AEAEAE;
    line-height: 24px;
    padding: 20px 20px 40px;
}

.charts-title-area{
    margin-bottom: 40px;
}
.charts-title-area .title{
    margin-right: 20px;
}
.index_body .bd {
    box-shadow: none;
    border-radius: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0;
    margin-bottom: 20px;
}
.el-table .cell{
    overflow: visible;
}
.infinite-list-wrapper{
    height: 400px;
}
.tips{
    text-align: center;
    padding-top: 30px;
}
</style>
<style scoped>
.chart_bg_area{
    padding: 8px 8px 4px;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    background: #fff;
}
</style>
<script>
import { getTraders, getTopRank } from '@/service/user';

export default {
    components: {
        // DetailItem
    },
    data() {
        return {
            currentCode: 0,
            tradeMonthsCode: '',
            tradeMonthsCodeArr: [{
                key: '',
                value: '全部'
            }, {
                key: '5',
                value: '5个月以上'
            }, {
                key: '8',
                value: '8个月以上'
            }, {
                key: '12',
                value: '一年以上'
            }, {
                key: '24',
                value: '2年以上'
            }],
            currentDaysCode: 0,
            activityDaysCode: '',
            activityDaysCodeArr: [{
                key: '',
                value: '全部'
            }, {
                key: '7',
                value: '7日内活跃'
            }, {
                key: '30',
                value: '30日内活跃'
            }],
            currentPeriodCode: 0,
            holdPeriodCode: '',
            holdPeriodCodeArr: [{
                key: '',
                value: '全部'
            }, {
                key: '30-',
                value: '30分钟以下'
            }, {
                key: '30',
                value: '30分钟以上'
            }, {
                key: '60',
                value: '1小时以上'
            }, {
                key: '120',
                value: '2小时以上'
            }, {
                key: '300',
                value: '5小时以上'
            }, {
                key: '1440',
                value: '一天以上'
            }],
            currentTraders: 0,
            traderId: '',
            tradersArr: [],
            currentMenu: '0',
            accountType: '0',
            tableData: [],
            loading: false,
            noMore: false,
            pageNo: 1
        };
    },
    computed: {
      disabled () {
        return this.loading || this.noMore;
      }
    },
    mounted() {
        this.getBasic();
    },
    methods: {
        showMenu(item) {
            if (this.traderId) {
                this.currentMenu = item;
                this.accountType = item;
                this.tableData = [];
                this.pageNo = 1;
                this.dataChange();
            }
        },
        tradeMonthsCodeChange(key, index) {
            this.tradeMonthsCode = key;
            this.currentCode = index;
        },
        activityDaysCodeChange(key, index) {
            this.activityDaysCode = key;
            this.currentDaysCode = index;
        },
        holdPeriodCodeChange(key, index) {
            this.holdPeriodCode = key;
            this.currentPeriodCode = index;
        },
        tradersChange(key, index) {
            this.currentTraders = index;
            this.traderId = key;
            this.dataChange();
        },
        showDetailItem(data) {
            // this.$router.push({ path: '/detail', query: _this.otherQuery },
            this.$router.push({ path: '/detail', query: { accountNo: data.accountno } });
        },
        getBasic() {
            getTraders().then((data) => {
                if(data && data.length) {
                    this.traderId = data[0].traderid;
                    this.tradersArr = data;
                    this.dataChange();
                }
            });
        },
        dataChange() {
            this.loading = true;
            const parmas = {
                accountType: this.accountType,
                tradeMonthsCode: this.tradeMonthsCode,
                activityDaysCode: this.activityDaysCode, //空串代表"全部"
                traderId: this.traderId,
                holdPeriodCode: this.holdPeriodCode,
                pageNo: this.pageNo,
                pageSize: 10
            };
            getTopRank(parmas).then((data) => {
                if (data && data.length) {
                    this.$refs.infiniteListWrapper.scrollTop = this.$refs.infiniteListWrapper.scrollTop - 140;
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
        doData(data) {
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
        }
    }
};
</script>