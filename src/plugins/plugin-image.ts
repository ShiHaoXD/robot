import {segment} from 'oicq';
import {bot, msgSender} from '../index.js';

const install = () => {
  // 回复图片
  bot.on('message', msg => {
    if (msg.raw_message === 'image')
      msg.reply(
        segment.image(
          'https://sqimg.qq.com/qq_product_operations/im/qqlogo/imlogo.png'
        )
      );
  });

  // 回复表情
  bot.on('message', msg => {
    if (msg.raw_message === 'face')
      msg.reply([segment.face(101), segment.face(102), '\ntwo faces']);
  });
};
const plugin = {
  name: 'plugin-image',
  install,
};
export default plugin;
