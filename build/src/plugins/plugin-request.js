"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../index.js");
const install = () => {
    // 同意好友申请
    index_js_1.bot.on('request.friend', e => e.approve());
    // 同意群邀请
    index_js_1.bot.on('request.group.invite', e => e.approve());
    // 同意加群申请，拒绝`e.approve(false)`
    index_js_1.bot.on('request.group.add', e => e.approve());
};
const plugin = {
    name: 'plugin-request',
    install,
};
exports.default = plugin;
//# sourceMappingURL=plugin-request.js.map