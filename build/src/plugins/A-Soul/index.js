"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const node_schedule_1 = require("node-schedule");
const index_1 = require("../../index");
const oicq_1 = require("oicq");
const install = async () => {
    const Reg = /^获取(嘉然|珈乐|乃琳|贝拉|向晚)最新动态$/i;
    const timeReg = /[0-9] 分钟前/i;
    const rule = new node_schedule_1.RecurrenceRule();
    const times_minutes = [10, 20, 30, 40, 50, 0];
    rule.minute = times_minutes;
    let flag = true;
    let browserWSEndpoint = await (0, util_1.initBrowser)(); //初始化
    let Dates = await (0, util_1.get_Date)(browserWSEndpoint); //初始化数组
    console.log(Dates);
    let lastedMsg = (0, util_1.isNewMsg)(Dates, timeReg);
    (0, node_schedule_1.scheduleJob)('5 0 0 * * *', async () => {
        //每日重启浏览器
        await (0, util_1.closeBrowser)(browserWSEndpoint);
        browserWSEndpoint = await (0, util_1.initBrowser)();
    });
    (0, node_schedule_1.scheduleJob)(rule, async () => {
        //设置每十分钟爬取一次
        Dates = await (0, util_1.get_Date)(browserWSEndpoint);
        lastedMsg = (0, util_1.isNewMsg)(Dates, timeReg);
        if (!lastedMsg) {
            index_1.msgSender.sendGroupMsg(lastedMsg);
        }
    });
    index_1.bot.on('message.group', async (msg) => {
        if (Reg.test(msg.raw_message)) {
            const index = (0, util_1.getIndexByName)(Dates, msg.raw_message.slice(2, 4));
            if (Dates[index].data.imgSrc !== '') {
                index_1.msgSender.sendGroupMsg([
                    (0, util_1.stringFormat)(Dates[index]),
                    oicq_1.segment.image(Dates[index].data.imgSrc),
                ]);
            }
            else if (Dates[index].data.imgSrc === '') {
                index_1.msgSender.sendGroupMsg([(0, util_1.stringFormat)(Dates[index])]);
            }
        }
        if (msg.raw_message === '强制更新数据' && flag) {
            flag = false;
            index_1.msgSender.sendGroupMsg('正在强制更新');
            Dates = await (0, util_1.get_Date)(browserWSEndpoint);
            index_1.msgSender.sendGroupMsg('强制更新成功');
            setTimeout(() => {
                flag = true;
            }, 1000 * 60);
        }
        else if (msg.raw_message === '强制更新数据' && !flag) {
            index_1.msgSender.sendGroupMsg('60s内仅允许一次强制更新');
        }
        if (msg.raw_message === '获取最新动态') {
            if (!lastedMsg) {
                index_1.msgSender.sendGroupMsg(lastedMsg);
            }
            else {
                index_1.msgSender.sendGroupMsg('十分钟内无最新动态');
            }
        }
    });
};
const plugin = {
    name: 'A-Soul',
    install,
};
exports.default = plugin;
//# sourceMappingURL=index.js.map