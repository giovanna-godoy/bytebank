export interface StatementItem {
  id: number;
  type: TransactionType | string;
  value: number;
  date: string;
}

export enum TransactionType {
  TRANSFERENCIA = 'TRANSFERENCIA',
  DEPOSITO = 'DEPOSITO'
}