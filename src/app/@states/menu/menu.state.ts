import { ADD_NEW_LEFT, DEVICE, ELEMENT_ITEM } from '@constants/enum';

export type IDeviceScreen = DEVICE.DESKTOP | DEVICE.MOBILE;

export interface IDevice {
  showAllDevice: boolean;
  deviceScreen: DEVICE;
  width: {
    [DEVICE.DESKTOP]: number;
    [DEVICE.MOBILE]: number;
  };
}

export interface IMenuState {
  showAddNew: boolean;
  menuLeftActive: ADD_NEW_LEFT;
  elementItemActive: ELEMENT_ITEM;
  showShortcutAllElementRight: boolean;
  device: IDevice;
  tools: {
    active: boolean;
    snap_grid: boolean;
  };
}

export const deviceObjDefault: IDevice = {
  showAllDevice: true,
  deviceScreen: DEVICE.DESKTOP,
  width: {
    desktop: 960,
    mobile: 420,
  },
};

export const initialMenuState: IMenuState = {
  showAddNew: false,
  menuLeftActive: ADD_NEW_LEFT.ELEMENT,
  elementItemActive: ELEMENT_ITEM.HEADLINE,
  showShortcutAllElementRight: false,
  device: {
    ...deviceObjDefault,
  },
  tools: {
    active: false,
    snap_grid: false,
  },
};
