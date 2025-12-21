export interface Transaction {
  id: number;
  type: TransactionType | string;
  value: number;
  date: string;
  category?: string;
  attachments?: Attachment[];
}

export interface Attachment {
  name: string;
  base64?: string;
}

export enum TransactionType {
  TRANSFERENCIA = 'TRANSFERENCIA',
  DEPOSITO = 'DEPOSITO'
}
