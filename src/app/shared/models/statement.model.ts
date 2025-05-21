export interface StatementItem {
  id: number;
  type: TransactionType;
  value: number;
  date: string;
}

export enum TransactionType {
  TRANSFERENCIA = 'Transferência',
  DEPOSITO = 'Depósito'
}