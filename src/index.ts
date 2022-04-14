import {createClient} from 'oicq';
import {plugins} from './plugins/plugins';
import {messageSender} from './messageSender';
const account = 0;
const password = '';
const groupId = 0;
function createBot() {
  const bot = createClient(account);
  //监听并输入滑动验证码ticket(同一设备只需验证一次)
  bot.on('system.login.slider', () => {
    process.stdin.once('data', input => {
      bot.sliderLogin(String(input));
    });
  });

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
const msgSender = new messageSender(bot, groupId);
export {bot, msgSender};

function installPlugin() {
  plugins.forEach(async (plugin: any) => {
    await plugin.install();
  });
}
bot.on('message.group', msg => {
  let str = '';
  if (msg.raw_message === '获取当前加载插件') {
    plugins.forEach(val => {
      str += val.name + '\n';
    });
  }
  msgSender.sendGroupMsg(str);
});
installPlugin();
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
