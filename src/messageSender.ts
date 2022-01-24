class messageSender {
  client;
  groupId;
  constructor(client: any, groupId: any) {
    this.client = client;
    this.groupId = groupId;
  }
  sendPrivateMsgByGroup = (msg: String, receiverId: number) => {
    this.client.pickGroup(this.groupId).pickMember(receiverId).sendMsg(msg);
  };
  sendGroupMsg = (msg: String | Array<any>) => {
    this.client.sendGroupMsg(this.groupId, msg);
  };
}
export {messageSender};
