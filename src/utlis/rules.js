/*
 * 身份证号
 */
export function isIdentity(code) {
    let reg15;
    let reg18;
    const year = code.substring(6, 10);

    if (!code) {
        return false;
    }
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
        reg15 = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
        reg18 = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
    } else {
        reg15 = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
        reg18 = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
    }
    if (code.length === 15) {
        if (!reg15.test(code)) {
            return false;
        }
    } else if (code.length === 18) {
        if (!reg18.test(code)) {
            return false;
        }
        code = code.toLowerCase();
        code = code.split('');
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        // 校验位
        const parity = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
        }
        if (`${parity[sum % 11]}` !== code[17]) {
            return false;
        }
    } else {
        return false;
    }

    return true;
}

export function checkUsername(rule, value, callback) {
    const reg = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    const mailReg = /^([A-Za-z0-9])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (mailReg.test(value) || (reg.test(value) && value.length <= 20)) {
        callback();
    } else {
        callback(new Error('只支持邮箱或字母、数字和下划线的组合（以字母开头且不超过20位）'));
    }
}

export function checkPassword(rule, value, callback) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,32}$/;
    if (!reg.test(value)) {
        callback(new Error('密码不能少于7位，包含数字和大小写字母'));
    } else {
        callback();
    }
}

export function checkTelephone(rule, value, callback) {
    const reg = /^1\d{10}$/;
    if (!value || reg.test(value)) {
        return callback();
    }
    callback(new Error('手机号格式不正确'));
}
// 检验是否是U盾编码 （只能输入数字和字母,13位）
export function isUNum(rule, value, callback) {
    const reg = /(?!^bai\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/;
    if (value && !reg.test(value)) {
        callback(new Error('只能输入数字和字母'));
    } else if (value.length !== 13) {
        callback(new Error('U盾格式不正确'));
    }
    return callback();
}

export function checkTel(rule, value, callback) {
    const reg = /^1[3456789]\d{9}$|^0[0-9]{2,3}-?[2-9][0-9]{6,7}$/;
    if (!reg.test(value)) {
        callback(new Error('请输入正确的电话号码'));
    } else {
        callback();
    }
}

export function isTelAndPhone(value) {
    const reg1 = /^1(3|4|5|7|8)\d{9}$/;
    const reg2 = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    return reg1.test(value) || reg2.test(value);
}

export function isEmail(value) {
    const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return reg.test(value);
}

export function checkAddr(value) {
    const reg = /^([\u4e00-\u9fa5]+(省|自治区))?[\u4e00-\u9fa5]+市[\u4e00-\u9fa5]+(区|县)\S+$/;
    return reg.test(value);
}

// 将英文符号转化为中文符号
const a = {
    ',': '，',
    '.': '。',
    '!': '！',
    ':': '：',
    '/': '/'
};
export const transfor = (str) => {
    let tmp = '';
    for (let i = 0; i < str.length; i++) {
        tmp += (a[str.charAt(i)]) ? a[str.charAt(i)] : str.charAt(i);
    }
    return tmp;
};
// 是否是数字
export const isRealNum = (val) => {
    if (val === '' || val == null) {
        return false;
    }
    if (!isNaN(val)) {
        // 对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
        // 所以如果不需要val包含这些特殊情况，则这个判断改写为if(!isNaN(val) && typeof val === 'number' )
        return true;
    } else {
        return false;
    }
};
