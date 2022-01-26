"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNewMsg = exports.getIndexByName = exports.downloadImg = exports.stringFormat = exports.closeBrowser = exports.get_Date = exports.initBrowser = void 0;
const puppeteer = require('puppeteer');
const info_1 = require("./info");
const request = require('request');
const fs = require('fs');
const initBrowser = async () => {
    const browserWSEndpoint = await puppeteer
        .launch({
        headless: true,
        defaultViewport: { width: 1920, height: 1080 },
        args: ['--start-maximized', '--no-sandbox'],
        ignoreDefaultArgs: ['--enable-automation'],
    })
        .then((browser) => {
        return browser.wsEndpoint();
    });
    return browserWSEndpoint;
};
exports.initBrowser = initBrowser;
const closeBrowser = async (browserWSEndpoint) => {
    const browser = await puppeteer.connect({
        browserWSEndpoint: browserWSEndpoint,
    });
    browser.close();
};
exports.closeBrowser = closeBrowser;
const get_Page_Date = async (browser, url, name) => {
    //创建一个Page实例
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 960,
    });
    //打开百度首页
    await page.goto(`${url}`, {
        timeout: 30000,
        waitUntil: ['networkidle0'],
    });
    const data = await page.evaluate(async () => {
        function check() {
            let type_Str = '';
            if (mainCard.querySelector('.repost') !== null) {
                type_Str += 'repost';
            }
            if (mainCard.querySelector('.video-container') !== null) {
                type_Str += 'video';
            }
            if (mainCard.querySelector('.imagesbox') !== null) {
                type_Str += 'imgbox';
            }
            return type_Str;
        } //判断是否为转发动态
        function ifFirstCard() {
            if (document.querySelector('.first-card-with-title') === null) {
                return document.querySelector('.card');
            }
            else {
                return document.querySelectorAll('.card .main-content')[1];
            }
        }
        const imgUrlReg = /\/\/\S*(.jpg|.png)/g;
        const mainCard = ifFirstCard();
        const isRePost = check();
        const time = mainCard.querySelector('.detail-link').innerHTML;
        const msgUrl = mainCard.querySelector('.detail-link')
            .href;
        const post_Content = (mainCard.querySelector('.content .content-full')).innerText; //动态内容
        let repost_Sender = '';
        let repost_content = '';
        let video_content = '';
        let imgSrc = '';
        let videoSrc = '';
        if (isRePost.indexOf('repost') >= 0) {
            repost_Sender = mainCard.querySelector('.repost .up-info .username')
                .innerHTML;
            repost_content = (mainCard.querySelector('.repost .content-full')).innerText;
        }
        if (isRePost.indexOf('imgbox') >= 0) {
            imgSrc =
                'https:' +
                    (mainCard.querySelector('.imagesbox .img-content')).style.backgroundImage
                        .match(imgUrlReg)
                        .join('');
        }
        if (isRePost.indexOf('video') >= 0) {
            imgSrc =
                'https:' +
                    (mainCard.querySelector('.video-container .image-area img')).src
                        .match(imgUrlReg)
                        .join('');
            video_content = (mainCard.querySelector('.video-container .content')).innerText;
            videoSrc = (mainCard.querySelector('.video-container a')).href;
        }
        return {
            time,
            msgUrl,
            post_Content,
            repost_Sender,
            repost_content,
            imgSrc,
            video_content,
            videoSrc,
        };
    });
    await page.close();
    return {
        name,
        data,
    };
};
const get_Date = async (browserWSEndpoint) => {
    //直接连接已经存在的 Chrome
    const browser = await puppeteer.connect({
        browserWSEndpoint: browserWSEndpoint,
    });
    // const task: any[] = [];
    // Urls.forEach(val => {
    //   task.push(
    //     (async () => {
    //       const data: Dates = await get_Page_Date(browser, val.url,val.name);
    //       return data
    //     })()
    //   );
    // });
    // const Dates: Dates[] = await Promise.all(task);   //<-并发式获取数据，要求多核，单核真不行
    const Dates = [];
    Dates[0] = await get_Page_Date(browser, info_1.Urls[0].url, info_1.Urls[0].name);
    Dates[1] = await get_Page_Date(browser, info_1.Urls[1].url, info_1.Urls[1].name);
    Dates[2] = await get_Page_Date(browser, info_1.Urls[2].url, info_1.Urls[2].name);
    Dates[3] = await get_Page_Date(browser, info_1.Urls[3].url, info_1.Urls[3].name);
    Dates[4] = await get_Page_Date(browser, info_1.Urls[4].url, info_1.Urls[4].name);
    Dates[5] = await get_Page_Date(browser, info_1.Urls[5].url, info_1.Urls[5].name);
    return Dates;
};
exports.get_Date = get_Date;
const isNewMsg = (Dates, reg) => {
    const str = [];
    Dates.forEach(val => {
        if (reg.test(val.data.time)) {
            str.push(stringFormat(val));
        }
    });
    return str;
};
exports.isNewMsg = isNewMsg;
const stringFormat = (val) => {
    let str = '';
    str = val.name + ':\n';
    str += val.data.time + '\n';
    str += '\t' + val.data.post_Content + '\n';
    str += val.data.repost_Sender
        ? '原动态: \n' + '\t原动态up:' + val.data.repost_Sender + '\n'
        : val.data.repost_Sender + val.data.repost_content + '\n';
    str += val.data.video_content + '\n' + val.data.repost_content + '\n';
    //str += val.data.msgUrl + '\n';
    return str;
};
exports.stringFormat = stringFormat;
const getIndexByName = (Dates, name) => {
    let order = -1;
    Dates.forEach((val, index) => {
        if (val.name === name) {
            order = index;
        }
    });
    return order;
};
exports.getIndexByName = getIndexByName;
const downloadImg = async (url) => {
    await request(url).pipe(fs.createWriteStream('./bilibili.jpg'));
};
exports.downloadImg = downloadImg;
//# sourceMappingURL=util.js.map