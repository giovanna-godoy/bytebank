import { StatementItem } from '../shared/models/statement.model';
import { User } from '../shared/models/user.model';

export interface AppState {
  user: UserState;
  transactions: TransactionState;
  ui: UIState;
}

export interface UserState {
  currentUser: User | null;
  amount: number;
  loading: boolean;
  error: string | null;
}

export interface TransactionState {
  items: StatementItem[];
  loading: boolean;
  error: string | null;
  filters: TransactionFilters;
}

export interface TransactionFilters {
  searchTerm: string;
  type: string | null;
  dateFrom: string | null;
  dateTo: string | null;
}

export interface UIState {
  sidebarOpen: boolean;
  showAmount: boolean;
  theme: 'light' | 'dark';
}