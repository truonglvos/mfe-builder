import { Action, createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import * as fromMenuActions from './menu.actions';
import { initialMenuState, IMenuState } from './menu.state';

const menuTopReducer = createReducer(
  initialMenuState,
  on(fromMenuActions.updateShowAddNew, (state, { showAddNew }) => ({
    ...state,
    showAddNew,
  })),
  on(fromMenuActions.updateMenuLeftActive, (state, { menuLeftActive }) => ({
    ...state,
    menuLeftActive,
  })),
  on(
    fromMenuActions.updateElementItemActive,
    (state, { elementItemActive }) => ({
      ...state,
      elementItemActive,
    }),
  ),
  on(
    fromMenuActions.updateShortcutAllElementRight,
    (state, { showShortcutAllElementRight }) => ({
      ...state,
      showShortcutAllElementRight,
    }),
  ),
  on(fromMenuActions.updateDevice, (state, { payload }) => ({
    ...state,
    device: {
      ...state.device,
      ...payload,
    },
  })),
  immerOn(fromMenuActions.toggleTools, (state) => {
    state.tools.active = !state.tools.active;
  }),
  immerOn(fromMenuActions.toggleSnap, (state) => {
    state.tools.snap_grid = !state.tools.snap_grid;
  }),
);

export function reducer(state: IMenuState | undefined, action: Action) {
  return menuTopReducer(state, action);
}
