import { DEVICE, ELEMENT_ITEM } from '@constants/enum';
import { IObject } from './common.model';
import { SECTION_STRING } from '@constants/init-value';

export interface IElementCommon {
  device: DEVICE;
  element: IElement;
  is_new_element_style: boolean;
  is_sort_element: boolean;
  list_child: IElementCommon[];
  option: IOptionCommon;
}

export interface IElementDevice {
  class: string[];
  custom_style: IObject;
  option: Partial<IOptionDevice>;
  style: Partial<IStyle>;
}

export interface IStyle {
  width: string;
  top: string;
  left: string;
  height: string;
  background_color: string;
  background_image: string;
  'background-position': string;
  'background-repeat': string;
  border_bottom_left_radius: string;
  border_bottom_right_radius: string;
  border_top_left_radius: string;
  border_top_right_radius: string;
  border_radius: string;
  color: string;
  [index: string]: string;
}

export interface IOptionCommon {
  draggable: boolean;
  duplicate: boolean;
  event_custom_script: string;
  google_ads_conversion: string;
  google_ads_label: string;
  is_sort: boolean;
  is_sync: boolean;
  locked: boolean;
  multiple_parent: boolean;
  parent: string;
  conversion_name: '';
  section_setting: {
    is_tabs: boolean;
    is_selected: boolean;
    tabs_id?: string;
  };
  tooltip_section_sticky: true;
  section_type: 'DEFAULT';
  background_video: {
    video_type: 'youtube';
  };
  icon_setting: {
    type: 'default';
    value_arrow: string;
    value_close: string;
    color: string;
  };
  is_generate_empty: boolean;
  droppable: boolean;
  removable: boolean;
  selectable: boolean;
  data_event: string[];
  action_funnel: boolean;
  innerHTML: string;
  tag_name: string;
  data_tooltip: {
    type: string;
    position: string;
    size: string;
  };
  data_setting: {
    type_dataset: string;
    sort_name: string;
    sort_by: 'desc' | 'asc';
  };
  editable: boolean;
  real_size_element: boolean;
  text_background_image: boolean;
  not_move_out: boolean;
  equals_parent_id: boolean;
  parent_type: string;
  is_accordion_shape: boolean;
  is_pen_tool: boolean;
}

export interface IElement {
  attr: IObject;
  custom_class: string[];
  id: string;
  name: string;
  type: ELEMENT_ITEM | typeof SECTION_STRING;
  mobile: IElementDevice;
  desktop: IElementDevice;
  option: Partial<IOptionCommon>;
  childs: IElement[];
}

export interface IOptionDevice {
  'background-style': string;
  hidden: boolean;
  index: number;
  hover: {
    ontop: boolean;
    transform: IObject;
  };
  background_class: string[];
  background_position: string;
  background_repeat: string;
  sticky: boolean;
  sticky_position: string;
  sticky_position_bottom: string;
  sticky_position_left: string;
  sticky_position_right: string;
  sticky_position_top: string;
  sticky_bar_position: string;
  sticky_bar_position_top: string;
  sticky_bar_position_bottom: string;
  readmore_range: string;
  auto_scroll: boolean;
  overlay: {
    'background-class': string[];
    'background-position': string;
    'background-repeat': string;
  };
  input_padding_left_right: string;
  carousel_crop: any;
}

export interface IElementNoParent {
  id: string;
  element: Partial<IElement>;
}
