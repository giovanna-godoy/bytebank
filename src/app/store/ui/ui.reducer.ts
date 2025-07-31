import { createReducer, on } from '@ngrx/store';
import { UIState } from '../app.state';
import * as UIActions from './ui.actions';

export const initialState: UIState = {
  sidebarOpen: false,
  showAmount: true,
  theme: 'light'
};

export const uiReducer = createReducer(
  initialState,
  on(UIActions.toggleSidebar, (state) => ({
    ...state,
    sidebarOpen: !state.sidebarOpen
  })),
  on(UIActions.openSidebar, (state) => ({
    ...state,
    sidebarOpen: true
  })),
  on(UIActions.closeSidebar, (state) => ({
    ...state,
    sidebarOpen: false
  })),
  on(UIActions.toggleAmountVisibility, (state) => ({
    ...state,
    showAmount: !state.showAmount
  })),
  on(UIActions.showAmount, (state) => ({
    ...state,
    showAmount: true
  })),
  on(UIActions.hideAmount, (state) => ({
    ...state,
    showAmount: false
  })),
  on(UIActions.setTheme, (state, { theme }) => ({
    ...state,
    theme
  }))
);