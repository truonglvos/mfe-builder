import { INDEX_START } from '@constants/init-value';
import { IElement } from '@models/element.model';
export interface IBuilderElement {
  id: string;
  childs?: IBuilderElement[];
}

export interface IListItemInSnap {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  topheight: number;
  leftwidth: number;
  topheightcenter: number;
  leftwidthcenter: number;
  element: Partial<IElement>;
}

export interface IListItemSnapBinding extends IListItemInSnap {
  type: 'top' | 'left' | 'left_width' | 'left_width_center' | 'left_right';
}
export interface IElementObj {
  [index: string]: Partial<IElement>;
}
export interface ISourceState {
  elements: IElementObj;
  builderElements: IBuilderElement[];
  indexElement: number;
  isSnap: boolean;
  isSwapElement: boolean;
  isShortcutAllElement: boolean;
  snapGrid: {
    isEnable: boolean;
    range: number;
  };
  listSectionInSnap: IListItemInSnap[];
  listElementInSnap: IListItemInSnap[];
  listElementInScreen: string[];
  listSectionInScreen: string[];
  listElementGroupTmp: string[];
}

export const initSourceData: ISourceState = {
  listElementInScreen: [],
  listSectionInScreen: [],
  listSectionInSnap: [],
  listElementInSnap: [],
  builderElements: [],
  elements: {},
  indexElement: INDEX_START,
  isSnap: true,
  isSwapElement: false,
  isShortcutAllElement: true,
  snapGrid: {
    isEnable: false,
    range: 10,
  },
  listElementGroupTmp: [],
};
