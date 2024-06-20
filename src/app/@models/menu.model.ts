import { ADD_NEW_LEFT, ELEMENT_ITEM } from '@constants/enum';

export interface IMenuAddNewLeft {
  isLine: boolean;
  dataShortcutMenu?: boolean;
  label?: string;
  icon?: string;
  value?: ADD_NEW_LEFT;
}

export interface IShortCutMenu {
  label: string;
  type: ELEMENT_ITEM;
}

export interface IElementItem extends IShortCutMenu {
  dataShortcutMenu: boolean;
}
