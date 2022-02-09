"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clockin = void 0;
const util_js_1 = require("./util.js");
const config_example_1 = require("./config.example");
const node_schedule_1 = require("node-schedule");
const index_1 = require("../../index");
const baseURL = 'https://we.cqupt.edu.cn/api';
const headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; MuMu Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Safari/537.36 MMWEBID/4360 MicroMessenger/7.0.22.1820(0x27001636) Process/appbrand2 WeChat/arm32 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    'content-type': 'application/json',
};
const { post } = (0, util_js_1.createAxiosInstance)(baseURL, headers);
const random = (min, max) => {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
};
const json2base64 = (json) => Buffer.from(JSON.stringify(json)).toString('base64');
const getClockinStatus = (data) => post('/mrdk/get_mrdk_flag.php', {
    key: json2base64(data),
});
const clockin = (data) => post('/mrdk/post_mrdk_info.php', {
    key: json2base64(data),
});
exports.clockin = clockin;
const dateCode = [
    's9ZS',
    'jQkB',
    'RuQM',
    'O0_L',
    'Buxf',
    'LepV',
    'Ec6w',
    'zPLD',
    'eZry',
    'QjBF',
    'XPB0',
    'zlTr',
    'YDr2',
    'Mfdu',
    'HSoi',
    'frhT',
    'GOdB',
    'AEN0',
    'zX0T',
    'wJg1',
    'fCmn',
    'SM3z',
    '2U5I',
    'LI3u',
    '3rAY',
    'aoa4',
    'Jf9u',
    'M69T',
    'XCea',
    '63gc',
    '6_Kf',
];
const hourCode = [
    '89KC',
    'pzTS',
    'wgte',
    '29_3',
    'GpdG',
    'FDYl',
    'vsE9',
    'SPJk',
    '_buC',
    'GPHN',
    'OKax',
    '_Kk4',
    'hYxa',
    '1BC5',
    'oBk_',
    'JgUW',
    '0CPR',
    'jlEh',
    'gBGg',
    'frS6',
    '4ads',
    'Iwfk',
    'TCgR',
    'wbjP',
];
let switchkey = true;
const PersonalShutReg = /^关闭个人打卡 /;
const PersonalOpenReg = /^打开个人打卡 /;
function getMrdkKey(d, h) {
    return dateCode[d] + hourCode[h];
}
async function healthClockin(name) {
    try {
        const { openid, xh, address, gender } = config_example_1.infos[name].info;
        const { data: clockinStatus } = await getClockinStatus({
            xh,
            timestamp: (0, util_js_1.getNowTimestamp)(),
        });
        const count = clockinStatus.data.count;
        console.log(name + count);
        if (count === '0') {
            const { data: locationData } = await (0, util_js_1.getLocation)(address);
            const result = locationData.result;
            const lng = result.location.lng;
            const lat = result.location.lat;
            const addressBig = `${result.address_components.province},${result.address_components.city},${result.address_components.district}`;
            const locationSmall = result.address_components.city +
                result.address_components.district +
                result.title;
            const locationBig = `中国,${result.address_components.province},${result.address_components.city},${result.address_components.district}`;
            await (0, exports.clockin)({
                name,
                xh,
                xb: gender,
                openid,
                locationBig,
                locationSmall,
                latitude: parseFloat((lat + random(10, 99) * 0.000001).toFixed(6)),
                longitude: parseFloat((lng + random(10, 99) * 0.000001).toFixed(6)),
                szdq: addressBig,
                xxdz: address,
                // 新冠肺炎风险等级，非低风险地区请勿使用
                ywjcqzbl: '低风险',
                // 14 天内是否有中高风险地区旅居史
                ywjchblj: '无',
                // 14 天内是否接触过有中高风险地区旅居史的人员
                xjzdywqzbl: '无',
                // 今日体温是否正常
                twsfzc: '是',
                // 今日是否有与新冠病毒感染有关的症状
                ywytdzz: '无',
                // 备注
                beizhu: '无',
                mrdkkey: getMrdkKey((0, util_js_1.getLocalTime)().getUTCDate(), (0, util_js_1.getLocalTime)().getUTCHours()),
                timestamp: (0, util_js_1.getNowTimestamp)(),
            });
            index_1.msgSender.sendPrivateMsgByGroup('今日打卡成功', config_example_1.infos[name].owner_id);
        }
    }
    catch (error) {
        console.log(error);
        index_1.msgSender.sendPrivateMsgByGroup('今日打卡失败，请手动打卡', config_example_1.infos[name].owner_id);
    }
}
const install = () => {
    index_1.bot.on('message.group', msg => {
        if (msg.raw_message === '关闭每日打卡') {
            if (msg.sender.user_id === 1716509548) {
                switchkey = false;
                msg.reply('关闭成功', false);
            }
            else {
                msg.reply('你何德何能', true);
            }
        }
        else if (msg.raw_message === '打开每日打卡') {
            if (msg.sender.user_id === 1716509548) {
                switchkey = true;
                msg.reply('打开成功', false);
            }
            else {
                msg.reply('你何德何能', true);
            }
        }
        if (PersonalShutReg.test(msg.raw_message)) {
            if (msg.sender.user_id ===
                config_example_1.infos[msg.raw_message.replace(PersonalShutReg, '')].owner_id) {
                config_example_1.infos[msg.raw_message.replace(PersonalShutReg, '')].switch_key = false;
                msg.reply('关闭成功', false);
            }
            else {
                msg.reply('你何德何能', true);
            }
        }
        else if (PersonalOpenReg.test(msg.raw_message)) {
            if (msg.sender.user_id ===
                config_example_1.infos[msg.raw_message.replace(PersonalOpenReg, '')].owner_id) {
                switchkey = true;
                msg.reply('打开成功', false);
            }
            else {
                msg.reply('你何德何能', true);
            }
        }
        if (msg.raw_message === '打卡插件状态查询') {
            if (switchkey) {
                msg.reply('正确的', false);
            }
            else {
                msg.reply('错误的', false);
            }
        }
        // if(msg.raw_message==="懒狗查询"){
        // 	for (const name in infos) {
        // 		const { data: clockinStatus } = getClockinStatus({
        // 			xh:infos[name].xh,
        // 			timestamp: getNowTimestamp(),
        // 		});
        // 		const count = clockinStatus.data.count;
        // 		if(count){
        // 			msgSender.sendGroupMsg(`${name}`);
        // 		}
        // 	}
        // }
    });
    (0, node_schedule_1.scheduleJob)('0 0 8 * * *', () => {
        if (switchkey) {
            for (const name in config_example_1.infos) {
                healthClockin(name);
            }
        }
    });
    for (const name in config_example_1.infos) {
        healthClockin(name);
    }
};
const plugin = {
    name: 'weCqupt',
    install,
};
exports.default = plugin;
//# sourceMappingURL=index.js.map