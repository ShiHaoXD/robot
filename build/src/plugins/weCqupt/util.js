"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalTime = exports.getNowTimeString = exports.getNowTimestamp = exports.getTodayDate = exports.getLocation = exports.createAxiosInstance = void 0;
const axios_1 = require("axios");
const createAxiosInstance = (baseURL, headers) => {
    const instance = axios_1.default.create({
        baseURL,
        headers,
        timeout: 6000,
    });
    async function get(url, params = {}) {
        try {
            return instance.get(url, { params });
        }
        catch (error) {
            throw new Error(error + '');
        }
    }
    async function post(url, data = {}, config = {}) {
        try {
            return instance.post(url, data, config);
        }
        catch (error) {
            throw new Error(error + '');
        }
    }
    return {
        get,
        post,
    };
};
exports.createAxiosInstance = createAxiosInstance;
const getLocation = (address) => axios_1.default.get('https://apis.map.qq.com/ws/geocoder/v1/', {
    params: {
        address,
        key: 'PULBZ-BSEWU-MAEVV-2IAJR-ZCAS3-53F4O',
    },
});
exports.getLocation = getLocation;
const getTodayDate = () => new Date()
    .toLocaleDateString('zh-CN')
    .split('/')
    .map(e => e.padStart(2, '0'))
    .join('-');
exports.getTodayDate = getTodayDate;
const getNowTimestamp = () => Math.round(+new Date() / 1000);
exports.getNowTimestamp = getNowTimestamp;
const getNowTimeString = () => `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString('chinese', {
    hour12: false,
})}`;
exports.getNowTimeString = getNowTimeString;
// 获取北京时间
const getLocalTime = () => new Date(Date.now() + 8 * 60 * 60 * 1000);
exports.getLocalTime = getLocalTime;
//# sourceMappingURL=util.js.map