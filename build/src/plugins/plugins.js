"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
const plugin_hello_1 = require("./plugin-hello");
const plugin_image_1 = require("./plugin-image");
const plugin_request_1 = require("./plugin-request");
const plugin_online_1 = require("./plugin-online");
const index_1 = require("./weCqupt/index");
const index_2 = require("./A-Soul/index");
const plugins = [
    plugin_hello_1.default,
    plugin_image_1.default,
    plugin_request_1.default,
    plugin_online_1.default,
    index_1.default,
    index_2.default,
];
exports.plugins = plugins;
//# sourceMappingURL=plugins.js.map