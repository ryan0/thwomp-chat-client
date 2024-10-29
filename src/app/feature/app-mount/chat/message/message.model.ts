
export interface Message {
  id: number;
  text: string;
  sentAt: Date;
  senderName: string;
  userId: number;
  chatId: number;
}

export interface MessageNew {
  text: string;
  chatId: number;
}
