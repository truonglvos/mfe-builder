import { DEVICE } from '@constants/enum';

export interface IAppState {
  showAddNew: boolean;
}

export interface IDemension {
  top: number;
  height: number;
  left: number;
  width: number;
  topAbsolute?: number;
}

export type ICurrentElementType =
  | 'item_normal'
  | 'section_normal'
  | 'group_tmp'
  | 'noon';

export interface ILandingFirebaseItem {
  source: string;
  builderSource: string;
  indexElement: number;
}

export type ISafeType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

export interface IElementPosition {
  [DEVICE.DESKTOP]: {
    [index: string]: IDemension;
  };
  [DEVICE.MOBILE]: {
    [index: string]: IDemension;
  };
}
