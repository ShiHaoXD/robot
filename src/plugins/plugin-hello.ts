import {segment} from 'oicq';
import {bot, msgSender} from '../index';

const install = () => {
  // hello world
  bot.on('message', msg => {
    if (msg.raw_message === 'hello') msgSender.sendGroupMsg('hello world');
    if (msg.raw_message === '撒被') msgSender.sendGroupMsg('自问自答是吧');
  });

  // 撤回和发送群消息
  bot.on('message.group', msg => {
    if (msg.raw_message === '获取当前群号')
      msgSender.sendGroupMsg(String(msg.group_id));
    if (msg.atme) {
      msgSender.sendPrivateMsgByGroup('你寄吧谁', msg.member.user_id);
    }
    if (msg.raw_message === 'a手') {
      msgSender.sendGroupMsg('a手我的a手🥵🥵🥵🤤🤤🤤');
    }
    if (msg.raw_message === '测试') {
      msgSender.sendGroupMsg([['123'], ['456']]);
    }
  });

  // 接收戳一戳
  bot.on('notice.group.poke', function (e) {
    if (e.target_id === this.uin) e.group.sendMsg('dont poke me');
  });
};
const plugin = {
  name: 'plugin-hello',
  install,
};
export default plugin;
