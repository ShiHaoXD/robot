export declare const createAxiosInstance: (baseURL: any, headers: any) => {
    get: (url: any, params?: {}) => Promise<import("axios").AxiosResponse<any, any>>;
    post: (url: any, data?: {}, config?: {}) => Promise<import("axios").AxiosResponse<any, any>>;
};
export declare const getLocation: (address: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getTodayDate: () => string;
export declare const getNowTimestamp: () => number;
export declare const getNowTimeString: () => string;
export declare const getLocalTime: () => Date;
