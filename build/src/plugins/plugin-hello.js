"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const install = () => {
    // hello world
    index_js_1.bot.on('message', msg => {
        if (msg.raw_message === 'hello')
            index_js_1.msgSender.sendGroupMsg('hello world');
        if (msg.raw_message === '撒被')
            index_js_1.msgSender.sendGroupMsg('自问自答是吧');
    });
    // 撤回和发送群消息
    index_js_1.bot.on('message.group', msg => {
        if (msg.raw_message === '获取当前群号')
            index_js_1.msgSender.sendGroupMsg(String(msg.group_id));
        if (msg.atme) {
            index_js_1.msgSender.sendPrivateMsgByGroup('你寄吧谁', msg.member.user_id);
        }
        if (msg.raw_message === 'a手') {
            index_js_1.msgSender.sendGroupMsg('a手我的a手🥵🥵🥵🤤🤤🤤');
        }
    });
    // 接收戳一戳
    index_js_1.bot.on('notice.group.poke', function (e) {
        if (e.target_id === this.uin)
            e.group.sendMsg('dont poke me');
    });
};
const plugin = {
    name: 'plugin-hello',
    install,
};
exports.default = plugin;
//# sourceMappingURL=plugin-hello.js.map