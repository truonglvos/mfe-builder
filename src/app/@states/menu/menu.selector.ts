import { DEVICE } from '@constants/enum';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMenuState } from './menu.state';

export const selectMenu = createFeatureSelector<IMenuState>('menu');

export const selectShowAddNew = createSelector(
  selectMenu,
  (state) => state.showAddNew
);

export const selectDevice = createSelector(selectMenu, (state) => state.device);

export const isDesktop = createSelector(
  selectDevice,
  (state) => state.deviceScreen === DEVICE.DESKTOP
);

export const selectSnapGrid = createSelector(
  selectMenu,
  (state) => state.tools.snap_grid
);
