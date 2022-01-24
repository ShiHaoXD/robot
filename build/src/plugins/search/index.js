"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../index.js");
const baiduUrl = 'www.baidu.com/s?wd=';
const searchRegExp = /^百度搜索 /;
const UrlPlus = (str) => {
    return baiduUrl + str.replace(searchRegExp, '');
};
const install = () => {
    index_js_1.bot.on('message.group', msg => {
        if (searchRegExp.test(msg.raw_message))
            msg.reply(UrlPlus(msg.raw_message), false);
    });
};
const plugin = {
    name: 'plugin-search',
    install,
};
exports.default = plugin;
//# sourceMappingURL=index.js.map