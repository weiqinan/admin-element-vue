<template>
    <div class="main">
        <div class="charts-container">
            <div class="top-area">
                <div class="top-name-area">
                    <p>BlueWhale Capital</p>
                    <p>真实的（SUD）, 1:500, MetaTrader 4</p>
                </div>
                <div class="status-area">
                    <div class="item">
                        <i class="el-icon-close"></i>
                        交易记录未验证
                    </div>
                    <div class="item">
                        <i class="el-icon-close"></i>
                        未验证交易权限
                    </div>
                </div>
            </div>
        </div>
        <el-row>
            <el-col :span="8">
                <div class="charts-container" style="min-height:555px;">
                    <div class="charts-title-area">
                        <div class="title">信息</div>
                        <div :class="['btn-item item', currentInfo === index ? 'active': '']" v-for="(item, index) in testArr4" @click="turnTab(index)" :key="index">{{item}}</div>
                    </div>
                    <ul class="key-value-ul" v-if="currentInfo === 1">
                        <li>
                            <span class="title">浏览量</span>
                            <span class="value">{{statisticsInfo.viewcount}}</span>
                        </li>
                        <li>
                            <span class="title">经纪人</span>
                            <span class="value">{{statisticsInfo.tradername}}</span>
                        </li>
                        <li>
                            <span class="title">杠杆值</span>
                            <!-- old 1:500 -->
                            <span class="value">{{statisticsInfo.leverage_desc}}</span>
                        </li>
                        <li>
                            <span class="title">类型</span>
                            <span class="value">{{statisticsInfo.accounttype_desc}}</span>
                        </li>
                        <li>
                            <span class="title">系统</span>
                            <span class="value">{{statisticsInfo.platform_desc}}</span>
                        </li>
                        <li>
                            <span class="title">交易</span>
                            <span class="value">{{statisticsInfo.tradestyle_desc}}</span>
                        </li>
                        <li>
                            <span class="title">开始时间</span>
                            <span class="value">{{statisticsInfo.begintime}}</span>
                        </li>
                        <li>
                            <span class="title">添加时间</span>
                            <span class="value">{{statisticsInfo.createtime}}</span>
                        </li>

                        <li>
                            <span class="title">时区</span>
                            <span class="value">{{statisticsInfo.timezone}}</span>
                        </li>
                    </ul>

                    <template v-if="currentInfo === 0">

                        <ul class="key-value-ul">
                            <li>
                                <span class="title">获利</span>
                                <span class="value light-font">{{statisticsInfo.profit_rate}}%</span>
                            </li>
                            <li>
                                <span class="title">绝对收益</span>
                                <span class="value light-font">{{statisticsInfo.absbalance_rate}}%</span>
                            </li>
                        </ul>

                        <ul class="key-value-ul">
                            <li>
                                <span class="title">天</span>
                                <span class="value">{{statisticsInfo.day_avgprofit_rate}}%</span>
                            </li>
                            <li>
                                <span class="title">每月</span>
                                <span class="value">{{statisticsInfo.month_avgprofit_rate}}%</span>
                            </li>
                            <li>
                                <span class="title">资金回撤</span>
                                <span class="value">{{statisticsInfo.maxdrawdown_rate}}%</span>
                            </li>
                        </ul>

                        <ul class="key-value-ul">
                            <li>
                                <span class="title">余额</span>
                                <span class="value">${{statisticsInfo.accountbalance}} </span>
                            </li>
                            <li>
                                <span class="title">净值</span>
                                <span class="value">${{statisticsInfo.accountequity}}</span>
                            </li>
                            <li>
                                <span class="title">最高</span>
                                <span class="value light-font">${{statisticsInfo.maxprofit}}</span>
                            </li>
                            <li>
                                <span class="title">利润</span>
                                <span class="value">${{statisticsInfo.accountprofit}}</span>
                            </li>
                            <li>
                                <span class="title">利息</span>
                                <span class="value">${{statisticsInfo.swap}}</span>
                            </li>
                        </ul>

                        <ul class="key-value-ul">
                            <li>
                                <span class="title">入金</span>
                                <span class="value">${{statisticsInfo.deposit}}</span>
                            </li>
                            <li>
                                <span class="title">取款</span>
                                <span class="value">${{statisticsInfo.withdrawal}}</span>
                            </li>
                        </ul>

                        <ul class="key-value-ul">
                            <li>
                                <span class="title">已更新</span>
                                <span class="value">{{statisticsInfo.updatecount}}</span>
                            </li>
                            <li>
                                <span class="title">追踪</span>
                                <span class="value">{{statisticsInfo.updateminutes}}</span>
                            </li>
                        </ul>
                    </template>
                </div>
            </el-col>

            <el-col :span="16" class="top-chart-area">
                <div class="charts-container" style="margin-left: 18px;">
                    <div class="charts-title-area">
                        <div class="title">图表</div>
                        <div :class="['btn-item item', index === 0 ? 'active': '']" v-for="(item, index) in testArr5" :key="index">{{item}}</div>
                    </div>

                    <div id="chartdemo3" style="height:500px"></div>
                </div>
            </el-col>
        </el-row>

        <!-- <div class="charts-container">
            <div class="charts-title-area">
                <div class="title">图表</div>
                <div :class="['btn-item item', index === 1 ? 'active': '']" v-for="(item, index) in testArr3" :key="index">{{item}}</div>
            </div>
            <div style="height:100px">进入的交易状态保密</div>
        </div> -->

        <div class="charts-container">
            <div class="charts-title-area">
                <div class="title">交易</div>
                <div class="btn-item item active">周期</div>
            </div>

            <el-table
                :data="tableData2"
                >
                <el-table-column
                    prop="date"
                    width="200">
                    <template slot="header">
                        <i class="el-icon-info"></i>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="huoli"
                    label="获利（Difference）"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.huoli}}</span> {{row.ppoint}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="利润（Difference）"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.huoli}}</span> {{row.ppoint}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="point"
                    label="点"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.huoli}}</span> {{row.ppoint}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="win"
                    label="胜率"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.huoli}}</span> {{row.ppoint}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="hand"
                    label="手（Difference）"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.huoli}}</span> {{row.ppoint}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <div class="charts-container">
            <div class="charts-title-area">
                <div class="title">高级统计数据</div>
                <div :class="['btn-item item', index === 1 ? 'active': '']" v-for="(item, index) in testArr2" :key="index">{{item}}</div>
            </div>
            <div class="table-ul-area">
                <ul class="table-ul">
                    <li>
                        <span class="title">交易：</span>
                        <span class="value">1932</span>
                    </li>
                    <li>
                        <span class="title">盈利：</span>
                        <span class="value">
                            <span class="process" style="width: 80px;"></span>
                        </span>
                    </li>
                    <li>
                        <span class="title">点数：</span>
                        <span class="value">4344.3</span>
                    </li>
                    <li>
                        <span class="title">平均盈利：</span>
                        <span class="value">32.33 pips/$11.22</span>
                    </li>
                    <li>
                        <span class="title">平均损失</span>
                        <span class="value">0 pips / $0.00</span>
                    </li>
                    <li>
                        <span class="title">手数：</span>
                        <span class="value">4.44</span>
                    </li>
                    <li>
                        <span class="title">手续费：</span>
                        <span class="value">$0.00</span>
                    </li>
                </ul>  
                             
                <ul class="table-ul">
                    <li>
                        <span class="title">成功的做多交易</span>
                        <span class="value">(53/97) 54%</span>
                    </li>
                    <li>
                        <span class="title">成功的做空交易</span>
                        <span class="value">(33/74) 44%</span>
                    </li>
                    <li>
                        <span class="title">最佳交易</span>
                        <span class="value">(Jan 12) 18.28</span>
                    </li>
                    <li>
                        <span class="title">最差交易</span>
                        <span class="value">(Oct 01) -19.04</span>
                    </li>
                    <li>
                        <span class="title">最好的交易（按照点数计算）</span>
                        <span class="value">(Mar 02) 153.4</span>
                    </li>
                    <li>
                        <span class="title">最坏的交易（点数）</span>
                        <span class="value">(Mar 25) -97.0</span>
                    </li>
                    <li>
                        <span class="title">平均持仓时间</span>
                        <span class="value">1d</span>
                    </li>
                </ul>   

                <ul class="table-ul" style="border: 0 none;">
                    <li>
                        <span class="title">利润因子</span>
                        <span class="value">0.99</span>
                    </li>
                    <li>
                        <span class="title">标准差</span>
                        <span class="value">$7.14</span>
                    </li>
                    <li>
                        <span class="title">
                            <el-tooltip effect="dark" placement="top">
                                <div slot="content" style="width: 300px;">夏普比率<br/>
                                夏普比率是用来描述如何做好资产的回报不畅所采取的风险投资者。该值越高越好。</div>
                                <span>夏普比率</span>
                            </el-tooltip>
                        </span>
                        <span class="value">0.00</span>
                    </li>
                    <li>
                        <span class="title">Z-Score (Probability):</span>
                        <span class="value">-1.53 (87.98%)</span>
                    </li>
                    <li>
                        <span class="title">期待</span>
                        <span class="value">-1.8 点 / -$0.02</span>
                    </li>
                    <li>
                        <span class="title">AHPR: </span>
                        <span class="value">0.00%</span>
                    </li>
                    <li>
                        <span class="title">GHPR:</span>
                        <span class="value">0.00%</span>
                    </li>
                </ul>    
            </div>
            <div style="height:40px;"></div>
            <el-table
                :data="tableData3"
                stripe
                class="no-border-table"
                :cell-style="testFuc"
                >
                <el-table-column
                    prop="name"
                    align="center"
                    label="货币">
                </el-table-column>
                <el-table-column
                    prop="jiaoyi"
                    align="center"
                    class-name="border-td"
                    label="交易">
                </el-table-column>
                <el-table-column
                    prop="point"
                    align="center"
                    label="点数">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.point}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="money"
                    align="center"
                    label="利润">
                    <template slot-scope="{row}">
                        <span style="color:#169F00" v-if="row.money>0">{{row.money}}</span>
                        <span style="color:#D35D65" v-else>{{row.money}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="jiaoyi2"
                    align="center"
                    class-name="border-td"
                    label="交易">
                </el-table-column>
                <el-table-column
                    prop="point2"
                    align="center"
                    label="点数">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.point2}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="money2"
                    align="center"
                    label="利润">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.money2}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="jiaoyi3"
                    align="center"
                    class-name="border-td"
                    label="交易">
                </el-table-column>
                <el-table-column
                    prop="point3"
                    align="center"
                    label="点数">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.point3}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="money3"
                    align="center"
                    label="利润">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.money3}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="win"
                    align="center"
                    label="成功">
                </el-table-column>
                <el-table-column
                    prop="error"
                    align="center"
                    label="损失">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="func">
                    <template slot="header">
                        <i class="el-icon-document-copy"></i>
                    </template>
                    <template slot-scope="{row}">
                        <span style="display: none">{{row.name}}</span>
                        <i class="el-icon-s-data"></i>
                    </template>
                </el-table-column>
            </el-table>
        </div>


         
        <div class="charts-container">
            <div class="charts-title-area">
                <div class="title">高级统计数据</div>
                <div :class="['btn-item item', index === 1 ? 'active': '']" v-for="(item, index) in testArr2" :key="index">{{item}}</div>
            </div>
            <h4>破产风险</h4>
            <ul class="table-danger">
                <li class="name">
                    <p class="title">损失的大小</p>
                    <p class="title">损失概率</p>
                    <p class="title">连续亏损的交易</p>
                </li>
                <li>
                    <div class="value">100%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
                <li>
                    <div class="value">90%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
                <li>
                    <div class="value">80%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
                <li>
                    <div class="value">70%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
                <li>
                    <div class="value">60%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
                <li>
                    <div class="value">50%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
                <li>
                    <div class="value">40%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
                <li>
                    <div class="value">30%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
                <li>
                    <div class="value">20%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
                <li>
                    <div class="value">10%</div>
                    <div class="value">&lt; 0.01%</div>
                    <div class="value">382</div>
                </li>
            </ul>
            <div style="clear:both; text-align:center; margin-top: 18px;">
                <p>有<span style="color:red;">0.8%</span>的机会失去<span style="color:red;">70%</span>的账户，还将需要<span style="color:red;">10</span>次连续的亏损交易。</p>
            </div>

            <div id="chartdemo2" style="height:500px"></div>
        </div>

        <div class="charts-container">
            <div class="charts-title-area">
                <div class="title">交易活动</div>
                <div :class="['btn-item item', index === 1 ? 'active': '']" v-for="(item, index) in testArr" :key="index">{{item}}</div>
            </div>
            <div style="height:100px">进入的交易状态保密</div>
        </div>
        <div class="charts-container">
            <div class="charts-title-area">
                <div class="title">月分析报告</div>
                <div :class="['btn-item item', index === 3 ? 'active': '']" v-for="(item, index) in yearArr" :key="index">{{item}}</div>
            </div>
            <div id="chartdemo" style="height:500px"></div>
        </div>

        <div class="charts-container">
            <div class="charts-title-area">
                <div class="title">此用户下其他系统</div>
            </div>
            <el-table
                :data="tableData"
                stripe
                >
                <el-table-column
                    fixed
                    prop="name"
                    label="名字"
                    width="250">
                    <template slot-scope="{row}">
                        <a style="text-decoration:underline;">{{row.name}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="huoli"
                    label="获利"
                    min-width="120">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.huoli}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="money"
                    label="资金回撤"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="point"
                    label="点"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="jiaoyi"
                    label="交易"
                    min-width="300">
                </el-table-column>
                <el-table-column
                    prop="ganggan"
                    label="杠杆值"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    fixed="type"
                    label="类型"
                    min-width="120">
                </el-table-column>
                <!-- <el-table-column
                    fixed="right"
                    label="类型"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
                        <el-dropdown class="margin-l5">
                            <span class="cursor-pointer">
                                <el-button type="text" >更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="tableEdit(scope.row)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="tableDel(scope.row)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>

        <p class="page-tip">
            风险提示： 保证金交易是杠杆产品，存在较高的风险，不适合所有投资者。决定参与交易前 ，您应该谨慎考虑您的投资目标、经验等级及风险承受能力。您可能会亏损部分或者全部资金。交易者应该清楚的了解与交易相关联的所有风险，如果您有任何疑问，可在必要时向独立的金融顾问征询意见。过去的交易成绩并不代表以后的交易成绩，牛人榜所列信息仅供参考，不构成投资建议，也不代表任何形式的推荐或诱导信息。
        </p>
    </div>
</template>
<style lang="scss">
.main{
    background: #fff;
}
.no-border-table.el-table td {
    border: 0 none;
}
.no-border-table.el-table th{
    background: #fafafa;
    font-weight: bold;
}

.no-border-table.el-table .border-td{
    border-left: 1px solid #dbdbdb;
}
.top-chart-area{
    position: absolute;
    top: 0;
    bottom: 0;
    padding-bottom: 20px;
    right: 0;
    .charts-container{
        height: 100%;
        box-sizing: border-box;
    }
}
</style>
<style lang="scss" scoped>
.no-border-table.el-table td {
    border: 0 none;
}
.no-border-table.el-table th{
    background: #fafafa;
}

.no-border-table .border-td{
    border-left: 1px solid #dbdbdb;
}

.table-danger{
    background: linear-gradient(45deg, rgb(245,215,232), rgb(248,230,245));
    border: 1px solid #dbdbdb;
    border-bottom: 0 none;
    height: 120px;
    li{
        float: left;
        height: 100%;
        box-sizing: border-box;
        width: 8.6%;
        .title{
            height: 40px;
            box-sizing: border-box;
            line-height: 40px;
            border-bottom: 1px solid #dbdbdb;
        }
        .value{
            border-bottom: 1px solid #dbdbdb;
            text-align: center;
            height: 40px;
            box-sizing: border-box;
            line-height: 40px;
        }
    }
    li.name{
        width: 14%;
        background: #fff;
        .title{
            padding-left: 20px;
        }
    }
    li:hover{
        background: rgb(245,215,232);
    }
    li.name:hover{
        background: #fff;
    }
}

.top-area{
    display: flex;
    line-height: 24px;
    .top-name-area{
        flex: 1;
    }
    .status-area{
        width: 300px;
        text-align: right;
    }
}

.key-value-ul{
    background: #F8F8F8;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 18px;
    li{
        height: 40px;
        line-height: 40px;
        color: #4D4D4D;
        display: flex;
        .title{
            flex: 1;
        }
        .value{
            width: 200px;
            text-align: right;
        }
        .light-font{
            color: #31A521;
        }
    }
}
.key-value-ul:last-child{
    margin-bottom: 0;
}
.table-ul{
    width: 33.33%;
    display: inline-block;
    box-sizing: border-box;
    border-right: 1px solid #dbdbdb;
    li{
        display: flex;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        color: #121212;
        font-weight: bold;
    }
    li:nth-child(2n+1) {
        background: #FAFBFD;
    }
    .title{
        flex: 1;
    }
    .value{
        width: 180px;
        text-align: right;
    }
    .process{
        background: #91CF2E;
        display: inline-block;
        height: 16px;
    }
}
.page-tip{
    font-size: 14px;
    color: #AEAEAE;
    line-height: 24px;
    padding: 40px 20px;
}


</style>
<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import { debounce } from '@/utlis';
import { getStatInfo } from '@/service/user';

export default {
    data() {
        return {
            yearArr: ['2016', '2017', '2018', '2019'],
            testArr: ['持仓', '历史（3390）', '敞口'],
            testArr2: ['交易', '概述', '破产风险', '时间', 'MAE/MFE'],
            testArr3: ['增长率', '余额', '利润', '资金回撤'],
            testArr4: ['统计', '摘要'],
            statisticsInfo: {},
            currentInfo: 0,
            testArr5: ['增长率', '余额', '利润', '资金回撤'],
            testFuc: ({columnIndex}) => {
                // row, column, rowIndex, 
                if (columnIndex === 10) {
                    return 'background: #DBFEDB';
                }
                if (columnIndex === 11) {
                    return 'background: #FFEDF9';
                }
            },
            option: {
                grid: {
                    left: '50px',
                    right: '20px',
                    top: '10px',
                    bottom: '35px'
                },
                xAxis: {
                    data: ['1月', '2月', '3月', '4月', '5月', '6月','7月', '8月', '9月', '10月', '11月', '12月']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    barWidth: 30,
                    color: '#337ab7',
                    data: [5888, 3838, 15880, 12888, 18888, 16888,5888, 3838, 15880, 12888, 18888, 16888]
                }]
            },
            tableData2: [
                {
                    date: '今天',
                    huoli: '-',
                    money: '-',
                    point: '-',
                    win: '-',
                    hand: '-',
                    ppoint: '-'
                },
                {
                    date: 'This Week',
                    huoli: '-',
                    money: '-',
                    point: '-',
                    win: '-',
                    hand: '-',
                    ppoint: '-'
                },
                {
                    date: 'This Month',
                    huoli: '+0.19%',
                    money: '+0.19%',
                    point: '+0.19%',
                    win: '+0.19%',
                    hand: '+0.19%',
                    ppoint: '( -0.70% )'
                },
                {
                    date: 'This Year',
                    huoli: '+0.19%',
                    money: '+0.19%',
                    point: '+0.19%',
                    win: '+0.19%',
                    hand: '+0.19%',
                    ppoint: '( -0.70% )'
                }
            ],
            tableData: [
                {
                    name: 'Alex Seow (XM) - GBPUSD',
                    huoli: '2.89%',
                    money: '0.03%',
                    point: '280.3',
                    jiaoyi: '-',
                    ganggan: '1:500',
                    type: '实盘'
                }, 
                {
                    name: 'Alex Seow (XM) - GBPUSD',
                    huoli: '2.89%',
                    money: '0.03%',
                    point: '280.3',
                    jiaoyi: '-',
                    ganggan: '1:500',
                    type: '实盘'
                }, 
                {
                    name: 'Alex Seow (XM) - GBPUSD',
                    huoli: '2.89%',
                    money: '0.03%',
                    point: '280.3',
                    jiaoyi: '-',
                    ganggan: '1:500',
                    type: '实盘'
                },  
                {
                    name: 'Alex Seow (XM) - GBPUSD',
                    huoli: '2.89%',
                    money: '0.03%',
                    point: '280.3',
                    jiaoyi: '-',
                    ganggan: '1:500',
                    type: '实盘'
                }
            ],
            tableData3: [
                {
                    name: 'AUDCAD',
                    jiaoyi: 95,
                    point: 1056.2,
                    money: 75.92,
                    jiaoyi2: 95,
                    point2: 1056.2,
                    money2: 75.92,
                    jiaoyi3: 95,
                    point3: 1056.2,
                    money3: 75.92,
                    func: '',
                    win: '174(80%)',
                    error: '36(17%)'
                },
                {
                    name: 'AUDCAD',
                    jiaoyi: 95,
                    point: 1056.2,
                    money: 75.92,
                    jiaoyi2: 95,
                    point2: 1056.2,
                    money2: 75.92,
                    jiaoyi3: 95,
                    point3: 1056.2,
                    money3: 75.92,
                    func: '',
                    win: '174(80%)',
                    error: '36(17%)'
                },
                {
                    name: 'AUDCAD',
                    jiaoyi: 95,
                    point: 1056.2,
                    money: 75.92,
                    jiaoyi2: 95,
                    point2: 1056.2,
                    money2: 75.92,
                    jiaoyi3: 95,
                    point3: 1056.2,
                    money3: 75.92,
                    func: '',
                    win: '174(80%)',
                    error: '36(17%)'
                },
                {
                    name: 'AUDCAD',
                    jiaoyi: 95,
                    point: 1056.2,
                    money: -75.92,
                    jiaoyi2: 95,
                    point2: 1056.2,
                    money2: 75.92,
                    jiaoyi3: 95,
                    point3: 1056.2,
                    money3: 75.92,
                    func: '',
                    win: '174(80%)',
                    error: '36(17%)'
                },
                {
                    name: 'AUDCAD',
                    jiaoyi: 95,
                    point: 1056.2,
                    money: -75.92,
                    jiaoyi2: 95,
                    point2: 1056.2,
                    money2: 75.92,
                    jiaoyi3: 95,
                    point3: 1056.2,
                    money3: 75.92,
                    func: '',
                    win: '174(80%)',
                    error: '36(17%)'
                }
            ]
        };
    },
    methods: {
        async getStatInfo() {
            const data = await getStatInfo({ accountNo: this.$route.query.accountNo });
            this.statisticsInfo = data;
        },
        turnTab(index) {
            this.currentInfo = index;
        },
        initChart() {
            this.chart = echarts.init(document.getElementById('chartdemo'));
            const option = this.option;
            this.chart.setOption(option);
        },
        initResizeEvent() {
            window.addEventListener('resize', this.resizeHandler);
        },
        initChart2() {
            const option = {
                title: {
                    text: 'MAE/MFE'
                },
                grid: {
                    left: '3%',
                    right: '7%',
                    bottom: '7%',
                    containLabel: true
                },
                tooltip: {
                    // trigger: 'axis',
                    showDelay: 0,
                    formatter: function (params) {
                        if (params.value.length > 1) {
                            return params.seriesName + ' :<br/>'
                            + params.value[0] + 'cm '
                            + params.value[1] + 'kg ';
                        }
                        else {
                            return params.seriesName + ' :<br/>'
                            + params.name + ' : '
                            + params.value + 'kg ';
                        }
                    },
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    }
                },
                legend: {
                    data: ['胜利者', '输家'],
                    left: 'center',
                    bottom: 10
                },
                xAxis: [
                    {
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value} cm'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value} kg'
                        }
                    }
                ],
                series: [
                    {
                        name: '胜利者',
                        type: 'scatter',
                        color: '#169F00',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                            [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                            [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                            [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                            [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
                            [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
                            [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
                            [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
                            [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
                            [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
                            [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
                            [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
                            [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
                            [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
                            [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
                            [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
                            [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
                            [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
                            [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
                            [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
                            [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
                            [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
                            [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
                            [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
                            [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
                            [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
                            [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
                            [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
                            [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
                            [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
                            [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
                            [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
                            [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
                            [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
                            [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
                            [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
                            [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
                            [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
                            [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
                            [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
                            [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
                            [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
                            [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
                            [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
                            [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
                            [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
                            [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
                            [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
                            [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
                            [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
                            [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
                            [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
                        ]
                    },
                    {
                        name: '输家',
                        type: 'scatter',
                        color: '#ff7e00',
                        emphasis: {
                            focus: 'series'
                        },
                        data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                            [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
                            [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
                            [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
                            [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
                            [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
                            [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
                            [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
                            [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
                            [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
                            [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
                            [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
                            [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
                            [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
                            [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
                            [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
                            [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
                            [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
                            [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
                            [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
                            [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
                            [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
                            [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
                            [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
                            [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
                            [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
                            [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
                            [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
                            [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
                            [176.5, 80.2], [177.8, 72.0], [180.3, 71.4], [171.4, 72.7], [172.7, 84.1],
                            [172.7, 76.8], [177.8, 63.6], [177.8, 80.9], [182.9, 80.9], [170.2, 85.5],
                            [167.6, 68.6], [175.3, 67.7], [165.1, 66.4], [185.4, 102.3], [181.6, 70.5],
                            [172.7, 95.9], [190.5, 84.1], [179.1, 87.3], [175.3, 71.8], [170.2, 65.9],
                            [193.0, 95.9], [171.4, 91.4], [177.8, 81.8], [177.8, 96.8], [167.6, 69.1],
                            [167.6, 82.7], [180.3, 75.5], [182.9, 79.5], [176.5, 73.6], [186.7, 91.8],
                            [188.0, 84.1], [188.0, 85.9], [177.8, 81.8], [174.0, 82.5], [177.8, 80.5],
                            [171.4, 70.0], [185.4, 81.8], [185.4, 84.1], [188.0, 90.5], [188.0, 91.4],
                            [182.9, 89.1], [176.5, 85.0], [175.3, 69.1], [175.3, 73.6], [188.0, 80.5],
                            [188.0, 82.7], [175.3, 86.4], [170.5, 67.7], [179.1, 92.7], [177.8, 93.6],
                            [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
                            [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
                            [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
                            [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
                            [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
                            [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
                            [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
                            [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
                            [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
                            [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
                            [180.3, 83.2], [180.3, 83.2]
                        ]
                    }
                ]
            };
            this.chart2 = echarts.init(document.getElementById('chartdemo2'));
            this.chart2.setOption(option);
        },
        initChart_lirun() {
            const data = this.statisticsInfo.chart_profit;
            const xArr = [];
            const yArr = [];
            data.map((item) => {
                xArr.push(item.ondate);
                yArr.push(item.profit);
                return item;
            });
            
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: xArr
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '利润',
                    data: yArr,
                    type: 'line'
                }]
            };
            this.chart3 = echarts.init(document.getElementById('chartdemo3'));
            this.chart3.setOption(option);
        }
    },
    async mounted() {
        const _this = this;
        await this.getStatInfo();

        _this.initChart_lirun();
        
        // _this.resizeHandler = debounce(() => {
        //     if (_this.chart) {
        //         _this.chart.resize();
        //     }
        // }, 100);
        // _this.initChart();
        // _this.initChart2();
        

        // _this.initResizeEvent();
    }
};
</script>