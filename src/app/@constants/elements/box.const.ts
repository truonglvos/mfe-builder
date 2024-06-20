import { CONST_DATA } from '@constants/const';
import { ELEMENT_ITEM, DEVICE } from '@constants/enum';
import { copy } from '@shares/utility';

export const BOX_CONST = {
  PREFIX: ELEMENT_ITEM.BOX.toUpperCase(),
  MIN_SIZE: { width: 5, height: 5 },
  RESIZE_EXCEPT: [],
  IS_SET_BORDER_RADIUS: !0,
  IS_SET_BACKGROUND_COLOR: !0,
  IS_SET_BACKGROUND_IMAGE: !0,
  IS_RESET_SIZE_CAROUSEL: !0,
};

export const BOX_DEFAULT_DATA_DEVICE = {
  option: {
    index: 1,
    sticky: !1,
    sticky_position: CONST_DATA.POSITION_TYPE.default,
    sticky_position_top: '0px',
    sticky_position_left: '0px',
    sticky_position_bottom: '0px',
    sticky_position_right: '0px',
    hover: {
      'background-color': null,
      'border-color': null,
      opacity: null,
      transform: { scale: null },
      ontop: !1,
    },
    click_css: {
      'background-color': null,
      'border-color': null,
      opacity: null,
      transform: { scale: null },
      ontop: !1,
    },
    'background-style': CONST_DATA.BACKGROUND_STYLE.solid,
    overlay: {
      'background-class': ['ladi-background-auto'],
      'background-style': null,
      'background-image': null,
      'background-color': null,
      'background-position': 'center top',
      'background-repeat': 'repeat',
      opacity: null,
      'mix-blend-mode': null,
    },
    hidden: !1,
  },
  class: ['ladi-background-auto'],
  style: {
    width: '200px',
    height: '200px',
    top: '0px',
    left: '0px',
    opacity: null,
    transform: null,
    'background-image': null,
    'background-position': 'center top',
    'background-repeat': 'repeat',
    'border-style': null,
    'border-color': null,
    'border-width': null,
    'border-top-width': null,
    'border-right-width': null,
    'border-bottom-width': null,
    'border-left-width': null,
    'border-radius': null,
    'border-top-left-radius': null,
    'border-top-right-radius': null,
    'border-bottom-left-radius': null,
    'border-bottom-right-radius': null,
    'box-shadow': null,
    filter: null,
    'mix-blend-mode': null,
    'animation-name': null,
    'animation-delay': null,
    'animation-duration': null,
    'animation-iteration-count': null,
    'background-color': 'rgb(241, 243, 244)',
  },
  custom_style: {},
};

export const BOX_DEFAULT_DATA = {
  id: null,
  name: null,
  type: ELEMENT_ITEM.BOX,
  attr: {},
  custom_class: [],
  option: {
    data_event: [],
    action_funnel: !1,
    conversion_name: '',
    google_ads_conversion: '',
    google_ads_label: '',
    event_custom_script: '',
    parent: null,
    repeater_name: null,
    data_tooltip: {
      text: null,
      type: CONST_DATA.TOOLTIP_TYPE.default,
      position: CONST_DATA.TOOLTIP_POSITION.top_middle,
      size: CONST_DATA.TOOLTIP_SIZE.medium,
    },
    is_sync: !0,
    is_sort: !1,
    locked: !1,
    multiple_parent: !0,
    draggable: !0,
    removable: !0,
    duplicate: !0,
    selectable: !0,
  },
  [DEVICE.DESKTOP]: copy(
    BOX_DEFAULT_DATA_DEVICE
  ) as typeof BOX_DEFAULT_DATA_DEVICE,
  [DEVICE.MOBILE]: copy(
    BOX_DEFAULT_DATA_DEVICE
  ) as typeof BOX_DEFAULT_DATA_DEVICE,
};

export const createBox = (
  index: number,
  parent: string,
  parent_type: string
) => {
  const element = copy(BOX_DEFAULT_DATA);
  element.id = `${BOX_CONST.PREFIX}${index}`;
  element.name = `${BOX_CONST.PREFIX}${index}`;
  element[DEVICE.DESKTOP].index = index;
  element[DEVICE.MOBILE].index = index;
  element.option.parent = parent;
  element.option.parent_type = parent_type;
  return {
    element,
    id: element.id as string,
  };
};

// export const headlineGetResizeExcept = (e) => {};
