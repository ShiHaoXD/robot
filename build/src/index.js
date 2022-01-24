"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgSender = exports.bot = void 0;
const oicq_1 = require("oicq");
const plugins_1 = require("./plugins/plugins");
const messageSender_1 = require("./messageSender");
const account = 3300945532;
const password = 'wushihao12345';
function createBot() {
    const bot = (0, oicq_1.createClient)(account);
    //监听并输入滑动验证码ticket(同一设备只需验证一次)
    // bot.on('system.login.slider', () => {
    //   process.stdin.once('data', input => {
    // 	bot.sliderLogin(input);
    //   });
    // });
    //监听设备锁验证(同一设备只需验证一次)
    bot.on('system.login.device', () => {
        bot.logger.info('验证完成后敲击Enter继续..');
        process.stdin.once('data', () => {
            bot.login();
        });
    });
    bot.login(password);
    return bot;
}
const bot = createBot();
exports.bot = bot;
const msgSender = new messageSender_1.messageSender(bot, 261497187);
exports.msgSender = msgSender;
function installPlugin() {
    plugins_1.plugins.forEach((plugin) => {
        plugin.install();
    });
}
bot.on('message.group', msg => {
    let str = '';
    if (msg.raw_message === '获取当前加载插件') {
        plugins_1.plugins.forEach(val => {
            str += val.name + '\n';
        });
    }
    msgSender.sendGroupMsg(str);
});
installPlugin();
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
//# sourceMappingURL=index.js.map