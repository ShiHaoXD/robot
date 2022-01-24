"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSender = void 0;
class messageSender {
    constructor(client, groupId) {
        this.sendPrivateMsgByGroup = (msg, receiverId) => {
            this.client.pickGroup(this.groupId).pickMember(receiverId).sendMsg(msg);
        };
        this.sendGroupMsg = (msg) => {
            this.client.sendGroupMsg(this.groupId, msg);
        };
        this.client = client;
        this.groupId = groupId;
    }
}
exports.messageSender = messageSender;
//# sourceMappingURL=messageSender.js.map