import axios from 'axios';
export const createAxiosInstance = (baseURL: any, headers: any) => {
  const instance = axios.create({
    baseURL,
    headers,
    timeout: 6000,
  });

  async function get(url: any, params = {}) {
    try {
      return instance.get(url, {params});
    } catch (error) {
      throw new Error(error + '');
    }
  }

  async function post(url: any, data = {}, config = {}) {
    try {
      return instance.post(url, data, config);
    } catch (error) {
      throw new Error(error + '');
    }
  }
  return {
    get,
    post,
  };
};
export const getLocation = (address: any) =>
  axios.get('https://apis.map.qq.com/ws/geocoder/v1/', {
    params: {
      address,
      key: 'PULBZ-BSEWU-MAEVV-2IAJR-ZCAS3-53F4O',
    },
  });
export const getTodayDate = () =>
  new Date()
    .toLocaleDateString('zh-CN')
    .split('/')
    .map(e => e.padStart(2, '0'))
    .join('-');

export const getNowTimestamp = () => Math.round(+new Date() / 1000);

export const getNowTimeString = () =>
  `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(
    'chinese',
    {
      hour12: false,
    }
  )}`;

// 获取北京时间
export const getLocalTime = () => new Date(Date.now() + 8 * 60 * 60 * 1000);
