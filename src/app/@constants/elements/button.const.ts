import { CONST_DATA } from '@const/const';
import { ELEMENT_ITEM, DEVICE } from '@const/enum';
import { copy } from '@shares/utility';

export const BUTTON_CONST = {
  PREFIX: ELEMENT_ITEM.BUTTON.toUpperCase(),
  PREFIX_ADD_TO_CART: 'BUTTON_ADD_TO_CART',
  PREFIX_BUY_NOW: 'BUTTON_BUY_NOW',
  MIN_SIZE: { width: 5, height: 5 },
  PREFIX_CHILD: 'BUTTON_TEXT',
  PREFIX_CHILD_SHAPE: 'BUTTON_SHAPE',
  TAG_LABEL: 'p',
  RESIZE_EXCEPT: [],
  IS_STYLE_ONLY_BACKGROUND: !0,
  IS_SET_BORDER_RADIUS: !0,
  IS_SET_BACKGROUND_COLOR: !0,
};

export const BUTTON_DEFAULT_DATA_DEVICE = {
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
      shape_color: null,
      'background-color': null,
      'border-color': null,
      opacity: null,
      transform: { scale: null },
      ontop: !1,
    },
    // 'background-style': LadiPageScript.const.BACKGROUND_STYLE.solid,
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
    width: '160px',
    height: '40px',
    top: '0px',
    left: '0px',
    opacity: null,
    transform: null,
    'background-image': null,
    'background-color': null,
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
  },
  custom_style: {},
};

export const BUTTON_DEFAULT_DATA = {
  id: null,
  name: null,
  type: ELEMENT_ITEM.BUTTON,
  attr: {},
  custom_class: [],
  option: {
    data_event: [],
    action_funnel: !1,
    data_submit_form_id: null,
    conversion_name: '',
    google_ads_conversion: '',
    google_ads_label: '',
    event_custom_script: '',
    parent: null,
    parent_type: null,
    repeater_name: null,
    data_tooltip: {
      text: null,
      type: CONST_DATA.TOOLTIP_TYPE.default,
      position: CONST_DATA.TOOLTIP_POSITION.top_middle,
      size: CONST_DATA.TOOLTIP_SIZE.medium,
    },
    data_setting: {
      type: null,
      //   type_dataset: CONST_DATA.const.DATASET_TYPE.collection,
      value: null,
      sort_name: 'created_at',
      //   sort_by: LadiPageScript.const.SORT_BY_TYPE.desc,
    },
    product_type: null,
    ladisale_store_id: null,
    form_account_id: null,
    product_id: null,
    product_variant_id: null,
    is_use_shape: !1,
    is_sync: !0,
    is_sort: !1,
    is_add_to_cart: !1,
    is_submit_form: !1,
    is_buy_now: !1,
    locked: !1,
    multiple_parent: !0,
    draggable: !0,
    removable: !0,
    duplicate: !0,
    selectable: !0,
  },
  [DEVICE.DESKTOP]: copy(
    BUTTON_DEFAULT_DATA_DEVICE,
  ) as typeof BUTTON_DEFAULT_DATA_DEVICE,
  [DEVICE.MOBILE]: copy(
    BUTTON_DEFAULT_DATA_DEVICE,
  ) as typeof BUTTON_DEFAULT_DATA_DEVICE,
};

export const createButton = (
  index: number,
  parent: string,
  parent_type: string,
) => {
  const element = copy(BUTTON_DEFAULT_DATA);
  element.id = `${BUTTON_CONST.PREFIX}${index}`;
  element.name = `${BUTTON_CONST.PREFIX}${index}`;
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
