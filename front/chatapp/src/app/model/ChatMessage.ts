export class ChatMessage {

    constructor(
        public id: string,
        public chatId: string,
        public senderId: string,
        public recipientId: string,
        public senderName: string,
        public recipientName: string,
        public content: string,
        public timestamp: Date,
        public status: string) {

    }

}