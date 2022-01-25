import {
  initBrowser,
  get_Date,
  closeBrowser,
  stringFormat,
  getIndexByName,
  isNewMsg,
} from './util';
import {scheduleJob, RecurrenceRule} from 'node-schedule';
import {bot, msgSender} from '../../index';
import {Dates} from './types';
import {segment} from 'oicq';

const install = async () => {
  const Reg = /^获取(嘉然|珈乐|乃琳|贝拉|向晚)最新动态$/i;
  const timeReg = /[0-9] 分钟前/i;
  const rule = new RecurrenceRule();
  const times_minutes = [3,9,15,21,27,33,39,45,51,57];
  rule.minute = times_minutes;
  let flag = true;
  let browserWSEndpoint = await initBrowser(); //初始化
  let Dates: Dates[] = await get_Date(browserWSEndpoint); //初始化数组
  console.log(Dates);
  let lastedMsg = isNewMsg(Dates, timeReg);
  scheduleJob('5 0 0 * * *', async () => {
    //每日重启浏览器
    flag=false;
    await closeBrowser(browserWSEndpoint);
    browserWSEndpoint = await initBrowser();
    flag=true;
  });
  scheduleJob(rule, async () => {
    //设置每6分钟爬取一次
    flag=false;  //锁住
    Dates = await get_Date(browserWSEndpoint);
    lastedMsg = isNewMsg(Dates, timeReg);
    if (!lastedMsg) {
      msgSender.sendGroupMsg(lastedMsg);
    }
    flag=true;
  });
  bot.on('message.group', async msg => {
    if (Reg.test(msg.raw_message)) {
      const index = getIndexByName(Dates, msg.raw_message.slice(2, 4));
      if (Dates[index].data.imgSrc !== '') {
        msgSender.sendGroupMsg([
          stringFormat(Dates[index]),
          segment.image(Dates[index].data.imgSrc),
        ]);
      } else if (Dates[index].data.imgSrc === '') {
        msgSender.sendGroupMsg([stringFormat(Dates[index])]);
      }
    }
    if (msg.raw_message === '强制更新数据' && flag) {
      flag = false;
      msgSender.sendGroupMsg('正在强制更新');
      Dates = await get_Date(browserWSEndpoint);
      msgSender.sendGroupMsg('强制更新成功');
      setTimeout(() => {
        flag = true;
      }, 1000 * 60);
    } else if (msg.raw_message === '强制更新数据' && !flag) {
      msgSender.sendGroupMsg('数据正在更新中');
    }
    if (msg.raw_message === '获取最新动态') {
      if (!lastedMsg) {
        msgSender.sendGroupMsg(lastedMsg);
      } else {
        msgSender.sendGroupMsg('十分钟内无最新动态');
      }
    }
  });
};
const plugin = {
  name: 'A-Soul',
  install,
};
export default plugin;
