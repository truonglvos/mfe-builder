import { CONST_DATA } from '@const/const';
import { ELEMENT_ITEM, DEVICE } from '@const/enum';
import { copy } from '@shares/utility';

export const SECTION_CONST = {
  PREFIX: ELEMENT_ITEM.SECTION.toUpperCase(),
  PREFIX_STICKY_BAR: 'STICKY_BAR',
  PREFIX_SECTION_TABS: 'SECTION_TABS',
  ELEMENT_TYPE_STICKY: 'SECTION GLOBAL',
  MIN_SIZE: { width: 5, height: 5 },
  RESIZE_EXCEPT: [
    'ladi-w-resize',
    'ladi-e-resize',
    'ladi-ne-resize',
    'ladi-nw-resize',
    'ladi-se-resize',
    'ladi-sw-resize',
  ],
  IS_STYLE_ONLY_BACKGROUND: !0,
  MAX_CAPTURE_DESKTOP_WIDTH: 1200,
};

export const SECTION_DEFAULT_DATA_DEVICE = {
  option: {
    index: 1,
    sticky: !1,
    sticky_position: CONST_DATA.POSITION_TYPE.top,
    sticky_position_top: '0px',
    sticky_position_bottom: '0px',
    sticky_bar_position: CONST_DATA.POSITION_TYPE.top,
    sticky_bar_position_top: '0px',
    sticky_bar_position_bottom: '0px',
    readmore_range: '0px',
    auto_scroll: !1,
    'background-style': CONST_DATA.BACKGROUND_STYLE.solid,
    'background-opacity': null,
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
    height: '360px',
    'background-image': null,
    'background-color': null,
    'background-position': 'center top',
    'background-repeat': 'repeat',
    filter: null,
    'animation-name': null,
    'animation-delay': null,
    'animation-duration': null,
    'animation-iteration-count': null,
  },
  custom_style: {},
};

export const SECTION_DEFAULT_DATA = {
  id: null,
  name: null,
  type: ELEMENT_ITEM.SECTION,
  attr: {},
  custom_class: [],
  option: {
    conversion_name: '',
    google_ads_conversion: '',
    google_ads_label: '',
    event_custom_script: '',
    parent: null,
    section_setting: {
      is_tabs: !1,
      tabs_id: null,
      is_selected: !1,
      data: null,
    },
    tooltip_section_sticky: !0,
    section_type: CONST_DATA.SECTION_TYPE.default,
    data_global_id: null,
    background_video: {
      video_value: null,
      video_type: CONST_DATA.VIDEO_TYPE.youtube,
    },
    icon_setting: {
      //   type: CONST_DATA.ARROW_TYPE.default,
      value_arrow: '',
      value_close: '',
      color: '#000',
    },
    is_generate_empty: !1,
    is_sync: !0,
    is_sort: !1,
    droppable: !0,
    removable: !0,
    duplicate: !0,
    selectable: !0,
  },
  [DEVICE.DESKTOP]: copy(
    SECTION_DEFAULT_DATA_DEVICE,
  ) as typeof SECTION_DEFAULT_DATA_DEVICE,
  [DEVICE.MOBILE]: copy(
    SECTION_DEFAULT_DATA_DEVICE,
  ) as typeof SECTION_DEFAULT_DATA_DEVICE,
};

export const createSection = (index: number) => {
  const element = copy(SECTION_DEFAULT_DATA);
  element.id = `${SECTION_CONST.PREFIX}${index}`;
  element.name = `${SECTION_CONST.PREFIX}${index}`;
  element[DEVICE.DESKTOP].index = index;
  element[DEVICE.MOBILE].index = index;
  return {
    element,
    id: element.id as string,
  };
};

// export const headlineGetResizeExcept = (e) => {};
