"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oicq_1 = require("oicq");
const index_js_1 = require("../index.js");
const install = () => {
    // 回复图片
    index_js_1.bot.on('message', msg => {
        if (msg.raw_message === 'image')
            msg.reply(oicq_1.segment.image('https://sqimg.qq.com/qq_product_operations/im/qqlogo/imlogo.png'));
    });
    // 回复表情
    index_js_1.bot.on('message', msg => {
        if (msg.raw_message === 'face')
            msg.reply([oicq_1.segment.face(101), oicq_1.segment.face(102), '\ntwo faces']);
    });
};
const plugin = {
    name: 'plugin-image',
    install,
};
exports.default = plugin;
//# sourceMappingURL=plugin-image.js.map