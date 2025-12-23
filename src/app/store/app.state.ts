import { StatementItem } from '../presentation/shared/models/statement.model';
import { User } from '../presentation/shared/models/user.model';
import { AuthState } from './auth/auth.reducer';

export interface AppState {
  auth: AuthState;
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
  pagination: PaginationState;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  hasMore: boolean;
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