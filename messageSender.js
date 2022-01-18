import {bot} from "./index.js"
class messageSender {
	bot;
	groupId;
	constructor(client, groupId) {
		this.client = client;
		this.groupId = groupId;
	}
	sendPrivateMsgByGroup = (msg, receiverId) => {
		this.client.pickGroup(this.groupId).pickMember(receiverId).sendMsg(msg);
	};
	sendGroupMsg = (msg) => {
		this.client.sendGroupMsg(this.groupId, msg);
	};
}
export { messageSender };
