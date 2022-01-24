import {bot} from '../../index';
const baiduUrl = 'www.baidu.com/s?wd=';
const searchRegExp = /^百度搜索 /;
const UrlPlus = (str: String) => {
  return baiduUrl + str.replace(searchRegExp, '');
};
const install = () => {
  bot.on('message.group', msg => {
    if (searchRegExp.test(msg.raw_message))
      msg.reply(UrlPlus(msg.raw_message), false);
  });
};
const plugin = {
  name: 'plugin-search',
  install,
};
export default plugin;
