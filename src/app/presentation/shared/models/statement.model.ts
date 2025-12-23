export interface StatementItem {
  id: number;
  type: TransactionType | string;
  value: number;
  date: string;
  category?: string;
  attachments?: AttachmentItem[];
}

export interface AttachmentItem {
  name: string;
  base64?: string;
}

export enum TransactionType {
  TRANSFERENCIA = 'TRANSFERENCIA',
  DEPOSITO = 'DEPOSITO'
}