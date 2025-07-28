import { createAction, props } from '@ngrx/store';

export const toggleSidebar = createAction('[UI] Toggle Sidebar');
export const closeSidebar = createAction('[UI] Close Sidebar');
export const openSidebar = createAction('[UI] Open Sidebar');

export const toggleAmountVisibility = createAction('[UI] Toggle Amount Visibility');
export const showAmount = createAction('[UI] Show Amount');
export const hideAmount = createAction('[UI] Hide Amount');

export const setTheme = createAction('[UI] Set Theme', props<{ theme: 'light' | 'dark' }>());