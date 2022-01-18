import {createClient} from "oicq";
import plugins from "./plugins/plugins.js"
import { messageSender } from "./messageSender.js";
const account = 3300945532;
const password="wushihao12345"
function createBot() {
	const bot = createClient(account);
	//监听并输入滑动验证码ticket(同一设备只需验证一次)
	bot.on('system.login.slider', () => {
	  process.stdin.once('data', input => {
		bot.sliderLogin(input);
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
const msgSender=new messageSender(bot,261497187);
export {bot,msgSender};

function installPlugin() {
	plugins.forEach(plugin => {
	  plugin.install();
	});
  }
installPlugin();
process.on("unhandledRejection", (reason, promise) => {
	console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
