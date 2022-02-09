import { Dates } from './types';
declare const initBrowser: () => Promise<any>;
declare const closeBrowser: (browserWSEndpoint: any) => Promise<void>;
declare const get_Date: (browserWSEndpoint: any) => Promise<Dates[]>;
declare const isNewMsg: (Dates: Dates[], reg: RegExp) => any[];
declare const stringFormat: (val: Dates) => String;
declare const getIndexByName: (Dates: Dates[], name: String) => number;
declare const downloadImg: (url: string) => Promise<void>;
export { initBrowser, get_Date, closeBrowser, stringFormat, downloadImg, getIndexByName, isNewMsg, };
