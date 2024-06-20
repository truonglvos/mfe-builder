import { ADD_NEW_LEFT, ELEMENT_ITEM } from '@constants/enum';
import { createAction, props } from '@ngrx/store';
import { IDevice } from './menu.state';

export const updateShowAddNew = createAction(
  '[Update Top Menu Page] Update Show Add New',
  props<{ showAddNew: boolean }>()
);

export const updateMenuLeftActive = createAction(
  '[Update Left Menu Page ] Update Left Menu Active',
  props<{ menuLeftActive: ADD_NEW_LEFT }>()
);

export const updateElementItemActive = createAction(
  '[Update Left Menu Page] Update Element Item Active',
  props<{ elementItemActive: ELEMENT_ITEM }>()
);

export const updateShortcutAllElementRight = createAction(
  '[Update Left Menu Page] Update Shortcut All Element Right',
  props<{ showShortcutAllElementRight: boolean }>()
);

export const updateDevice = createAction(
  '[Update Top Menu Page] Update Device',
  props<{ payload: Partial<IDevice> }>()
);

export const toggleTools = createAction(
  '[Update Top Menu Page] Toggle Tools',
  props<{ active: boolean }>()
);

export const toggleSnap = createAction(
  '[Update Top Menu Page] Toggle Snap',
  props<{ active: boolean }>()
);
