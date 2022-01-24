declare class messageSender {
    client: any;
    groupId: any;
    constructor(client: any, groupId: any);
    sendPrivateMsgByGroup: (msg: String, receiverId: number) => void;
    sendGroupMsg: (msg: String | Array<any>) => void;
}
export { messageSender };
