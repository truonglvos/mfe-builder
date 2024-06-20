import { CONST_DATA } from '@constants/const';
import { ELEMENT_ITEM, DEVICE } from '@constants/enum';
import { copy } from '@shares/utility';

export const SHAPE_CONST = {
  PREFIX: ELEMENT_ITEM.SHAPE.toUpperCase(),
  MIN_SIZE: { width: 5, height: 5 },
  COUNTDOWN_HEADLINE_TYPE: {
    day: 'day',
    hour: 'hour',
    minute: 'minute',
    seconds: 'seconds',
  },
  IS_RESIZE_FONTSIZE: !0,
  RESIZE_EXCEPT: [
    'ladi-n-resize',
    'ladi-s-resize',
    'ladi-ne-resize',
    'ladi-nw-resize',
    'ladi-sw-resize',
  ],
};

export const SHAPE_DEFAULT_DATA_DEVICE = {
  option: {
    index: 1,
    sticky: !1,
    sticky_position: CONST_DATA.POSITION_TYPE.default,
    sticky_position_top: '0px',
    sticky_position_left: '0px',
    sticky_position_bottom: '0px',
    sticky_position_right: '0px',
    hover: {
      color: null,
      opacity: null,
      transform: { scale: null },
      ontop: !1,
    },
    input_padding_left_right: '0px',
    'background-style': null,
    hidden: !1,
  },
  class: [],
  style: {
    width: '150px',
    height: '25px',
    top: '0px',
    left: '0px',
    opacity: null,
    transform: null,
    color: null,
    'font-size': '18px',
    'font-family': null,
    'font-weight': null,
    'text-transform': null,
    'text-decoration-line': null,
    'text-decoration-style': null,
    'text-decoration-color': null,
    'font-style': null,
    'text-align': null,
    'letter-spacing': null,
    'line-height': '1.6',
    'background-image': null,
    'text-shadow': null,
    filter: null,
    'mix-blend-mode': null,
    '-webkit-text-stroke-width': null,
    '-webkit-text-stroke-color': null,
    'animation-name': null,
    'animation-delay': null,
    'animation-duration': null,
    'animation-iteration-count': null,
  },
  custom_style: {},
};

export const SHAPE_DEFAULT_DATA = {
  id: null,
  name: null,
  type: ELEMENT_ITEM.HEADLINE,
  attr: {},
  custom_class: [],
  option: {
    data_event: [],
    action_funnel: !1,
    innerHTML: 'Headline',
    tag_name: 'h3',
    conversion_name: '',
    google_ads_conversion: '',
    google_ads_label: '',
    event_custom_script: '',
    parent: null,
    parent_type: null,
    parent2_type: null,
    repeater_name: null,
    data_tooltip: {
      text: null,
      type: CONST_DATA.TOOLTIP_TYPE.default,
      position: CONST_DATA.TOOLTIP_POSITION.top_middle,
      size: CONST_DATA.TOOLTIP_SIZE.medium,
    },
    data_setting: {
      type: null,
      //   type_dataset: CONST_DATA.DATASET_TYPE.collection,
      value: null,
      sort_name: 'created_at',
      sort_by: CONST_DATA.SORT_BY_TYPE.desc,
    },
    product_type: null,
    ladisale_store_id: null,
    form_account_id: null,
    product_id: null,
    product_variant_id: null,
    product_mapping_name: null,
    product_mapping_name_custom: null,
    is_sync: !0,
    is_sort: !1,
    locked: !1,
    multiple_parent: !0,
    draggable: !0,
    editable: !0,
    removable: !0,
    duplicate: !0,
    selectable: !0,
    real_size_element: !0,
    text_background_image: !0,
    not_move_out: !1,
    equals_parent_id: !1,
  },
  [DEVICE.DESKTOP]: copy(
    SHAPE_DEFAULT_DATA_DEVICE
  ) as typeof SHAPE_DEFAULT_DATA_DEVICE,
  [DEVICE.MOBILE]: copy(
    SHAPE_DEFAULT_DATA_DEVICE
  ) as typeof SHAPE_DEFAULT_DATA_DEVICE,
};

export const createShape = (
  index: number,
  parent: string,
  parent_type: string
) => {
  const element = copy(SHAPE_DEFAULT_DATA);
  element.id = `${SHAPE_CONST.PREFIX}${index}`;
  element.name = `${SHAPE_CONST.PREFIX}${index}`;
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
