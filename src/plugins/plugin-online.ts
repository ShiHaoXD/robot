import {bot, msgSender} from '../index.js';

const install = () => {
  bot.on('system.online', function () {
    // 你的账号已上线，你可以做任何事
    console.log(
      `来自plugin-online: 我是${this.nickname}(${this.uin})，我有${this.fl.size}个好友，${this.gl.size}个群`
    );
  });
};
const plugin = {
  name: 'plugin-online',
  install,
};
export default plugin;
