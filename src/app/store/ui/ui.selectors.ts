import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UIState } from '../app.state';

export const selectUIState = createFeatureSelector<UIState>('ui');

export const selectSidebarOpen = createSelector(
  selectUIState,
  (state: UIState) => state.sidebarOpen
);

export const selectShowAmount = createSelector(
  selectUIState,
  (state: UIState) => state.showAmount
);

export const selectTheme = createSelector(
  selectUIState,
  (state: UIState) => state.theme
);