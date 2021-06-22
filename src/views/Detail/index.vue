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
                        <div :class="['btn-item item', currentChart === index ? 'active': '']" v-for="(item, index) in testArr5" @click="turnChart(index)" :key="index">{{item}}</div>
                    </div>

                    <div id="chartdemo_up" v-show="currentChart === 0" style="height:500px"></div>
                    <div id="chartdemo_yu_e" v-show="currentChart === 1" style="height:500px"></div>
                    <div id="chartdemo_lirun" v-show="currentChart === 2" style="height:500px"></div>
                    <div id="chartdemo_zijin" v-show="currentChart === 3" style="height:500px"></div>
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

        <div class="charts-container" style="min-height: 250px;">
            <div class="charts-title-area">
                <div class="title">交易</div>
                <div class="btn-item item active">周期</div>
            </div>
            <el-table
                v-loading = "tradeStatForPeriodDataLoading"
                element-loading-background = "rgba(0, 0, 0, 0.1)"
                element-loading-text = "数据正在加载中"
                element-loading-spinner = "el-icon-loading"
                :data="tradeStatForPeriodData"
                >
                <el-table-column
                    prop="period"
                    width="200">
                    <template slot="header">
                        <i class="el-icon-info"></i>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="profit"
                    label="获利（Difference）"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00" v-if="row.profit">${{row.profit}}</span>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="profit_rate"
                    label="利润（Difference）"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00" v-if="row.profit_rate">{{row.profit_rate}} %</span>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="pips"
                    label="点"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.pips}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="winrate"
                    label="胜率"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00" v-if="row.winrate">{{row.winrate}} %</span>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="hand"
                    label="手（Difference）"
                    min-width="180">
                    <template slot-scope="{row}">
                        <span style="color:#169F00">{{row.lots}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <div class="charts-container" style="min-height: 300px;">
            <div class="charts-title-area">
                <div class="title">高级统计数据</div>
                <div :class="['btn-item item', currentAdvanced === index ? 'active': '']" v-for="(item, index) in Advanced" :key="index" @click="advancedChange(index)">{{item}}</div>
            </div>
            <div class="table-ul-area" v-if="currentAdvanced === 0">
                <ul class="table-ul">
                    <li>
                        <span class="title">交易：</span>
                        <span class="value">{{tradeInfo.tradecount}}</span>
                    </li>
                    <li>
                        <span class="title">盈利：{{tradeInfo.profit_rate}}</span>
                        <span class="value">
                            <span class="process" style="width: 80px;"></span>
                        </span>
                    </li>
                    <li>
                        <span class="title">点数：</span>
                        <span class="value">{{tradeInfo.sumpips}}</span>
                    </li>
                    <li>
                        <span class="title">平均盈利：</span>
                        <span class="value">{{tradeInfo.avgprofit_pips}} pips/${{tradeInfo.avgprofit}}</span>
                    </li>
                    <li>
                        <span class="title">平均损失</span>
                        <span class="value">{{tradeInfo.avgloss_pips}} pips/${{tradeInfo.avgloss}}</span>
                    </li>
                    <li>
                        <span class="title">手数：</span>
                        <span class="value">{{tradeInfo.sumlots}}</span>
                    </li>
                    <li>
                        <span class="title">手续费：</span>
                        <span class="value">${{tradeInfo.sumcommission}}</span>
                    </li>
                </ul>  
                             
                <ul class="table-ul">
                    <li>
                        <span class="title">成功的做多交易</span>
                        <span class="value">({{tradeInfo.buycount_win}}/{{tradeInfo.buycount}}) --54%</span>
                    </li>
                    <li>
                        <span class="title">成功的做空交易</span>
                        <span class="value">({{tradeInfo.sellcount_win}}/{{tradeInfo.sellcount}}) --44%</span>
                    </li>
                    <li>
                        <span class="title">最佳交易</span>
                        <span class="value">({{tradeInfo.bestprofit_date}}) ${{tradeInfo.bestprofit}}</span>
                    </li>
                    <li>
                        <span class="title">最差交易</span>
                        <span class="value">({{tradeInfo.worstprofit_date}}) ${{tradeInfo.worstprofit}}</span>
                    </li>
                    <li>
                        <span class="title">最好的交易（按照点数计算）</span>
                        <span class="value">({{tradeInfo.bestpips_date}}) {{tradeInfo.bestpips}}</span>
                    </li>
                    <li>
                        <span class="title">最坏的交易（点数）</span>
                        <span class="value">({{tradeInfo.worstpips_date}}) {{tradeInfo.worstpips}}</span>
                    </li>
                    <li>
                        <span class="title">平均持仓时间</span>
                        <span class="value">{{tradeInfo.avgholddays}}天</span>
                    </li>
                </ul>
                <ul class="table-ul" style="border: 0 none;">
                    <li>
                        <span class="title">利润因子</span>
                        <span class="value">{{tradeInfo.profit_factor}}</span>
                    </li>
                    <li>
                        <span class="title">标准差</span>
                        <span class="value">${{tradeInfo.standard_dev}}</span>
                    </li>
                    <li>
                        <span class="title">
                            <el-tooltip effect="dark" placement="top">
                                <div slot="content" style="width: 300px;">夏普比率<br/>
                                夏普比率是用来描述如何做好资产的回报不畅所采取的风险投资者。该值越高越好。</div>
                                <span>夏普比率</span>
                            </el-tooltip>
                        </span>
                        <span class="value">{{tradeInfo.sharpe_ratio}}%</span>
                    </li>
                    <li>
                        <span class="title">Z-Score (Probability):</span>
                        <span class="value">{{tradeInfo.z_score}}</span>
                    </li>
                    <li>
                        <span class="title">期待</span>
                        <span class="value">{{tradeInfo.expect_pips}} 点 / ${{tradeInfo.expect_profit}}</span>
                    </li>
                    <li>
                        <span class="title">AHPR: </span>
                        <span class="value">{{tradeInfo.ahpr}}%</span>
                    </li>
                    <li>
                        <span class="title">GHPR:</span>
                        <span class="value">{{tradeInfo.ghpr}}%</span>
                    </li>
                </ul>    
            </div>

            <template v-if="currentAdvanced === 1">

                <div class="table-head-title">
                    <span style="width:36%;">多头</span>
                    <span style="width:13%;">空头</span>
                    <span style="width:51%;">总</span>
                </div>
                <div style="clear:both"></div>
                <el-table
                    :data="advStatSummary"
                    v-loading = "advStatSummaryLoading"
                    element-loading-background = "rgba(0, 0, 0, 0.1)"
                    element-loading-text = "数据正在加载中"
                    element-loading-spinner = "el-icon-loading"
                    stripe
                    class="no-border-table"
                    :cell-style="testFuc"
                    >
                    <el-table-column
                        prop="symbol"
                        align="center"
                        label="货币">
                    </el-table-column>
                    <el-table-column
                        prop="buy_count"
                        align="center"
                        class-name="border-td"
                        label="交易">
                    </el-table-column>
                    <el-table-column
                        prop="buy_sumpips"
                        align="center"
                        label="点数">
                        <template slot-scope="{row}">
                            <span style="color:#169F00">{{row.buy_sumpips}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="buy_sumprofit"
                        align="center"
                        label="利润">
                        <template slot-scope="{row}">
                            <span style="color:#169F00" v-if="row.buy_sumprofit>0">{{row.buy_sumprofit}}</span>
                            <span style="color:#D35D65" v-else>{{row.buy_sumprofit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sell_count"
                        align="center"
                        class-name="border-td"
                        label="交易">
                    </el-table-column>
                    <el-table-column
                        prop="sell_sumpips"
                        align="center"
                        label="点数">
                        <template slot-scope="{row}">
                            <span style="color:#169F00">{{row.sell_sumpips}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sell_sumprofit"
                        align="center"
                        label="利润">
                        <template slot-scope="{row}">
                            <span style="color:#169F00">{{row.sell_sumprofit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="tradecount"
                        align="center"
                        class-name="border-td"
                        label="交易">
                    </el-table-column>
                    <el-table-column
                        prop="sumpips"
                        align="center"
                        label="点数">
                        <template slot-scope="{row}">
                            <span style="color:#169F00">{{row.sumpips}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sumprofit"
                        align="center"
                        label="利润">
                        <template slot-scope="{row}">
                            <span style="color:#169F00">{{row.sumprofit}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="wincount"
                        align="center"
                        label="成功">
                        <template slot-scope="{row}">
                            {{row.wincount}}({{row.winrate}}%)
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="failedcount"
                        align="center"
                        label="损失">
                        <template slot-scope="{row}">
                            {{row.failedcount}}({{row.failedrate}}%)
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center">
                        <template slot="header">
                            <i class="el-icon-document-copy"></i>
                        </template>
                        <template slot-scope="{row}">
                            <span style="display: none">{{row.symbol}}</span>
                            <i class="el-icon-s-data"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            
            <template v-if="currentAdvanced === 2">
                <ul class="table-danger" v-if="riskOfRuinData.length" @mouseleave="mouseleave">
                    <li class="name">
                        <p class="title">{{riskOfRuinData[0].risk_desc}}</p>
                        <p class="title">{{riskOfRuinData[1].risk_desc}}</p>
                        <p class="title">{{riskOfRuinData[2].risk_desc}}</p>
                    </li>
                    <li @mouseenter="mouseover('p100')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p100}}
                        </div>
                    </li>
                    <li @mouseenter="mouseover('p90')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p90}}
                        </div>
                    </li>
                    <li @mouseenter="mouseover('p80')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p80}}
                        </div>
                    </li>
                    <li @mouseenter="mouseover('p70')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p70}}
                        </div>
                    </li>
                    <li @mouseenter="mouseover('p60')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p60}}
                        </div>
                    </li>
                    <li @mouseenter="mouseover('p50')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p50}}
                        </div>
                    </li>
                    <li @mouseenter="mouseover('p40')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p40}}
                        </div>
                    </li>
                    <li @mouseenter="mouseover('p30')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p30}}
                        </div>
                    </li>
                    <li @mouseenter="mouseover('p20')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p20}}
                        </div>
                    </li>
                    <li @mouseenter="mouseover('p10')">
                        <div class="value" v-for="(item, index) in riskOfRuinData" :key="index">
                            {{item.p10}}
                        </div>
                    </li>
                </ul>
                <div style="clear:both; text-align:center; margin-top: 18px;" v-if="mouseoverFont1">
                    <p>有<span style="color:red;">{{mouseoverFont1}}</span>的机会失去<span style="color:red;">{{mouseoverFont2}}</span>的账户，还将需要<span style="color:red;">{{mouseoverFont3}}</span>次连续的亏损交易。</p>
                </div>
            </template>
            
            <template v-show="currentAdvanced === 3">
                <div id="chartdemo_time" style="height:500px" :class="{'time-chart': currentAdvanced !==3}"></div>
            </template>
        </div>

        <div class="charts-container">
            <div class="charts-title-area">
                <div class="title">交易活动</div>
                <div :class="['btn-item item', currentTradingTab === index ? 'active': '']" v-for="(item, index) in tradingArr" :key="index" @click="changeTrade(index)">{{item}}</div>
            </div>
            <div style="min-height: 300px;">
                <el-table
                    v-if="currentTradingTab === 0"
                    v-loading = "openedOrdersDataLoading"
                    element-loading-background = "rgba(0, 0, 0, 0.1)"
                    element-loading-text = "数据正在加载中"
                    element-loading-spinner = "el-icon-loading"
                    :data="openedOrdersData"
                    stripe
                    >
                    <el-table-column
                        fixed
                        prop="opentime"
                        label="开仓时间"
                        width="140">
                    </el-table-column>
                    <el-table-column
                        prop="symbol"
                        label="货币对">
                    </el-table-column>
                    <el-table-column
                        prop="optype_desc"
                        label="行动">
                    </el-table-column>
                    <el-table-column
                        prop="lots"
                        label="手">
                    </el-table-column>
                    <el-table-column
                        prop="openprice"
                        label="开盘价"
                        :formatter="formatterOne"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="stoploss"
                        label="SL(点)">
                    </el-table-column>
                    <el-table-column
                        prop="takeprofit"
                        label="TP(点)">
                    </el-table-column>
                    <el-table-column
                        prop="profit"
                        label="利润(USD)">
                    </el-table-column>
                    <el-table-column
                        prop="pips"
                        label="点">
                    </el-table-column>
                    <el-table-column
                        prop="swap"
                        label="利息">
                    </el-table-column>
                    <!-- 是否有% -->
                    <el-table-column
                        prop="profit_rate"
                        label="获利">
                    </el-table-column>
                </el-table>

                <template v-if="currentTradingTab === 1">
                    <el-table
                        :data="historyOrdersData"
                        v-loading = "historyOrdersDataLoading"
                        element-loading-background = "rgba(0, 0, 0, 0.1)"
                        element-loading-text = "数据正在加载中"
                        element-loading-spinner = "el-icon-loading"
                        stripe
                        >
                        <el-table-column
                            fixed
                            prop="opentime"
                            label="开仓时间"
                            width="140">
                        </el-table-column>
                        <el-table-column
                            prop="closetime"
                            label="平仓时间"
                            min-width="140">
                        </el-table-column>
                        <el-table-column
                            prop="symbol"
                            label="货币对">
                        </el-table-column>
                        <el-table-column
                            prop="optype_desc"
                            label="行动">
                        </el-table-column>
                        <el-table-column
                            prop="lots"
                            label="手">
                        </el-table-column>
                        <el-table-column
                            prop="openprice"
                            label="开盘价"
                            :formatter="formatterOne"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="closeprice"
                            label="平仓价格"
                            :formatter="formatterTwo"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="pips"
                            label="点">
                        </el-table-column>
                        <el-table-column
                            prop="profit"
                            label="利润(USD)">
                        </el-table-column>
                        <el-table-column
                            prop="holdminutes"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="profit_rate"
                            label="获利"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            min-width="110"
                            align="center">
                            <template slot="header">
                                <i class="el-icon-info"></i>
                            </template>
                            <template slot-scope="{row}">
                                <div class="chart_bg_area">
                                    <img class="phb_zhexiantu" style="width: 60px;" @click="gotoLook(row.ticket)" src="../../assets/img/chart_bg.png" />
                                </div>
                                <i class="el-icon-chat-round"></i>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-pagination
                        v-if="historyOrdersNum"
                        background
                        layout="prev, pager, next"
                        :current-page="historyOrdersDataConfig.pageNum"
                        @current-change="currentChange"
                        :total="historyOrdersNum">
                    </el-pagination>
                </template>

                <el-table
                    v-if="currentTradingTab === 2"
                    v-loading = "tradeExposureDataLoading"
                    element-loading-background = "rgba(0, 0, 0, 0.1)"
                    element-loading-text = "数据正在加载中"
                    element-loading-spinner = "el-icon-loading"
                    :data="tradeExposureData"
                    stripe
                    >
                    <el-table-column
                        fixed
                        prop="symbol"
                        label="货币对">
                    </el-table-column>
                    <el-table-column
                        prop="optype_desc"
                        label="行动">
                    </el-table-column>
                    <el-table-column
                        prop="lots"
                        label="手"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        prop="pips"
                        label="点"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        prop="profit"
                        label="利润(USD)">
                    </el-table-column>
                    <el-table-column
                        prop="swap"
                        label="利息">
                    </el-table-column>
                    <el-table-column
                        prop="profit_rate"
                        label="获利">
                        <template slot-scope="{row}">
                            <span style="color:#169F00">{{row.profit_rate}} %</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
            <div style="min-height:300px">
                <el-table
                    :data="otherAccountsData"
                    stripe
                    >
                    <el-table-column
                        fixed
                        prop="nickname"
                        label="名字"
                        width="200">
                        <template slot-scope="{row}">
                            <a style="text-decoration:underline;">{{row.nickname}} -- {{row.symbol}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="profit_rate"
                        label="获利"
                        min-width="120">
                        <template slot-scope="{row}">
                            <span style="color:#169F00">{{row.profit_rate}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="maxdrawdown_rate"
                        label="资金回撤">
                        <template slot-scope="{row}">
                            <span>{{row.maxdrawdown_rate}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="pips"
                        label="点">
                    </el-table-column>
                    <el-table-column
                        prop="tradecount"
                        label="交易">
                    </el-table-column>
                    <el-table-column
                        prop="leverage_desc"
                        label="杠杆值">
                    </el-table-column>
                    <el-table-column
                        fixed="account_type_desc"
                        label="类型">
                    </el-table-column>
                </el-table>
            </div>
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
.el-pagination{
    text-align: right;
    margin-top: 20px;
}
.el-loading-spinner i{
    font-size: 20px;
}
.time-chart{
    margin-top: -500px;
    display: none;
}
</style>
<style lang="scss" scoped>
.chart_bg_area{
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    background: #fff;
    width: 70px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
    padding: 0;
    margin-top: 0;
}
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

.table-head-title{
    span{
        float: left;
        width: 33.33%;
        font-weight: bold;
        text-align: center;
        font-size: 14px;
        padding-bottom: 15px;
    }
}


</style>
<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import { debounce } from '@/utlis';
import { getStatInfo, getTradeStatForPeriod, getAdvStatTradeInfo, getAdvStatSummary, getAdvStatRiskOfRuin, getTradeHistoryOrders, getAdvStatDurations, getTradeOpenedOrders, getTradeExposure, getAnalysisReportForYear, getOtherAccounts } from '@/service/user';

export default {
    data() {
        return {
            yearArr: ['2016', '2017', '2018', '2019'],
            Advanced: ['交易', '概述', '破产风险', '时间'], // 'MAE/MFE'
            testArr3: ['增长率', '余额', '利润', '资金回撤'],
            testArr4: ['统计', '摘要'],
            statisticsInfo: {},
            currentInfo: 0,
            currentChart: 0,
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
            tradeStatForPeriodDataLoading: false,
            tradeStatForPeriodData: [],
            currentAdvanced: 0,
            advStatSummaryLoading: false,
            advStatSummary: [],
            tradeInfo: {},
            riskOfRuinData: [], // 破产风险
            mouseoverFont1: '',
            mouseoverFont2: '',
            mouseoverFont3: '',
            tradingArr: ['持仓（0）', '历史（0）', '敞口'],
            currentTradingTab: 0,
            openedOrdersDataLoading: false,
            historyOrdersDataLoading: false,
            tradeExposureDataLoading: false,
            openedOrdersData: [], // 持仓
            historyOrdersNum: 0,
            historyOrdersData: [], // 历史订单
            tradeExposureData: [], // 敞口
            otherAccountsData: [], // 其他系统板块
            timeData: [], // 高级统计 时间
            historyOrdersDataConfig: {
                pageNum: 1
            }
        };
    },
    methods: {
        async getStatInfo() {
            const data = await getStatInfo({ accountNo: this.$route.query.accountNo }, {showLoading:true});
            this.statisticsInfo = data;
        },
        turnTab(index) {
            this.currentInfo = index;
        },
        turnChart(index) {
            this.currentChart = index;
            this.doChartIndex();
        },
        // 交易板块-周期
        async getTradeStatForPeriod() {
            this.tradeStatForPeriodDataLoading = true;
            const data = await getTradeStatForPeriod({ accountNo: this.$route.query.accountNo });
            if (data.length) {
                this.tradeStatForPeriodData = data;
            }
            this.tradeStatForPeriodDataLoading = false;
            // winrate 胜率 profit_rate 利润率 profit 利润  pips 点数 lots 手数
        },
        advancedChange(index) {
            this.currentAdvanced = index;
            if (index === 0) {
                this.getAdvStatTradeInfo();
            }
            if (index === 1) {
                this.getAdvStatSummary();
            }
            if (index === 2) {
                this.getAdvStatRiskOfRuin();
            }
            if (index === 3) {
                this.getAdvStatDurations();
            }
        },
        // 高级统计-交易
        async getAdvStatTradeInfo() {
            const data = await getAdvStatTradeInfo({ accountNo: this.$route.query.accountNo });
            if (data) {
                this.tradeInfo = data;
            }
        },
        // 高级统计-概述
        async getAdvStatSummary() {
            this.advStatSummaryLoading = true;
            const data = await getAdvStatSummary({ accountNo: this.$route.query.accountNo });
            if (data.length) {
                data.map((item) => {
                    // buy_sumpips sell_sumpips sumpips
                    if (item.buy_sumpips) {
                        item.buy_sumpips = item.buy_sumpips.toFixed(2);
                    }
                    if (item.sell_sumpips) {
                        item.sell_sumpips = item.sell_sumpips.toFixed(2);
                    }
                    if (item.sumpips) {
                        item.sumpips = item.sumpips.toFixed(2);
                    }

                    return item;
                });
                this.advStatSummary = data;
            }
            this.advStatSummaryLoading = false;
        },
        // 高级统计-破产风险 
        async getAdvStatRiskOfRuin() {
            const data = await getAdvStatRiskOfRuin({ accountNo: this.$route.query.accountNo });
            if (data.length) {
                this.riskOfRuinData = data;
            }
        },
        mouseover(key) {
            this.mouseoverFont1 = this.riskOfRuinData[1][key];
            this.mouseoverFont2 = this.riskOfRuinData[0][key];
            this.mouseoverFont3 = this.riskOfRuinData[2][key];
        },
        mouseleave() {
            this.mouseoverFont1 = '';
            this.mouseoverFont2 = '';
            this.mouseoverFont3 = '';
        },
        // 高级统计- 时间
        async getAdvStatDurations() {
            const data = await getAdvStatDurations({ accountNo: this.$route.query.accountNo });
            if (data && data.length) {
                this.timeData = data;
                this.initChart_time(this.timeData);
            }
        },
        // 交易活动 持仓
        async getTradeOpenedOrders() {
            this.openedOrdersDataLoading = true;
            const data = await getTradeOpenedOrders({ accountNo: this.$route.query.accountNo });
            if (data && data.length) {
                this.openedOrdersData = data;
            }
            this.openedOrdersDataLoading = false;
        },
        async changeTrade(index) {
            this.currentTradingTab = index;
            console.log('changeTrade');
            if (index === 0) {
                await this.getTradeOpenedOrders();
            }
            if (index === 1) {
                await this.getTradeHistoryOrders();
            }
            if (index === 2) {
                await this.getTradeExposure();
            }
        },
        // 交易活动 历史订单
        async getTradeHistoryOrders() {
            this.historyOrdersDataLoading = true;
            this.historyOrdersData = [];
            const data = await getTradeHistoryOrders({ accountNo: this.$route.query.accountNo, pageNo: this.historyOrdersDataConfig.pageNum, pageSize: 10 });
            if (data.length) {
                this.tradingArr[1] = `历史（${data[0].rowcount}）`;
                this.historyOrdersNum = data[0].rowcount;
                this.historyOrdersData = data;
            }
            this.historyOrdersDataLoading = false;
        },
        currentChange(val) {
            this.historyOrdersDataConfig.pageNum = val;
            this.getTradeHistoryOrders();
        },
        // 交易活动 敞口
        async getTradeExposure() {
            this.tradeExposureDataLoading = true;
            const data = await getTradeExposure({ accountNo: this.$route.query.accountNo });
            console.log(data);
            if (data.length) {
                this.tradeExposureData = data;
            }
            this.tradeExposureDataLoading = false;
        },
        // 月分析报告
        async getAnalysisReportForYear() {
            const data = await getAnalysisReportForYear({ accountNo: this.$route.query.accountNo,  year: 2020 });
            console.log(data);
        },
        // 其他系统板块
        async getOtherAccounts() {
            const data = await getOtherAccounts({ accountNo: this.$route.query.accountNo });
            console.log(data);
            if (data && data.length) {
                this.otherAccountsData = data;
            }
        },
        formatterOne(row) {
            return row.openprice.toFixed(2);
        },
        formatterTwo(row) {
            return row.closeprice.toFixed(2);
        },
        initChart() {
            this.chart = echarts.init(document.getElementById('chartdemo'));
            const option = this.option;
            this.chart.setOption(option);
        },
        initResizeEvent() {
            window.addEventListener('resize', this.resizeHandler);
        },
        initChart_time(data) {
            // 盈利亏损（1盈利 0亏损） profitflag
            // profit_rate 盈利百分比
            // holdhours 持仓时间（小时）
            // hoursgroup 持仓时间分组
            // ticket 订单号
            const loseDataArr = [];
            const winneDataArr = [];
            data.map((item) => {
                const loseArr = [];
                const winneArr = [];
                if (item.profitflag === 1) {
                    winneArr[0] = item.profit_rate;
                    winneArr[1] = item.holdhours;
                    winneDataArr.push(winneArr);
                } else {
                    loseArr[0] = item.profit_rate;
                    loseArr[1] = item.holdhours;
                    loseDataArr.push(loseArr);
                }
                return item;
            });

            const option = {
                title: {
                    text: '时间'
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
                            + params.value[0] + '% '
                            + params.value[1] + 'h ';
                        }
                        else {
                            return params.seriesName + ' :<br/>'
                            + params.name + ' : '
                            + params.value + 'h ';
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
                            formatter: '{value} %'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value} h'
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
                        data: winneDataArr
                    },
                    {
                        name: '输家',
                        type: 'scatter',
                        color: '#ff7e00',
                        emphasis: {
                            focus: 'series'
                        },
                        data: loseDataArr
                    }
                ]
            };
            this.chart_time = echarts.init(document.getElementById('chartdemo_time'));
            this.chart_time.setOption(option);
        },
        // 增长率
        initChart_up() {
            // chart_growth
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    right: '20%'
                },
                // toolbox: {
                //     feature: {
                //         dataView: {show: true, readOnly: false},
                //         magicType: {show: true, type: ['line', 'bar']},
                //         restore: {show: true},
                //         saveAsImage: {show: true}
                //     }
                // },
                legend: {
                    data: ['手数', '增长率', '净值']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '手数',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} 手'
                        }
                    },
                    {
                        type: 'value',
                        name: '增长率',
                        min: 0,
                        max: 200,
                        position: 'right',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#91CC75'
                            }
                        },
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                    {
                        type: 'value',
                        name: '净值',
                        min: 0,
                        max: 250,
                        position: 'right',
                        offset: 80,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#EE6666'
                            }
                        },
                        axisLabel: {
                            formatter: '{value} 元'
                        }
                    }
                ],
                series: [
                    {
                        name: '手数',
                        type: 'bar',
                        barWidth: 25,
                        color: '#31A521',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        name: '增长率',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.6, 5.9, 9.0, 26.4, 9.7, 10.7, 15.6, 18.2, 28.7, 18.8, 29.0, 22.3]
                    },
                    {
                        name: '净值',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            };
            // growth 增长率 equity_growth 净值 lots 堆
            setTimeout(() => {
                this.chartUp = echarts.init(document.getElementById('chartdemo_up'));
                this.chartUp.setOption(option);
            }, 500);
        },
        // 余额
        initChart_balance() {
            // chart_balance
            // 余额  净值 手数
            const data = this.statisticsInfo.chart_balance;
            const xArr = [];
            const yArr1 = [];
            const yArr2 = [];
            const yArr3 = [];
            data.map((item) => {
                xArr.push(item.ondate);
                yArr1.push(item.lots);
                yArr2.push(item.balance);
                yArr3.push(item.equity);
                return item;
            });
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                grid: {
                    right: '20%'
                },
                // toolbox: {
                //     feature: {
                //         dataView: {show: true, readOnly: false},
                //         magicType: {show: true, type: ['line', 'bar']},
                //         restore: {show: true},
                //         saveAsImage: {show: true}
                //     }
                // },
                legend: {
                    data: ['手数', '余额', '净值']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xArr,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '手数',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} 手'
                        }
                    },
                    {
                        type: 'value',
                        name: '金额',
                        min: 0,
                        position: 'right',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#91CC75'
                            }
                        },
                        axisLabel: {
                            formatter: '{value} $'
                        }
                    }
                ],
                series: [
                    {
                        name: '手数',
                        type: 'bar',
                        barWidth: 25,
                        color: '#31A521',
                        data: yArr1
                    },
                    {
                        name: '余额',
                        type: 'line',
                        yAxisIndex: 1,
                        data: yArr2
                    },
                    {
                        name: '净值',
                        type: 'line',
                        yAxisIndex: 1,
                        data: yArr3
                    }
                ]
            };
            // growth 增长率 equity_growth 净值 lots 堆

            setTimeout(() => {
                this.chart_balance = echarts.init(document.getElementById('chartdemo_yu_e'));
                this.chart_balance.setOption(option);
            }, 500);
        },
        // 利润
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

            setTimeout(() => {
                this.chart_profit = echarts.init(document.getElementById('chartdemo_lirun'));
                this.chart_profit.setOption(option);
            }, 500);
        },
        // 资金回撤
        initChart_drawdown() {
            const data = this.statisticsInfo.chart_drawdown;
            const xArr = [];
            const yArr = [];
            data.map((item) => {
                xArr.push(item.ondate);
                yArr.push(item.drawdown);
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
                    name: '资金回撤',
                    data: yArr,
                    type: 'line'
                }]
            };

            setTimeout(() => {
                this.chart_drawdown = echarts.init(document.getElementById('chartdemo_zijin'));
                this.chart_drawdown.setOption(option);
            }, 500);
        },
        doChartIndex() {
            const _this = this;
            if (this.currentChart === 0) {
                if (!this.chartUp) {
                    _this.initChart_up();// chart_growth 增长率
                }
            }

            if (this.currentChart === 1) {
                // _this.initChart_balance(); // 余额
                if (!this.chart_balance) {
                    _this.initChart_balance(); // 余额
                }
            }

            if (this.currentChart === 2) {
                if (!this.chart_profit) {
                    _this.initChart_lirun(); // 利润
                }
            }

            if (this.currentChart === 3) {
                if (!this.chart_drawdown) {
                    _this.initChart_drawdown(); // 资金回撤
                }
            }
        }
    },
    async mounted() {
        const _this = this;
        await this.getStatInfo();

        this.doChartIndex();
        // 高级统计-交易
        this.getAdvStatTradeInfo();

        // 交易板块-周期
        this.getTradeStatForPeriod();

        // 交易活动栏目
        this.getTradeOpenedOrders();

        // 月分析报告
        this.initChart();

        // 其他系统板块
        this.getOtherAccounts();

        this.getAnalysisReportForYear();
        _this.resizeHandler = debounce(() => {
            if (_this.chart) {
                _this.chart.resize();
            }
        }, 100);
        // _this.initChart();
        // _this.initChart2();
    
        // _this.initResizeEvent();


    }
};
</script>