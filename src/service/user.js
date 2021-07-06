import request from '@/service/lib/request';

const aspx = 'InterfaceService.aspx';

/**
 * 用户 - 登录
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @author LiQingSong
 */
export function login(url, data) {
    return request({
      url: aspx,
      serviceName: 'MT4_API.Services.UserService.VerifyLogin',
      method: 'POST',
      data
    });
}

/**
 * 用户 - 获取用户信息和权限
 * @author LiQingSong
 */
export function getInfo(token) {
    console.log(token);
    // return request({
    //   url: '/user/info',
    //   method: 'get',
    //   params: { token: token }
    // });

    const userId = localStorage.getItem('webUserId') || '';

    return new Promise(resolve => {
        const data = {
            roles: ['admin'],
            avatar: '',
            name: 'Admin',
            msgtotal: 100,
            userId
        };
        resolve(data);
    });
}

/**
 * 用户 - 退出
 * @author LiQingSong
 */
export function logout() {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.Common.GetDictByName',
        data: {
            dictName: '性别'
        }
    });
}

// 用户登录成功时调用，进行对MT4的初始化
// 包括加载mt4连接，下载历史订单，更新实时账户资金
export function startMt4(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.Mt4Service.StartMt4',
        data
    });
}

export function regisAccount(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.UserService.AddUser',
        data,
        showLoading: true
    });
}

export function getUserInfo(data, config) {
    const showLoading = config ? config.showLoading : false;
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.UserService.GetUserInfo',
        data,
        showLoading
    });
}

export function updateUser(data, config) {
    const showLoading = config ? config.showLoading : false;
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.UserService.UpdateUser',
        data,
        showLoading
    });
}

// 设置密码
export function setPassWord(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.UserService.UpdateUser',
        data,
        showLoading: true
    });
}

// 重置密码
export function reSetPassWord(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.UserService.ModifyPassword',
        data,
        showLoading: true
    });
}

// 获取交易商列表
export function getTraders() {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.Common.GetTraders',
        showLoading: true
    });
}

// 获取交易商的服务器列表
export function getTraderServers(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.Common.GetTraderServers',
        data,
        showLoading: true
    });
}

export function addAccount(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.AccountService.AddAccount',
        data,
        showLoading: true
    });
}


export function getUserAccountList(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.AccountService.GetUserAccountList',
        data,
        showLoading: true
    });
}

export function getAccountInfo(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.AccountService.GetAccountInfo',
        data,
        showLoading: true
    });
}

export function updateAccount(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.AccountService.UpdateAccount',
        data,
        showLoading: true
    });
}

export function modifyAccountPassword(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.AccountService.ModifyPassword',
        data,
        showLoading: true
    });
}

// 首页本月收益排行榜
export function getHomeTopRank(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetHomeTopRank',
        data,
        showLoading: true
    });
}

// 收益总排行榜
export function getTopRank(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetTopRank',
        data,
        showLoading: false
    });
}

export function getUserAccountBaseStatInfo(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetUserAccountBaseStatInfo',
        data,
        showLoading: false
    });
}

// 信息板块
export function getStatInfo(data, config) {
    const showLoading = config ? config.showLoading : false;
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetStatInfo',
        data,
        showLoading
    });
}

// 交易板块-周期
export function getTradeStatForPeriod(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetTradeStatForPeriod',
        data
    });
}

// 高级统计-交易
export function getAdvStatTradeInfo(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetAdvStatTradeInfo',
        data
    });
}

// 高级统计-概述
export function getAdvStatSummary(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetAdvStatSummary',
        data
    });
}

// 高级统计-破产风险
export function getAdvStatRiskOfRuin(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetAdvStatRiskOfRuin',
        data
    });
}

// 高级统计-持仓时间
export function getAdvStatDurations(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetAdvStatDurations',
        data
    });
}

// 交易活动-持仓订单
export function getTradeOpenedOrders(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetTradeOpenedOrders',
        data
    });
}

// 交易活动-历史订单
export function getTradeHistoryOrders(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetTradeHistoryOrders',
        data
    });
}

// 交易活动-敞口
export function getTradeExposure(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetTradeExposure',
        data
    });
}

// 分析报告
export function getAnalysisReportForYear(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetAnalysisReportForYear',
        data
    });
}

// 其它系统板块
export function getOtherAccounts(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.QueryService.GetOtherAccounts',
        data
    });
}

// 账户消息
export function getUserAccountMessage(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.LogService.GetUserAccountMessage',
        data
    });
}
// 发送邮箱验证码
export function sendEmailVerifyCode(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.UserService.SendEmailVerifyCode',
        data
    });
}
// 交易消息
export function getUserTradeMessage(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.LogService.GetUserTradeMessage',
        data
    });
}

// 消息状态
export function updateMessageViewed(data) {
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.LogService.UpdateMessageViewed',
        data
    });
}

// 删除功能
export function deleteMessagge(data, config) {
    const showLoading = config ? config.showLoading : false;
    return request({
        url: aspx,
        method: 'POST',
        serviceName: 'MT4_API.Services.LogService.DeleteMessagge',
        data,
        showLoading
    });
}




















