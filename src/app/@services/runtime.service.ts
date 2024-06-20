import { Injectable } from '@angular/core';
import { DEVICE, ELEMENT_ITEM } from '@constants/enum';
import {
  copy,
  isEmpty,
  isFunction,
  parseFloatLadi,
  parseFloatLadiPage,
} from '@shares/utility';
import { IData, IRuntime } from './runtime.model';
import { LadiPageScriptService } from './ladi-page-script.service';
import { LadipagePluginService } from './ladipage-plugin.service';
import { NgEventBus } from 'ng-event-bus';

@Injectable({
  providedIn: 'root',
})
export class RuntimeService {
  const = {
    VERSION: 2,
    // LINK_STATIC_DEFAULT: LadiPageConfig.link_static_default,
    // LINK_BUILDER_IMG: LadiPageConfig.link_builder_img,
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
    LIST_ID_EXCEPT: [
      'SECTION_POPUP',
      'BODY_BACKGROUND',
      'POPUP_CART',
      'POPUP_CHECKOUT',
      'POPUP_PRODUCT',
      'POPUP_BLOG',
      'POPUP_OTP',
      'FORM_OTP_DEFAULT',
      'default',
    ],
    ELEMENT_START_PREFIX: [
      'DROPBOX',
      'QUANTITY',
      'VARIANT',
      'BUTTON_ADD_TO_CART',
      'BUTTON_BUY_NOW',
      'CART_BUTTON',
      'FORM_LOGIN',
      'FORM_OTP',
      'PEN_TOOL',
      'PRODUCT_LIST',
      'CART_ICON',
      'TAB_ITEM',
      'ACCORDION_MENU',
      'ACCORDION_SHAPE',
      'ACCORDION_CONTENT',
    ],
    GOOGLE_RECAPTCHA_CHECKBOX_POSITION: {
      left: 'left',
      center: 'center',
      right: 'right',
    },
    BACKGROUND_STYLE_FULL: { width: 'width', height: 'height' },
    GRADIENT_TYPE: {
      linear_prefix: 'linear-gradient',
      linear: 'linear-gradient({0}deg, {1}, {2})',
      radial_prefix: 'radial-gradient',
      radial: 'radial-gradient(circle, {0}, {1})',
    },
    ARROW_TYPE: { none: 'none', default: 'default', custom: 'custom' },
    TARGET_LINK: { self: '_self', blank: '_blank' },
    FILE_ACCEPT_TYPE: {
      image: '.jpg, .jpeg, .png, .gif, .svg, .ico',
      video: '.mp4',
      font: '.ttf, .otf, .woff2',
      document: '.txt, .doc, .docx, .xls, .xlsx, .pdf',
      audio: '.mp3',
    },
    EDITOR_TYPE: {
      datetime: 'datetime',
      time: 'time',
      list_tab: 'list_tab',
      list_frame: 'list_frame',
      list_section_tab: 'list_section_tab',
      shape_html: 'shape_html',
      shape_html_2nd_click: 'shape_html_2nd_click',
      banner_resize: 'banner_resize',
      constraint: 'constraint',
      animation: 'animation',
      countdown_item_margin_right: 'countdown_item_margin_right',
      icon_image: 'icon_image',
      text_shadow: 'text_shadow',
      edit_text_font1: 'edit_text_font1',
      edit_text_font2: 'edit_text_font2',
      edit_shape_align: 'edit_shape_align',
      background_image: 'background_image',
      backdrop_image: 'backdrop_image',
      overlay_image: 'overlay_image',
      filter: 'filter',
      transform: 'transform',
      box_shadow: 'box_shadow',
      icon_setting_preview: 'icon_setting_preview',
      color: 'color',
      color_gradient: 'color_gradient',
      color_gradient_1: 'color_gradient_1',
      color_gradient_2: 'color_gradient_2',
      seconds: 'seconds',
      gallery_item: 'gallery_item',
      survey_option: 'survey_option',
      array_line: 'array_line',
      array_space: 'array_space',
      object: 'object',
      deg: 'deg',
      text: 'text',
      dataset: 'dataset',
      textarea: 'textarea',
      image: 'image',
      image_2nd_click: 'image_2nd_click',
      shape: 'shape',
      script: 'script',
      action: 'action',
      data_event: 'data_event',
      data_event_item: 'data_event_item',
      checkbox1: 'checkbox1',
      number: 'number',
      pixel: 'pixel',
      mask: 'mask',
      option: 'option',
      boolean: 'boolean',
      multiple_option: 'multiple_option',
      table_width_header: 'table_width_header',
    },
    ELEMENT_CHILD_ALIGN: {
      left: 'left',
      right: 'right',
      top: 'top',
      bottom: 'bottom',
      center_vertical: 'center_vertical',
      center_horizontal: 'center_horizontal',
      distribute_vertical: 'distribute_vertical',
      distribute_horizontal: 'distribute_horizontal',
      auto: 'auto',
    },
    ELEMENT_EVENT: { selected: 'selected', hold: 'hold' },
    ROLLBACK_ACTION_TYPE: {
      add: 'add',
      delete: 'delete',
      update_old: 'update_old',
      update_new: 'update_new',
    },
    RESIZE_RULE: {
      n: 'n',
      e: 'e',
      w: 'w',
      s: 's',
      ne: 'ne',
      nw: 'nw',
      se: 'se',
      sw: 'sw',
    },
    TYPE_FILE: {
      video: 'VIDEO',
      image: 'IMAGE',
      font: 'FONT',
      document: 'DOCUMENT',
      audio: 'AUDIO',
      section: 'section',
      popup: 'popup',
      dropbox: 'dropbox',
      assets: 'assets',
      banner: 'banner',
    },
    LADIPAGE_LIST_TYPE: {
      ladipage: 'LADIPAGE',
      popupx: 'POPUPX',
      popupx_popup: 'POPUPX_POPUP',
      popupx_sticky_bar: 'POPUPX_STICKY_BAR',
    },
    REPEATER_TYPE: {
      image_src: 'image_src',
      gallery_images: 'gallery_images',
      shape_html: 'shape_html',
      video_value: 'video_value',
      video_type: 'video_type',
      sub_group_setting_background: 'setting_background',
      group_design: 'design',
      group_effect: 'effect',
    },
    MEDIA_MANAGER_TYPE: {
      video: 'video',
      ladipage: 'ladipage',
      unsplash: 'UNSPLASH',
      pixabay: 'PIXABAY',
      pexels: 'PEXELS',
      illustration: 'Illustration',
      free: 'FREE',
    },
    PACKAGE_TYPE: { premium: 'PREMIUM', free: 'FREE' },
    SURVEY_TYPE: { text: 'text', image: 'image', text_image: 'text_image' },
    SETTING_INTEGRATIONS_TYPE: {
      form_config: 'form_config',
      form_account: 'form_account',
      tracking: 'tracking',
    },
    FORM_ACCOUNT_GROUP: {
      form_data: 'FORM_DATA',
      publish: 'PUBLISH',
      product: 'PRODUCT',
    },
    ADV_INTEGRATIONS_TYPE: { default: 'default', publish: 'publish' },
    DATASET_FIELD_GROUP_TYPE: { system: 'SYSTEM', primary: 'PRIMARY' },
    TABLE_STICKY_HEADER_TYPE: {
      header: 'header',
      column_1: 'column_1',
      header_column_1: 'header_column_1',
    },
    DESIGN_TYPE: {
      responsive: 'RESPONSIVE',
      adaptive: 'ADAPTIVE',
      mobile_only: 'MOBILE_ONLY',
    },
  };
  runtime: IRuntime = {
    now: Date.now(),
    position_element: {
      desktop: {},
      mobile: {},
    },
    element_is_dragging: false,
    size_element: {},
    size_image_element: {},
    size_image_crop_element: {},
    element_select_parent: !0,
    element_select_parent_first: !0,
    mouse_hold_position_x: 0,
    mouse_hold_position_y: 0,
    max_data_event_length: 10,
    file_upload_max_item: 10,
    form_file_upload_max_item: 5,
    builder_container_class: 'builder-container',
    builder_editor_id: 'builder-editor',
    builder_container_id: 'builder-container',
    builder_preview_id: 'builder-preview',
    builder_rotate_doc_id: 'builder-rotate-doc',
    builder_mouse_hold_id: 'builder-mouse-hold',
    builder_group_tmp_id: 'builder-group-tmp',
    builder_attribute_editor_id: 'builder-attribute-editor',
    builder_body_editor_id: 'builder-body-editor',
    builder_one_setting_editor_id: 'builder-one-setting-editor',
    builder_quick_editor_id: 'builder-quick-editor',
    builder_section_editor_id: 'builder-section-editor',
    builder_color_editor_id: 'builder-color-editor',
    builder_emoji_id: 'builder-emoji',
    builder_quick_editor_up_down_id: 'builder-quick-editor-up-down',
    builder_quick_editor_move_id: 'builder-quick-editor-move',
    builder_editor_html_id: 'builder-editor-html',
    builder_input_multiple_file_id: 'builder-input-multiple-file',
    builder_input_file_group_new_id: 'builder-input-file-group-new',
    builder_input_your_template_group_new_id:
      'builder-input-your-template-group-new',
    builder_rotate_text_id: 'builder-rotate-text',
    builder_content_tab_page_setting_id: 'builder-content-tab-page-setting',
    builder_content_tab_page_setting_before_head_id:
      'builder-content-tab-page-setting-before-head',
    builder_content_tab_page_setting_before_body_id:
      'builder-content-tab-page-setting-before-body',
    builder_attribute_event_custom_script_id:
      'builder-attribute-event-custom-script',
    builder_type_color_editor_id: 'builder-type-color-editor',
    builder_type_color_gradient_editor_1_id:
      'builder-type-color-gradient-editor-1',
    builder_type_color_gradient_editor_2_id:
      'builder-type-color-gradient-editor-2',
    builder_color_angel_input_id: 'builder-color-angel-input',
    builder_input_section_name_new_id: 'builder-input-section-name-new',
    builder_input_popup_name_new_id: 'builder-input-popup-name-new',
    builder_input_dropbox_name_new_id: 'builder-input-dropbox-name-new',
    builder_input_assets_name_new_id: 'builder-input-assets-name-new',
    builder_input_template_thumb_new_id: 'builder-input-template-thumb-new',
    builder_input_template_thumb_new_name_id:
      'builder-input-template-thumb-new-name',
    builder_input_your_template_item_name_new_id:
      'builder-input-your-template-item-name-new',
    builder_input_file_name_new_id: 'builder-input-file-name-new',
    builder_input_dataset_name_new_id: 'builder-input-dataset-name-new',
    builder_input_link_text_id: 'builder-input-link-text',
    builder_link_editor_id: 'builder-link-editor',
    builder_animated_editor_id: 'builder-animated-editor',
    builder_animated_list_text_id: 'builder-animated-list-text',
    builder_search_file_input_id: 'builder-search-file-input',
    builder_search_shape_input_id: 'builder-search-shape-input',
    builder_quick_editor_input_font_size:
      'builder-quick-editor-input-font-size',
    builder_quick_editor_input_border_width:
      'builder-quick-editor-input-border-width',
    builder_quick_editor_input_border_radius:
      'builder-quick-editor-input-border-radius',
    builder_section_tab_id: 'builder-section-tab',
    builder_popup_tab_id: 'builder-popup-tab',
    builder_dropbox_tab_id: 'builder-dropbox-tab',
    builder_banner_tab_id: 'builder-banner-tab',
    builder_file_tab_id: 'builder-file-tab',
    builder_select_form_setting_event_custom_id:
      'builder-select-form-setting-event-custom',
    builder_modal_publish_id: 'builder-modal-publish',
    builder_attribute_action_funnel_id: 'builder-attribute-action-funnel',
    builder_attribute_action_collapse_is_show_id:
      'builder-attribute-action-collapse-is-show',
    builder_input_dataset_search_id: 'builder-input-dataset-search-id',
    builder_input_toggle_grid_id: 'input-toggle-grid',
    builder_input_toggle_snap_id: 'input-toggle-snap',
    builder_input_toggle_swap_element_id: 'input-toggle-swap-element',
    builder_input_toggle_shortcut_all_element_id:
      'input-toggle-shortcut-all-element',
    builder_snap_grid_id: 'builder-snap-grid',
    builder_snap_top_id: 'builder-snap-top',
    builder_snap_left_id: 'builder-snap-left',
    builder_snap_bottom_id: 'builder-snap-bottom',
    builder_snap_right_id: 'builder-snap-right',
    builder_snap_rect: {
      top: 0,
      left: 0,
    },
    builder_attribute_input_move: !1,
    builder_attribute_input_move_min_pixel: 1,
    builder_attribute_input_move_diff_percent: 5,
    builder_attribute_input_move_element: null,
    builder_attribute_input_move_value: 0,
    builder_attribute_input_move_position_x: 0,
    builder_is_hold: !1,
    builder_is_hold_group_tmp: !1,
    builder_is_quick_editor_up_down: !1,
    builder_is_quick_editor_move: !1,
    builder_is_menu_move: !1,
    builder_is_image_background_move: !1,
    builder_is_image_background_resize: !1,
    builder_is_resize: !1,
    builder_is_rotate: !1,
    builder_is_show_type_image_display: !1,
    is_meta_key: !1,
    builder_menu_move_element: null,
    builder_resize_rule: '',
    builder_mapping_attribute: null,
    builder_unique_id: 1,
    builder_pickr_object: {},
    builder_position_click_x: 0,
    builder_position_click_y: 0,
    builder_position_click_double_click_max: 3,
    builder_constraint_size: !0,
    builder_gradient_editor_all: !1,
    builder_max_count_banner_download: 25,
    builder_section_max_height_sticky: 150,
    builder_menu_top: 56,
    builder_menu_left: 0,
    builder_menu_right: 0,
    builder_menu_bottom: 0,
    builder_carousel_crop: {},
    builder_image_crop: {},
    current_event: this.const.ELEMENT_EVENT.selected,
    current_pixel_snap: 0,
    current_element_id: '',
    current_element_type: '',
    current_element_parent_type: null,
    current_element_parent_id: null,
    current_element_hover_id: null,
    current_addnew_section_id: null,
    current_addnew_section_is_last: !1,
    current_addnew_section_callback: null,
    current_margin_top_popup: 0,
    current_popup_id: '',
    check_click_first_child: !0,
    count_mouse_down_click: 0,
    current_select_text_range: null,
    current_scope: {
      [DEVICE.DESKTOP]: {},
      [DEVICE.MOBILE]: {},
    },
    image_crop_check_position: !1,
    image_crop_check_size: !1,
    is_attribute_group_tmp: !0,
    is_alt_key: !1,
    is_shift_key: !1,
    is_ctrl_key: !1,
    is_select_text: !1,
    is_ready: !1,
    is_saved: !0,
    is_preview: !1,
    is_double_click: !1,
    id_element_end_up_down: null,
    is_element_not_move_out: !1,
    is_adaptive_design: !1,
    pixel_element_first_child_click: 2,
    pixel_element_snap_desktop: 5,
    pixel_element_snap_mobile: 3,
    list_option_value_new: {},
    list_tracking_global: null,
    list_domain_free: null,
    list_new_parent_tmp: {},
    list_run_multiple_background: {},
    list_element_up_down: [],
    list_element_in_screen: [],
    list_element_in_screen_no_fixed: [],
    list_section_in_screen: [],
    list_group_your_section: null,
    list_group_your_assets: null,
    list_group_your_popup: null,
    list_group_your_dropbox: null,
    list_group_template_section: null,
    list_group_template_popup: null,
    list_group_template_dropbox: null,
    list_group_template_banner: null,
    list_template_section_item_load_finish: {},
    list_template_popup_item_load_finish: {},
    list_template_assets_item_load_finish: {},
    list_template_dropbox_item_load_finish: {},
    list_template_banner_item_load_finish: {},
    list_template_section_item_page: {},
    list_template_popup_item_page: {},
    list_template_assets_item_page: {},
    list_template_dropbox_item_page: {},
    list_template_banner_item_page: {},
    list_element_in_screen_snap: [],
    list_section_in_screen_snap: [],
    list_element_ctrl: [],
    list_element_group_tmp: [],
    list_group_file: null,
    list_group_document: null,
    list_group_video: null,
    list_group_image: null,
    list_file_page: {},
    list_file_load_finish: {},
    list_file_search_page: {},
    list_file_search_load_finish: {},
    list_shape_api_page: {},
    list_shape_api_load_finish: {},
    list_color_gradient: {},
    list_color_solid: {},
    list_emoji: {},
    list_symbols: {},
    list_emoji_all: [],
    list_edit_history: null,
    tmp: {
      check_mouse_down_builder: false,
    },
    timeout_animation_demo_id: null,
    timenow_mouse_down_click: 0,
    time_double_click: 500,
    time_element_first_child_click: 250,
    timenow_element_click: 0,
    time_element_child_click: 250,
    time_run_background_slowdown: 20,
    scrollbar_size: 4,
    size_image_max_dimension: { width: 3e3, height: 3e3 },
    time_reload_attribute: 300,
    time_reload_sub_tab: {
      design: 10,
      event: 3,
      effect: 3,
      data: 3,
      advance: 3,
    },
    reload_sub_tab_all: !0,
    time_reload_sub_tab_other: 300,
    ui_view_top_menu: 'top-menu',
    ui_view_left_menu: 'left-menu',
    ui_view_right_menu: 'right-menu',
    ui_view_preview_menu: 'preview-menu',
    ui_view_bottom_menu: 'bottom-menu',
    ui_view_attribute_editor: 'attribute-editor',
    ui_view_body_editor: 'body-editor',
    ui_view_one_setting_editor: 'one-setting-editor',
    ui_view_quick_editor: 'quick-editor',
    ui_view_section_editor: 'section-editor',
    ui_view_pen_tool_editor: 'pen-tool-editor',
    is_popup_scroll_height: false,
    backdrop_popup_id: '',
    builder_section_popup_id: '',
    is_builder_banner: false,
    element_editing_id: '',
    currentElementType: 'noon',
  };
  data: IData = {
    title: '',
    description: '',
    keyword: '',
    image: '',
    favicon: '',
    is_lazyload: !0,
    is_mobile_only: !1,
    story_page: {
      // type: this.const.STORY_PAGE.none,
      is_autoplay: !1,
      autoplay_time: 10,
    },
    is_follow: !0,
    tracking_global_id: null,
    tracking_global_delay: null,
    facebook_pixel: '',
    tiktok_pixel: '',
    google_analytics_id: '',
    google_ads_id: '',
    google_tag_manager_id: '',
    before_head: '',
    before_body: '',
    font_default: '"Open Sans", sans-serif',
    adv: null,
    adv_publish: {},
    thankyou_page: {},
    is_view_content: !0,
    tracking_button_click: !0,
    shopping: {},
    device_screen: DEVICE.DESKTOP,
    width: {},
    is_snap: !1,
    is_swap_element: !1,
    is_shortcut_all_element: !1,
    snap_grid: { isEnable: !1, range: 10 },
    elements: {
      SECTION37: {
        id: 'SECTION37',
        name: 'SECTION37',
        type: 'section',
        attr: {},
        custom_class: [],
        option: {
          conversion_name: '',
          google_ads_conversion: '',
          google_ads_label: '',
          event_custom_script: '',
          section_setting: {
            is_tabs: false,
            is_selected: true,
          },
          tooltip_section_sticky: true,
          section_type: 'DEFAULT',
          background_video: {
            video_type: 'youtube',
          },
          icon_setting: {
            type: 'default',
            value_arrow: '',
            value_close: '',
            color: '#000',
          },
          is_generate_empty: false,
          is_sync: true,
          is_sort: false,
          droppable: true,
          removable: true,
          duplicate: true,
          selectable: true,
        },
        desktop: {
          option: {
            index: 37,
            sticky: false,
            sticky_position: 'top',
            sticky_position_top: '0px',
            sticky_position_bottom: '0px',
            sticky_bar_position: 'top',
            sticky_bar_position_top: '0px',
            sticky_bar_position_bottom: '0px',
            readmore_range: '0px',
            auto_scroll: false,
            'background-style': 'solid',
            overlay: {
              'background-class': ['ladi-background-auto'],
              'background-position': 'center top',
              'background-repeat': 'repeat',
            },
            hidden: false,
          },
          class: ['ladi-background-auto'],
          style: {
            height: '200px',
            'background-position': 'center top',
            'background-repeat': 'repeat',
          },
          custom_style: {},
        },
        mobile: {
          option: {
            index: 37,
            sticky: false,
            sticky_position: 'top',
            sticky_position_top: '0px',
            sticky_position_bottom: '0px',
            sticky_bar_position: 'top',
            sticky_bar_position_top: '0px',
            sticky_bar_position_bottom: '0px',
            readmore_range: '0px',
            auto_scroll: false,
            'background-style': 'solid',
            overlay: {
              'background-class': ['ladi-background-auto'],
              'background-position': 'center top',
              'background-repeat': 'repeat',
            },
            hidden: false,
          },
          class: ['ladi-background-auto'],
          style: {
            height: '150px',
            'background-position': 'center top',
            'background-repeat': 'repeat',
          },
          custom_style: {},
        },
        childs: [],
      },
      HEADLINE38: {
        id: 'HEADLINE38',
        name: 'HEADLINE38',
        type: ELEMENT_ITEM.HEADLINE,
        attr: {},
        custom_class: [],
        option: {
          data_event: [],
          action_funnel: false,
          innerHTML: 'dkm nha o<br>',
          tag_name: 'h3',
          conversion_name: '',
          google_ads_conversion: '',
          google_ads_label: '',
          event_custom_script: '',
          parent: 'SECTION37',
          data_tooltip: {
            type: 'default',
            position: 'top_middle',
            size: 'medium',
          },
          data_setting: {
            type_dataset: 'COLLECTION',
            sort_name: 'created_at',
            sort_by: 'desc',
          },
          is_sync: true,
          is_sort: false,
          locked: false,
          multiple_parent: true,
          draggable: true,
          editable: true,
          removable: true,
          duplicate: true,
          selectable: true,
          real_size_element: true,
          text_background_image: true,
          not_move_out: false,
          equals_parent_id: false,
        },
        desktop: {
          option: {
            index: 38,
            sticky: false,
            sticky_position: 'default',
            sticky_position_top: '0px',
            sticky_position_left: '0px',
            sticky_position_bottom: '0px',
            sticky_position_right: '0px',
            hover: {
              transform: {},
              ontop: false,
            },
            input_padding_left_right: '0px',
            hidden: false,
          },
          class: [],
          style: {
            width: '200px',
            height: '29px',
            top: '119px',
            left: '341px',
            color: 'rgba(0, 0, 0, 1)',
            'font-size': '18px',
            'font-weight': 'bold',
            'text-align': 'left',
            'line-height': '1.6',
          },
          custom_style: {},
        },
        mobile: {
          option: {
            index: 38,
            sticky: false,
            sticky_position: 'default',
            sticky_position_top: '0px',
            sticky_position_left: '0px',
            sticky_position_bottom: '0px',
            sticky_position_right: '0px',
            hover: {
              transform: {},
              ontop: false,
            },
            input_padding_left_right: '0px',
            hidden: false,
          },
          class: [],
          style: {
            width: '200px',
            height: '29px',
            top: '0px',
            left: '0px',
            color: 'rgba(0, 0, 0, 1)',
            'font-size': '18px',
            'font-weight': 'bold',
            'text-align': 'left',
            'line-height': '1.6',
          },
          custom_style: {},
        },
      },
    },
    tmp: {},
    // version: this.const.VERSION,
    index_element: 0,
    index_element_option: 0,
  };
  constructor(
    private LadiPageScript: LadiPageScriptService,
    private LadiPagePlugin: LadipagePluginService,
    private eventBus: NgEventBus
  ) {
    this.runtime.position_element[DEVICE.DESKTOP] = {};
  }

  // #start function complete
  getSelectedRange = () => {
    const section = window.getSelection();
    if (section && section.rangeCount) {
      return section.getRangeAt(0);
    }

    return null;
  };

  getSelectedText = () => {
    let e = '';
    const section = window.getSelection();
    if (section && section.rangeCount) {
      return (e = section.toString());
    }
    return e;
  };

  getBuilderEditorScrollY = () => {
    return (
      document.getElementById(this.runtime.builder_editor_id)?.scrollTop || 0
    );
  };

  getBuilderEditorWidth = () => {
    return (
      document.getElementById(this.runtime.builder_editor_id)?.clientWidth || 0
    );
  };

  getBuilderEditorHeight = () => {
    return (
      document.getElementById(this.runtime.builder_editor_id)?.clientHeight || 0
    );
  };

  isDesktop = () => {
    return this.data.device_screen === DEVICE.DESKTOP;
  };

  getElement = (id: string, isCopy: boolean) => {
    const element = this.data.elements[id];
    return isCopy ? (isEmpty(element) ? null : copy(element)) : element;
  };

  eventRemoveSelected = () => {
    if (!isEmpty(this.runtime.current_element_id)) {
      const currentElement = document.getElementById(
        this.runtime.current_element_id
      );
      if (!isEmpty(currentElement)) {
        const selectedEle =
            currentElement?.getElementsByClassName('ladi-selected')[0],
          rotateEle = currentElement?.getElementsByClassName('ladi-rotate')[0],
          resizeEle = currentElement?.getElementsByClassName('ladi-resize');
        for (
          isEmpty(selectedEle) ||
            selectedEle?.parentElement?.removeChild(selectedEle),
            isEmpty(rotateEle) ||
              rotateEle?.parentElement?.removeChild(rotateEle),
            document
              .getElementById(this.runtime.builder_rotate_doc_id)
              ?.classList.add('ladi-hidden');
          resizeEle?.length || 0 > 0;

        ) {
          (
            resizeEle as HTMLCollectionOf<HTMLElement>
          )[0]?.parentElement?.removeChild(
            (resizeEle as HTMLCollectionOf<HTMLElement>)[0]
          );
        }
      }
    }
    const element = this.getElement(this.runtime.current_element_id, !1);
    if (!isEmpty(element) && !isEmpty(element.option.parent)) {
      const parentElement = document.getElementById(element.option.parent);
      if (!isEmpty(parentElement)) {
        const parentElected = parentElement?.getElementsByClassName(
          'ladi-parent-selected'
        )[0];
        isEmpty(parentElected) ||
          parentElected?.parentElement?.removeChild(parentElected);
        const parentLabel = parentElement?.getElementsByClassName(
          'ladi-parent-selected-label'
        )[0];
        isEmpty(parentLabel) ||
          parentLabel?.parentElement?.removeChild(parentLabel);
      }
    }
  };

  addBorderItemGroupTmp = () => {
    let e = this.runtime.list_element_group_tmp.join(':after, #');
    isEmpty(e) ||
      ((e = '#' + e + ':after {'),
      (e += "content: '';"),
      (e += 'border: 2px var(--main-primary) dashed;'),
      (e += 'position: absolute;'),
      (e += 'width: calc(100% - 4px);'),
      (e += 'height: calc(100% - 4px);'),
      (e += 'top: 0;'),
      (e += 'left: 0;'),
      (e += 'z-index: 90000080;'),
      (e += 'pointer-events: none;'),
      (e += '}')),
      this.LadiPageScript.createStyleElement(
        'style_border_element_group_tmp',
        e
      );
  };

  removePositionCacheElement = (elementId?: string) => {
    if (this.LadiPageScript.isEmpty(elementId)) {
      this.runtime.position_element[DEVICE.DESKTOP] = {};
      this.runtime.position_element[DEVICE.MOBILE] = {};
    }
    delete (this.runtime.position_element[DEVICE.DESKTOP] as any)[
      elementId as string
    ],
      delete (this.runtime.position_element[DEVICE.MOBILE] as any)[
        elementId as string
      ];
  };

  eventMouseDown = (event: MouseEvent) => {
    ((this.runtime.is_shift_key && !event.shiftKey) ||
      (this.runtime.is_ctrl_key && !event.ctrlKey) ||
      (this.runtime.is_meta_key && !event.metaKey)) &&
      this.eventKeyUp(event),
      this.eventMouseDownMenu(event);
  };
  // #end function complete

  // start function complete no type
  eventMouseDownMenu = (e: any) => {
    if (3 != (e = this.LadiPageScript.getEventCursorData(e)).which) {
      if (e.target.classList.contains('builder-attribute-move')) {
        e.stopPropagation();
        var i = this.LadiPageScript.findAncestor(e.target, 'parent-attr-move');
        this.LadiPageScript.isEmpty(i) && (i = e.target.parentElement);
        var n = this.LadiPageScript.getElementBoundingClientRect(i);
        i.setAttribute('data-top', n.y),
          i.setAttribute('data-left', n.x),
          (this.runtime.mouse_hold_position_x = e.pageX),
          (this.runtime.mouse_hold_position_y = e.pageY),
          (this.runtime.builder_menu_move_element = i),
          (this.runtime.builder_is_menu_move = !0),
          document.body.style.setProperty('cursor', 'move');
      }
    }
  };

  snapHiddenLine = () => {
    if (!this.data.snap_grid.isEnable) {
      const snapTopEle = document.getElementById(
          this.runtime.builder_snap_top_id
        ) as HTMLElement,
        snapLeftEle = document.getElementById(
          this.runtime.builder_snap_left_id
        ) as HTMLElement,
        napBottomEle = document.getElementById(
          this.runtime.builder_snap_bottom_id
        ) as HTMLElement,
        snapRightEle = document.getElementById(
          this.runtime.builder_snap_right_id
        ) as HTMLElement;
      snapTopEle?.style.removeProperty('top'),
        snapTopEle?.style.removeProperty('left'),
        snapTopEle?.style.removeProperty('width'),
        snapLeftEle?.style.removeProperty('top'),
        snapLeftEle?.style.removeProperty('left'),
        snapLeftEle?.style.removeProperty('height'),
        snapRightEle?.style.removeProperty('top'),
        snapRightEle?.style.removeProperty('left'),
        snapRightEle?.style.removeProperty('width'),
        snapRightEle?.style.removeProperty('display'),
        (((snapRightEle.firstChild as HTMLElement).innerText as string | null) =
          null),
        napBottomEle?.style.removeProperty('top'),
        napBottomEle?.style.removeProperty('left'),
        napBottomEle?.style.removeProperty('height'),
        napBottomEle?.style.removeProperty('display'),
        (((napBottomEle.firstChild as HTMLElement).innerText as string | null) =
          null),
        snapTopEle?.classList.add('ladi-hidden'),
        snapLeftEle?.classList.add('ladi-hidden'),
        napBottomEle?.classList.add('ladi-hidden'),
        snapRightEle?.classList.add('ladi-hidden');
    }
  };
  // end function complete no type
  eventMouseUp = (e: MouseEvent) => {
    // return;
    console.log('eventMouseUp', e);

    if (
      !this.mouseUpSwapElement(e) &&
      ((this.runtime.tmp.check_mouse_up_hold =
        this.runtime.timenow_element_click +
          this.runtime.time_element_child_click >
        Date.now()),
      !this.eventMouseUpMenu(e) && !this.eventMouseUpInputNumber(e))
    ) {
      this.eventSelectedText(e),
        document.body.style.removeProperty('cursor'),
        this.snapHiddenLine();
      // var i = () => {
      //   this.endRollbackElement(!0);
      // };
      // if ((this.startRollbackElement(), this.eventMouseUpResize(e))) i();
      // else if (this.eventMouseUpImageBackground(e)) i();
      // else if (this.eventMouseUpQuickEditor(e)) i();
      // else
      if (!this.runtime.is_ctrl_key && !this.runtime.is_meta_key) {
        var n = this.getEventElementId(
          e,
          e.target,
          this.runtime.element_select_parent
        );

        if (this.runtime.current_event == this.const.ELEMENT_EVENT.hold) {
          var a = this.runtime.current_element_id;
          if (
            (!this.LadiPageScript.isEmpty(this.runtime.current_element_type) &&
              this.LadiPageScript.isFunction(
                this.LadiPagePlugin.getPlugin(this.runtime.current_element_type)
                  .getParentIdGetCurrentElementId
              ) &&
              (a = this.LadiPagePlugin.getPlugin(
                this.runtime.current_element_type
              ).getParentIdGetCurrentElementId(a)),
            !this.runtime.builder_is_hold &&
              !this.runtime.builder_is_hold_group_tmp &&
              !this.LadiPageScript.isEmpty(a))
          ) {
            var o = this.getElement(n, !1);
            (this.LadiPageScript.isEmpty(o) || o.option.parent != a) && (n = a);
          }
          var r = () => {
            this.eventMouseUpHold(e, n),
              1 == this.runtime.count_mouse_down_click &&
                (this.runtime.timenow_mouse_down_click = Date.now());
            // i();
          };
          this.runtime.tmp.is_attribute_input_focus
            ? (this.runtime.tmp.function_run_end_mouse_up_hold = () => {
                r(), delete this.runtime.tmp.function_run_end_mouse_up_hold;
              })
            : r();
        }
      }
    }
  };

  eventMouseDownBuilderEditor = (event: MouseEvent) => {
    console.log('eventMouseDownBuilderEditor', event);

    if ((event.stopPropagation(), 3 != event.which)) {
      if (
        !(
          this.mouseDownSwapElement(event) ||
          this.eventMouseDownParent(event) ||
          (((this.runtime.is_shift_key && !event.shiftKey) ||
            (this.runtime.is_ctrl_key && !event.ctrlKey) ||
            (this.runtime.is_meta_key && !event.metaKey)) &&
            this.eventKeyUp(event),
          (this.runtime.tmp.check_mouse_down_builder =
            this.runtime.timenow_mouse_down_click +
              this.runtime.time_double_click >
            Date.now()),
          this.eventMouseDownResize(event) ||
            this.eventMouseDownImageBackground(event))
        )
      ) {
        // window.$rootScope.$broadcast('menu-item-deactive', {});
        var eventElementId = this.getEventElementId(
          event,
          event.target,
          this.runtime.element_select_parent
        );

        this.runtime.is_ctrl_key || this.runtime.is_meta_key
          ? this.eventAddElementCtrl(eventElementId)
          : this.runtime.current_event == this.const.ELEMENT_EVENT.selected &&
            this.eventMouseDownSelected(event, eventElementId);
      }
    }
  };

  addEventElement = () => {
    const builderEditor = document.getElementById(
      this.runtime.builder_editor_id
    ) as HTMLElement;
    document.addEventListener('mouseup', this.eventMouseUp);
    document.addEventListener('mousedown', this.eventMouseDown);
    builderEditor.addEventListener(
      'mousedown',
      this.eventMouseDownBuilderEditor
    );
  };

  removeEventElement = () => {
    const builderEditor = document.getElementById(
      this.runtime.builder_editor_id
    ) as HTMLElement;
    document.removeEventListener('mouseup', this.eventMouseUp);
    document.removeEventListener('mousedown', this.eventMouseDown);
    builderEditor.removeEventListener(
      'mousedown',
      this.eventMouseDownBuilderEditor
    );
  };

  getEventElementId = (e: any, t: any, i: any, n?: any) => {
    // console.log('getEventElementId', e, t, i, n);

    if (this.LadiPageScript.isEmpty(e.target)) return null;
    if (e.target.classList.contains('ladi-parent-selected-label'))
      return e.target.textContent.trim();
    var o = (e: string): string => {
        var t = this.runtime.current_element_id;
        if (
          (!this.LadiPageScript.isEmpty(this.runtime.current_element_type) &&
            this.LadiPageScript.isFunction(
              this.LadiPagePlugin.getPlugin(this.runtime.current_element_type)
                .getParentIdGetCurrentElementId
            ) &&
            (t = this.LadiPagePlugin.getPlugin(
              this.runtime.current_element_type
            ).getParentIdGetCurrentElementId(t)),
          e != t)
        ) {
          var i = this.getElement(e, !1);
          if (
            !this.LadiPageScript.isEmpty(i) &&
            !this.LadiPageScript.isEmpty(i.option.parent)
          ) {
            var n = this.getElement(t, !1);
            if (
              this.LadiPageScript.isEmpty(n) ||
              i.option.parent != n.option.parent
            ) {
              var r = this.getElement(i.option.parent, !1);
              if (r.id != t)
                if (this.runtime.element_select_parent_first) {
                  if (
                    r.type !=
                    this.LadiPagePlugin.getPlugin('section').default_data.type
                  )
                    return o(r.id);
                } else if (
                  r.type !=
                  this.LadiPagePlugin.getPlugin('section').default_data.type
                )
                  return r.id;
            }
          }
        }
        return e;
      },
      r = (e: HTMLElement): string => {
        return this.LadiPageScript.isEmpty(e) ||
          this.LadiPageScript.isEmpty(e.classList)
          ? ''
          : e.classList.contains('ladi-element')
          ? i
            ? o(e.id)
            : e.id
          : e.classList.contains('ladi-section')
          ? e.id
          : r(e?.parentElement as HTMLElement);
      },
      s = (e: string): string => {
        if (!this.LadiPageScript.isEmpty(e)) {
          // console.log(this.runtime.tmp?.except_in_screen?.indexOf(e) !== -1);

          if (
            this.runtime.tmp?.except_in_screen?.length &&
            this.runtime.tmp.except_in_screen.indexOf(e) !== -1
          )
            return '';
          var t = this.getElement(e, !1);
          console.log('in function t', t);
          if (this.LadiPageScript.isEmpty(t)) return e;
          if (!t.option.selectable) return s(t.option.parent);
          var i = this.getParentIdByType(e, 'carousel', !0) as string;
          console.log('in function i', i);
          if (
            !this.LadiPageScript.isEmpty(i) &&
            this.LadiPageScript.isEmpty(this.runtime.builder_carousel_crop[i])
          )
            return i;
        }
        return e;
      },
      l = (e: string): null | string => {
        const t = this.getElement(e, !1);
        return this.LadiPageScript.isEmpty(t)
          ? null
          : t.option.locked
          ? e
          : l(t.option.parent);
      },
      c = (e: string): string => {
        var t = l(e);
        return this.LadiPageScript.isEmpty(t) ? e : (t as string);
      },
      d = (e: string) => {
        var t = null;
        return (n ||
          -1 == ['button'].indexOf(this.runtime.current_element_type) ||
          ((t = this.getElement(e, !1)),
          this.LadiPageScript.isEmpty(t) ||
            t.option.parent_type != this.runtime.current_element_type)) &&
          (n ||
            -1 ==
              ['headline', 'shape'].indexOf(
                this.runtime.current_element_type
              ) ||
            ((t = this.getElement(e, !1)),
            this.LadiPageScript.isEmpty(t) ||
              'button' != t.option.parent_type)) &&
          (-1 == ['tabs'].indexOf(this.runtime.current_element_type) ||
            ((t = this.getElement(e, !1)),
            this.LadiPageScript.isEmpty(t) ||
              t.option.parent_type != this.runtime.current_element_type))
          ? e
          : this.runtime.current_element_id;
      },
      p = r(t);
    console.log(p);

    return this.LadiPageScript.isEmpty(this.runtime.current_popup_id)
      ? (console.log(s(p)),
        (p = c((p = s(p as string) as string))),
        !this.isDesktop() &&
          this.LadiPageScript.isEmpty(p) &&
          t.id == this.runtime.builder_container_id &&
          (p = this.getSectionIdByTop(e.y)),
        (p = d(p as string)))
      : this.getParentIdByType(p as string, 'section', !0) ==
        this.runtime.builder_section_popup_id
      ? d((p = c((p = s(p as string) as string))))
      : this.LadiPageScript.isEmpty(p) && t.id != this.runtime.backdrop_popup_id
      ? null
      : this.runtime.current_popup_id;
  };

  eventMouseDownSelected = (e: MouseEvent, t: string) => {
    console.log('eventMouseDownSelected', e, t);

    e = this.LadiPageScript.getEventCursorData(e);
    // var i = this;
    // i instanceof LadiPageV2 || (i = LadiPage),
    //   window.$rootScope.$broadcast("clear-reload-attribute", {}),
    //   window.$rootScope.$broadcast("clear-reload-attribute-value-all", {});
    var n = !1,
      a = !1,
      o = null,
      r = document.getElementById(this.runtime.builder_group_tmp_id);
    if (this.LadiPageScript.isEmpty(t))
      (e?.target as any).id == this.runtime.builder_group_tmp_id
        ? ((n = !1), (a = !0))
        : (n = !0);
    else if (((o = this.getElement(t, !1)), !this.LadiPageScript.isEmpty(o))) {
      if (o.option.editable) {
        var s = document.getElementById(t);
        if (!this.LadiPageScript.isEmpty(s)) {
          var l = s?.querySelectorAll(
            '.ladi-headline, .ladi-paragraph, .ladi-list-paragraph ul'
          )[0];
          if (
            !this.LadiPageScript.isEmpty(l) &&
            'true' == (l as any).contentEditable
          )
            return;
        }
      }
      // this.LadiPagePlugin.getPlugin('section').default_data.type
      //this.LadiPagePlugin.getPlugin('banner').default_data.type
      (o.type != 'section' && o.id != this.runtime.current_popup_id) ||
        (n = !0),
        o.type == 'banner' && (n = !0);
    }
    a ||
      (n &&
        ((o = this.getElement(t, !1)),
        (this.LadiPageScript.isEmpty(o) ||
          o.id != this.runtime.current_element_id) &&
          this.eventRemoveOldSelected(null, !0),
        document
          .getElementById(this.runtime.builder_mouse_hold_id)
          ?.classList.remove('ladi-hidden'),
        r?.removeAttribute('data-top'),
        r?.removeAttribute('data-left'),
        r?.style.removeProperty('top'),
        r?.style.removeProperty('left'),
        r?.style.removeProperty('width'),
        r?.style.removeProperty('height'),
        r?.classList.add('ladi-hidden'),
        document.body.classList.remove('group-tmp'),
        document
          .getElementById(this.runtime.builder_quick_editor_id)
          ?.style.setProperty('display', 'none'),
        (this.runtime.list_element_ctrl = []),
        (this.runtime.current_element_id = ''),
        (this.runtime.current_element_type = ''),
        (this.runtime.current_element_parent_type = null),
        (this.runtime.current_element_parent_id = null)));
    (this.runtime.mouse_hold_position_x = e.pageX),
      (this.runtime.mouse_hold_position_y = e.pageY),
      (this.runtime.builder_is_hold = n),
      (this.runtime.builder_is_hold_group_tmp = a);

    var c = !0;
    if (a) c = !1;
    else if (!n) {
      if (this.runtime.current_element_id != this.runtime.current_popup_id)
        if (
          ((o = this.getElement(t, !1)),
          this.LadiPageScript.isEmpty(o) ||
            this.LadiPageScript.isEmpty(o.option.parent))
        )
          c = !1;
        else {
          var d = this.getElement(o.option.parent, !1);
          if (
            !this.LadiPageScript.isEmpty(d) &&
            d.type != this.LadiPagePlugin.getPlugin('section').default_data.type
          ) {
            var p = this.getElement(this.runtime.current_element_id, !1);
            (this.LadiPageScript.isEmpty(p) ||
              p.option.parent != o.option.parent) &&
              (c = !1);
          }
        }
      c ? this.eventMouseUpSelected(e, t, !0) : this.eventRemoveOldHover(null);
    }
    this.runtime.check_click_first_child = c;
    var u: string[] = [];
    this.runtime.builder_is_hold ||
      (this.runtime.builder_is_hold_group_tmp
        ? (u = this.runtime.list_element_group_tmp)
        : this.LadiPageScript.isEmpty(this.runtime.current_element_id) ||
          u.push(this.runtime.current_element_id));
    var g = u.length > 1;
    if (
      (g &&
        (r?.setAttribute(
          'data-top',
          parseFloatLadiPage(r?.style?.getPropertyValue('top')) + ''
        ),
        r?.setAttribute(
          'data-left',
          parseFloatLadiPage(r?.style?.getPropertyValue('left')) + ''
        )),
      u.forEach((e) => {
        if (((o = this.getElement(e, !1)), !g)) {
          var t = this.getElement(o.option.parent, !1);
          this.LadiPageScript.isEmpty(t) ||
            (o.option.equals_parent_id &&
              ('button' == o.option.parent_type ||
                'video' == o.option.parent_type ||
                o.option.is_accordion_shape) &&
              (this.runtime.is_element_not_move_out = !0));
        }
        var n = document.getElementById(e);
        if (
          !this.LadiPageScript.isEmpty(o) &&
          o.option.draggable &&
          !this.isElementPositionFixed(n) &&
          (!this.LadiPageScript.isFunction(
            this.LadiPagePlugin.getPlugin(o.type).checkDraggable
          ) ||
            this.LadiPagePlugin.getPlugin(o.type, !0, o, !1).checkDraggable())
        ) {
          var a = null,
            r = e;
          do {
            if (
              ((a = !1),
              (r = this.getParentIdByType(r, 'image', !0) as string),
              !this.LadiPageScript.isEmpty(r))
            ) {
              var s = document.getElementById(r);
              this.LadiPageScript.isEmpty(s) ||
                s?.classList.add('ladi-image-move'),
                (a = !0);
            }
          } while (a);
        }
      }),
      this.snapListSnapScreen(),
      this.runtime.count_mouse_down_click++,
      1 == this.runtime.count_mouse_down_click &&
        ((this.runtime.timenow_mouse_down_click = Date.now()),
        (this.runtime.is_double_click = !1)),
      2 == this.runtime.count_mouse_down_click)
    )
      if (this.runtime.tmp.check_mouse_down_builder) {
        var h = !0;
        h &&
          this.runtime.builder_position_click_x > e.pageX &&
          this.runtime.builder_position_click_x - e.pageX >
            this.runtime.builder_position_click_double_click_max &&
          (h = !1),
          h &&
            e.pageX > this.runtime.builder_position_click_x &&
            e.pageX - this.runtime.builder_position_click_x >
              this.runtime.builder_position_click_double_click_max &&
            (h = !1),
          h &&
            this.runtime.builder_position_click_y > e.pageY &&
            this.runtime.builder_position_click_y - e.pageY >
              this.runtime.builder_position_click_double_click_max &&
            (h = !1),
          h &&
            e.pageY > this.runtime.builder_position_click_y &&
            e.pageY - this.runtime.builder_position_click_y >
              this.runtime.builder_position_click_double_click_max &&
            (h = !1),
          h
            ? ((this.runtime.count_mouse_down_click = 0),
              (this.runtime.is_double_click = !0))
            : ((this.runtime.count_mouse_down_click = 1),
              (this.runtime.timenow_mouse_down_click = Date.now()),
              (this.runtime.is_double_click = !1));
      } else
        (this.runtime.count_mouse_down_click = 1),
          (this.runtime.timenow_mouse_down_click = Date.now()),
          (this.runtime.is_double_click = !1);
    (this.runtime.timenow_element_click = Date.now()),
      (this.runtime.builder_position_click_x = e.pageX),
      (this.runtime.builder_position_click_y = e.pageY),
      (this.runtime.current_event = this.const.ELEMENT_EVENT.hold);
  };

  getParentIdGetCurrentElementId(id: string) {
    return '';
  }

  mouseUpSwapElement = (event: MouseEvent): boolean => {
    if (!isEmpty(this.runtime.tmp.swap_element_id)) {
      var t = document.getElementById('style_swap_tmp');
      return (
        isEmpty(t) || t?.parentElement?.removeChild(t),
        // this.swapElement(event, !1),
        delete this.runtime.tmp.swap_element_id,
        delete this.runtime.tmp.swap_element_target_id,
        delete this.runtime.tmp.swap_element_list_position,
        !0
      );
    }
    return false;
  };

  eventMouseDownParent = (event: MouseEvent): boolean => {
    const eve = this.getEventCursorData(event);
    if (
      (eve?.target as HTMLElement)?.classList?.contains(
        'ladi-parent-selected-label'
      )
    )
      return (
        this.selectElement(
          (eve?.target as HTMLElement)?.textContent?.trim() as string
        ),
        !0
      );

    return false;
  };

  // fake data
  getEventCursorData = (event: MouseEvent) => {
    return event;
  };
  selectElement = (e: string) => {
    return false;
  };
  mouseDownSwapElement = (event: MouseEvent): boolean | undefined => {
    return false;
  };
  eventMouseDownResize = (event: MouseEvent): boolean | undefined => {
    // console.log('eventMouseDownResize', event);

    return false;
  };

  eventMouseDownImageBackground = (event: MouseEvent): boolean | undefined => {
    // console.log('eventMouseDownImageBackground');

    return false;
  };

  eventKeyUp = (event: MouseEvent): boolean | undefined => {
    // console.log('eventKeyUp', event);

    const isKey = this.runtime.is_ctrl_key || this.runtime.is_meta_key;
    if (
      (this.runtime.is_shift_key && (this.runtime.is_shift_key = !1),
      this.runtime.is_alt_key && (this.runtime.is_alt_key = !1),
      this.runtime.is_ctrl_key && (this.runtime.is_ctrl_key = !1),
      this.runtime.is_meta_key && (this.runtime.is_meta_key = !1),
      this.removeStyleElementCtrl(),
      isKey)
    ) {
      if (this.runtime.list_element_ctrl.length > 1) {
        this.eventRemoveSelected(),
          (this.runtime.list_element_group_tmp =
            this.runtime.list_element_ctrl),
          this.addBorderItemGroupTmp();
        var groupTmpElement = document.getElementById(
          this.runtime.builder_group_tmp_id
        );
        groupTmpElement?.classList.remove('ladi-hidden'),
          document.body.classList.add('group-tmp');
        var a = this.getDimensionByList(
          this.runtime.list_element_ctrl,
          null,
          !1
        );
        groupTmpElement?.style?.setProperty('top', a.top + 'px'),
          groupTmpElement?.style?.setProperty('left', a.left + 'px'),
          groupTmpElement?.style?.setProperty('width', a.width + 'px'),
          groupTmpElement?.style?.setProperty('height', a.height + 'px');
        // window.$rootScope.$broadcast('unselect-section'),
        // window.$rootScope.$broadcast('select-element', {
        //   list_element_group_tmp: t.runtime.list_element_ctrl,
        //   is_mouse_up: !0,
        //   event: e,
        // });
      } else {
        1 == this.runtime.list_element_ctrl.length &&
          this.eventMouseUpSelected(
            event,
            this.runtime.list_element_ctrl[0],
            !1
          );
      }
    }
    return false;
  };

  removeStyleElementCtrl = () => {
    const ele = document.getElementById('style_ctrl_element');
    isEmpty(ele) ||
      (ele?.parentElement?.removeChild(ele),
      isEmpty(this.runtime.current_element_id) ||
        this.setPositionQuickEditor(
          this.runtime.current_element_id,
          !0,
          null,
          null,
          !1
        ));
  };

  getDimensionByList = (e: any, t: any, i: any) => {
    t = isEmpty(t) ? this.data.device_screen : t;
    var n = 0,
      a = 0,
      o = 0,
      r = 0,
      s = !isEmpty(this.runtime.current_popup_id),
      l = 0,
      c = 0;
    if (s) {
      var d = document.getElementById(this.runtime.current_popup_id),
        p = this.LadiPageScript.getElementBoundingClientRect(d as HTMLElement),
        u = this.getBuilderEditorScrollY();
      (l += p.y - this.runtime.builder_menu_top + u),
        (c += p.x - this.runtime.builder_menu_left);
    }
    var g = !0;
    return (
      e.forEach((e: string) => {
        var l = this.getElement(e, !1);
        if (!isEmpty(l)) {
          var c = l[t],
            d = s ? 0 : this.getPaddingDevice(e),
            p = this.getTopElement(e, t, i),
            u = this.getLeftElement(e, t, i) + d,
            m = parseFloatLadi(c.style.width),
            v = parseFloatLadi(c.style.height);
          g
            ? ((g = !1), (n = p), (a = u), (o = p + v), (r = u + m))
            : (n > p && (n = p),
              a > u && (a = u),
              o < p + v && (o = p + v),
              r < u + m && (r = u + m));
        }
      }),
      { top: n + l, left: a + c, width: r - a, height: o - n }
    );
  };

  eventAddElementCtrl = (e: string) => {
    var t = this.getElement(e, !1);
    if (
      !isEmpty(t) &&
      t.type != this.LadiPagePlugin.getPlugin('section').default_data.type
    ) {
      if (this.runtime.list_element_ctrl.length > 0) {
        var i = this.getElement(this.runtime.list_element_ctrl[0], !1);
        if (i.option.parent != t.option.parent)
          this.runtime.list_element_ctrl = [];
        else {
          var n = document.getElementById(i.id);
          this.isElementPositionFixed(n, !0) &&
            isEmpty(this.getParentIdByType(i.id, 'popup', !0)) &&
            (this.runtime.list_element_ctrl = []);
        }
      }
      var a = this.runtime.list_element_ctrl.indexOf(e);
      if (-1 == a) {
        var o = this.getListNoSelected([e]);
        this.runtime.list_element_ctrl =
          this.runtime.list_element_ctrl.concat(o);
      } else this.runtime.list_element_ctrl.splice(a, 1);
      this.addStyleElementCtrl(!1);
    }
  };

  eventMouseUpSelected = (e: MouseEvent, t: string, i: boolean) => {
    // return;
    if (
      (this.removeBorderItemGroupTmp(),
      isEmpty(e) ||
        isEmpty(e.target) ||
        !(e.target as HTMLElement).classList.contains('ladi-has-click'))
    ) {
      var a = document.getElementById(
        this.runtime.builder_group_tmp_id
      ) as HTMLElement;
      if (
        (a?.removeAttribute('data-top'),
        a?.removeAttribute('data-left'),
        a?.style.removeProperty('top'),
        a?.style.removeProperty('left'),
        a?.style.removeProperty('width'),
        a?.style.removeProperty('height'),
        a?.classList.add('ladi-hidden'),
        document.body.classList.remove('group-tmp'),
        (this.runtime.list_element_group_tmp = []),
        !isEmpty(t))
      ) {
        console.log('eventMouseUpSelected');
        var o = this.getElement(t, !1),
          r = document.getElementById(t) as HTMLElement;
        this.eventRemoveOldSelected(t, !1);
        var s = null;
        if (!isEmpty(r)) {
          var l = r?.getElementsByClassName('ladi-selected')[0],
            c = r?.getElementsByClassName('ladi-hover')[0],
            d = r?.getElementsByClassName('ladi-resize'),
            p = this.LadiPagePlugin.getPlugin(o.type, !0, o, !1)?.data || {},
            u = !1;
          // -1 !=
          // Object.keys(
          //   p[[this.data.device_screen as any] as any]?.style,
          // )?.indexOf('transform');
          if (
            (o.type ==
              this.LadiPagePlugin.getPlugin('shape')?.default_data?.type &&
              o.option.is_pen_tool &&
              (u = !1),
            u)
          ) {
            var g = r?.getElementsByClassName('ladi-rotate')[0] as HTMLElement;
            this.LadiPageScript.isEmpty(g) &&
              ((g = document.createElement('div')), r?.appendChild(g)),
              (g.innerHTML =
                '<i class="ladi-rotate-icon builder-icon transform_rotate background-black"></i>'),
              (g.className = 'ladi-rotate'),
              document
                .getElementById(this.runtime.builder_rotate_doc_id)
                ?.classList.remove('ladi-hidden'),
              this.setDocRotatePosition(r?.id, g);
          }
          if (
            (this.LadiPageScript.isEmpty(l) &&
              ((l = document.createElement('div')), r?.appendChild(l)),
            this.LadiPageScript.isEmpty(c) || c?.parentElement?.removeChild(c),
            0 == d?.length)
          ) {
            var h = [
              'ladi-n-resize',
              'ladi-s-resize',
              'ladi-w-resize',
              'ladi-e-resize',
              'ladi-ne-resize',
              'ladi-nw-resize',
              'ladi-se-resize',
              'ladi-sw-resize',
            ];
            //   m = this.LadiPagePlugin.getPlugin(o.type);
            // m.const.IS_RESIZE_CHILD ||
            //   (h = this.LadiPageScript.isFunction(m.getResizeExcept)
            //     ? h.filter((e) => e !== m.getResizeExcept(0))
            //     : h.filter((e) => e !== m.const.RESIZE_EXCEPT)),
            // h.except(m.const.RESIZE_EXCEPT)),
            // h.except(m.getResizeExcept(o))
            h.forEach((e) => {
              if (
                'ladi-n-resize' == e &&
                o.type == 'section'
                // this.LadiPagePlugin.getPlugin('section')?.default_data?.type
              ) {
                if (
                  this.LadiPageScript.isEmpty(r?.previousElementSibling) ||
                  r?.previousElementSibling?.id ==
                    this.LadiPageScript.runtime.builder_section_background_id
                )
                  return;
                if (
                  this.LadiPageScript.isObject(o.option.section_setting) &&
                  !this.LadiPageScript.isEmpty(o.option.section_setting.tabs_id)
                ) {
                  var i = this.LadiPagePlugin.getPlugin(
                      'section'
                    ).getListSectionByTabsId(o.id),
                    a = this.getElementNoParent(!1);
                  if (-1 != i.indexOf(a[0])) return;
                }
              }
              if (
                r?.id !=
                this.LadiPageScript.runtime.builder_section_background_id
              ) {
                var s = document.createElement('div');
                s.setAttribute(
                  'data-locked',
                  !this.LadiPageScript.isEmpty(o.option.locked) &&
                    o.option.locked
                ),
                  (s.className = 'ladi-resize'),
                  s.classList.add(e),
                  s.classList.add(o.type);
                var l = document.createElement('div');
                l.className = 'ladi-resize-display';
                var c = !0;
                if (
                  o.type == 'section'
                  // this.LadiPagePlugin.getPlugin('section').default_data.type
                ) {
                  var d = document.createElement('div');
                  (d.className = 'ladi-button-add-section ladi-font-default'),
                    // (d.textContent = window.$translate.instant(
                    //   window.$filter('convertKeyTranslate')('new_section'),
                    // )),
                    s.appendChild(d),
                    d.addEventListener('click', function (i) {
                      // window.$rootScope.closeAddNew(),
                      // window.$rootScope.$broadcast('new-section', {
                      //   id: t,
                      //   isAfter: 'ladi-s-resize' == e,
                      // });
                    });
                  var p = document.createElement('i');
                  (p.className =
                    'builder-icon split_vertical background-black icon-cross-vertical ladi-resize-display-icon'),
                    p.style.setProperty('width', '14px'),
                    p.style.setProperty('height', '14px'),
                    l.appendChild(p),
                    s.classList.contains('ladi-n-resize') &&
                      !this.LadiPageScript.isEmpty(r?.previousElementSibling) &&
                      this.LadiPagePlugin.getPlugin('section').checkSectionType(
                        r?.previousElementSibling?.id,
                        this.LadiPageScript.const.SECTION_TYPE.global
                      ) &&
                      (c = !1),
                    s.classList.contains('ladi-s-resize') &&
                      // this.LadiPagePlugin.getPlugin('section').checkSectionType(
                      //   r?.id,
                      //   this.LadiPageScript.const.SECTION_TYPE.global,
                      // ) &&
                      (c = !1);
                }
                c || l.classList.add('ladi-hidden'),
                  s.appendChild(l),
                  r?.appendChild(s);
              }
            });
          }
          if (
            ((s = 'ladi-selected'),
            l?.setAttribute('data-id', o.id),
            l?.setAttribute(
              'data-locked',
              !this.LadiPageScript.isEmpty(o.option.locked) && o.option.locked
            ),
            o.type != 'banner' &&
              // this.LadiPagePlugin.getPlugin('banner').default_data.type
              (s += ' ladi-size'),
            ((l as HTMLElement).className = s))
            // this.LadiPagePlugin.getPlugin('section').checkSectionType(
            //   o.id,
            //   this.LadiPageScript.const.SECTION_TYPE.global,
            // )
          ) {
            var v = l?.getElementsByClassName('builder-element-type-sticky')[0];
            this.LadiPageScript.isEmpty(v) || v?.parentElement?.removeChild(v),
              (v = document.createElement('div')),
              l?.appendChild(v),
              (v.className = 'builder-element-type-sticky'),
              (v.innerHTML =
                '<div>' +
                  this.LadiPagePlugin.getPlugin('section')?.const
                    ?.ELEMENT_TYPE_STICKY ||
                '' +
                  `<i style="width: 12px; height: 12px;" class="builder-icon help background-white ladi-has-click display-inline-block"></i></div>`),
              v;
            // .getElementsByTagName('i')[0]
            // .addEventListener('click', function (e) {
            // e.stopPropagation();
            // var t =
            //   LadiPage.runtime.list_element_document[
            //     window.$rootScope.currentLanguage
            //   ].section_global;
            // window.open(t, '_blank');
            // });
          }
        }
        if (
          !this.LadiPageScript.isEmpty(o) &&
          !this.LadiPageScript.isEmpty(o.option.parent)
        ) {
          var f = this.getElement(o.option.parent, !1);
          if (!this.LadiPageScript.isEmpty(f)) {
            var _ = document.getElementById(f.id);
            if (!this.LadiPageScript.isEmpty(_)) {
              var y = _?.getElementsByClassName('ladi-parent-selected')[0];
              this.LadiPageScript.isEmpty(y) &&
                ((y = document.createElement('div')), _?.appendChild(y as any)),
                (s = 'ladi-parent-selected'),
                y?.setAttribute(
                  'data-locked',
                  !this.LadiPageScript.isEmpty(f.option.locked) &&
                    f.option.locked
                ),
                ((y as HTMLElement).className = s);
              var b = _?.getElementsByClassName(
                'ladi-parent-selected-label'
              )[0] as HTMLElement;
              this.LadiPageScript.isEmpty(b) &&
                ((b = document.createElement('div')), _?.appendChild(b)),
                (s = 'ladi-parent-selected-label'),
                (b.className = s),
                (b.textContent = f.id),
                this.checkChildFix(o.type, f.type, 'headline', 'button') ||
                this.checkChildFix(o.type, f.type, 'shape', 'button')
                  ? b.classList.add('ladi-hidden')
                  : b.classList.remove('ladi-hidden');
            }
          }
        }
        if (
          (i || this.LadiPageScript.isEmpty(o) || o.type != 'section',
          // this.LadiPagePlugin.getPlugin('section').default_data.type,
          // ? (window.$rootScope.$broadcast('unselect-section'),
          //   window.$rootScope.$broadcast('select-element', {
          //     id: t,
          //     event: e,
          //   }))
          // : (window.$rootScope.$broadcast('unselect-element'),
          //   window.$rootScope.$broadcast('select-section', {
          //     id: t,
          //     event: e,
          //   }))
          this.runtime.current_element_id != t &&
            (this.runtime.is_element_not_move_out = !1),
          (this.runtime.current_element_id = t),
          this.LadiPageScript.isEmpty(o))
        )
          (this.runtime.current_element_type = ''),
            (this.runtime.current_element_parent_type = null),
            (this.runtime.current_element_parent_id = null);
        else {
          if (
            ((this.runtime.current_element_type = o.type),
            (this.runtime.current_element_parent_type = o.option.parent_type),
            (this.runtime.current_element_parent_id = o.option.parent),
            o.type == 'section')
            // this.LadiPagePlugin.getPlugin('section').default_data.type
          )
            this.runtime.list_element_ctrl = [];
          else if (
            ((this.runtime.list_element_ctrl = this.getListNoSelected([t])),
            !this.LadiPageScript.isEmpty(r))
          ) {
            var w = '';
            (r.clientWidth < 40 || r.clientHeight < 40) &&
              (w +=
                '#' +
                o.id +
                ' .ladi-resize .ladi-resize-display { cursor: default;}'),
              this.LadiPageScript.createStyleElement(
                'style_ladi_resize_display',
                w
              );
          }
          isFunction(
            this.LadiPagePlugin.getPlugin(o.type).afterSelectElement
          ) && this.LadiPagePlugin.getPlugin(o.type).afterSelectElement(e, o);
        }
      }
    }
  };

  isElementPositionFixed = (e: any, t?: any): boolean => {
    if (t) {
      var i = !1,
        n = !1;
      do {
        try {
          (i = (e = e.parentElement).id != this.runtime.builder_container_id) &&
            (n = this.isElementPositionFixed(e)) &&
            (i = !1);
        } catch (e) {
          break;
        }
      } while (i);
      return n;
    }
    if (!this.LadiPageScript.isEmpty(e)) {
      var a = e.style.getPropertyValue('position');
      return (
        this.LadiPageScript.isEmpty(a) && (a = getComputedStyle(e).position),
        'fixed' == a
      );
    }
    return !1;
  };

  removeBorderItemGroupTmp = () => {
    var e = document.getElementById('style_border_element_group_tmp');
    this.LadiPageScript.isEmpty(e) || e?.parentElement?.removeChild(e);
  };

  setPositionQuickEditor = (e: any, t: any, i: any, n: any, a: any) => {
    this.removePositionCacheElement();
    var o = document.getElementById(
        this.runtime.builder_quick_editor_id
      ) as HTMLElement,
      r = null,
      s = null,
      l = null,
      c = null,
      d = !1,
      p = this.getBuilderEditorScrollY(),
      u = this.getBuilderEditorWidth(),
      g = this.getBuilderEditorHeight();
    if (t) {
      if (a) {
        var h = document.getElementById(this.runtime.builder_group_tmp_id);
        (r = parseFloatLadiPage(h?.style.getPropertyValue('top') || 0)),
          (s = parseFloatLadiPage(h?.style.getPropertyValue('left') || 0)),
          (l = parseFloatLadiPage(h?.style.getPropertyValue('width') || 0)),
          (c = parseFloatLadiPage(h?.style.getPropertyValue('height') || 0)),
          !this.LadiPageScript.isEmpty(this.runtime.current_popup_id) &&
          !this.runtime.is_popup_scroll_height
            ? ((d = !0),
              h?.style.setProperty('position', 'fixed'),
              h?.style.setProperty(
                'margin-top',
                this.runtime.builder_menu_top - p + 'px'
              ),
              h?.style.setProperty(
                'margin-left',
                this.runtime.builder_menu_left + 'px'
              ))
            : (h?.style.removeProperty('position'),
              h?.style.removeProperty('margin-top'),
              h?.style.removeProperty('margin-left'));
      } else {
        var m = this.getElement(e, !1);
        if (this.LadiPageScript.isEmpty(m)) return;
        var v = document.querySelector(
          '#' + this.runtime.builder_editor_id + ' #' + e
        );
        if (this.LadiPageScript.isEmpty(v)) return;
        d =
          this.isElementPositionFixed(v) || this.isElementPositionFixed(v, !0);
        var f = this.LadiPageScript.getElementBoundingClientRect(
          v as HTMLElement
        );
        (r = f.y), (s = f.x), (l = f.width), (c = f.height);
        var _ = this.runtime.builder_carousel_crop[e];
        this.LadiPageScript.isObject(_) &&
          ((l =
            (parseFloatLadiPage(
              m[this.data.device_screen].option.carousel_crop.width_item
            ) || 0) *
            (_.index + 1)),
          (parseFloatLadiPage(
            m[this.data.device_screen].option.carousel_crop.width_item
          ) || 0) * _.index);
      }
      a
        ? ((i = r - (o?.clientHeight || 0) - 5 - p),
          (n = s + l - o.clientWidth))
        : ((i = r - this.runtime.builder_menu_top - o.clientHeight - 5),
          (n = s + l - this.runtime.builder_menu_left - o.clientWidth)),
        i < 37 && (i = i + 5 + c + 5 + o.clientHeight),
        i + o.clientHeight + 5 > g && (i = g - o.clientHeight - 5),
        n < 1 && (n = 1);
      var y = 0;
      n + o.clientWidth + 1 > u && (y = 1),
        d
          ? ((i += this.runtime.builder_menu_top),
            (n += this.runtime.builder_menu_left),
            this.LadiPageScript.isEmpty(y) ||
              (y +=
                this.runtime.scrollbar_size + this.runtime.builder_menu_right))
          : (i += p),
        o.style.setProperty('top', i + 'px'),
        this.LadiPageScript.isEmpty(y)
          ? (o.style.setProperty('left', n + 'px'),
            o.style.removeProperty('right'),
            o.removeAttribute('data-right'),
            o.setAttribute('data-left', n))
          : (o.setAttribute('data-right', y + ''),
            o.removeAttribute('data-left'),
            o.style.setProperty('left', 'auto'),
            o.style.setProperty('right', y + 'px')),
        o.setAttribute('data-top', i);
    } else {
      (r = parseFloatLadiPage(o.getAttribute('data-top') || 0) || 0),
        (s = parseFloatLadiPage(o.getAttribute('data-left') || 0) || 0);
      var b = o.hasAttribute('data-right')
        ? parseFloatLadiPage(o.getAttribute('data-right') || 0) || 0
        : null;
      o.style.setProperty('top', r + i + 'px'),
        this.LadiPageScript.isEmpty(b)
          ? o.style.setProperty('left', s + n + 'px')
          : o.style.setProperty('right', b + 'px');
    }
    d
      ? o.style.setProperty('position', 'fixed')
      : o.style.removeProperty('position');
  };

  getParentIdByType = (e: string, t: string, i: any): null | string => {
    var n = this.getElement(e, !1);
    if (this.LadiPageScript.isEmpty(n)) {
      return null;
    } else {
      if (i || n.type != this.LadiPagePlugin.getPlugin(t).default_data.type) {
        return this.LadiPageScript.isEmpty(n.option.parent)
          ? null
          : this.getParentIdByType(n.option.parent, t, !1);
      } else {
        return e;
      }
    }
    if (i || n.type != this.LadiPagePlugin.getPlugin(t).default_data.type) {
    }
    return this.LadiPageScript.isEmpty(n)
      ? null
      : i || n.type != this.LadiPagePlugin.getPlugin(t).default_data.type
      ? this.LadiPageScript.isEmpty(n.option.parent)
        ? null
        : this.getParentIdByType(n.option.parent, t, !1)
      : e;
  };

  eventMouseUpMenu = (e: MouseEvent): any => {
    // console.log('eventMouseUpMenu', e);

    e.stopPropagation();
    if (
      (document.body.style.removeProperty('cursor'),
      this.runtime.builder_is_menu_move)
    ) {
      if (
        (this.runtime.builder_menu_move_element?.removeAttribute('data-top'),
        this.runtime.builder_menu_move_element?.removeAttribute('data-left'),
        this.runtime.builder_menu_move_element?.classList?.contains(
          'builder-attribute-editor'
        ))
      )
        for (
          var i = document.getElementsByClassName('builder-attribute-editor'),
            n = 0;
          n < i.length;
          n++
        )
          (i[n] as HTMLElement).style.setProperty(
            'top',
            (
              this.runtime.builder_menu_move_element as HTMLElement
            )?.style?.getPropertyValue('top')
          ),
            (i[n] as HTMLElement).style.setProperty(
              'left',
              (
                this.runtime.builder_menu_move_element as HTMLElement
              )?.style?.getPropertyValue('left')
            );
      return (
        (this.runtime.builder_is_menu_move = !1),
        delete this.runtime.tmp.current_scroll_y,
        !0
      );
    }
  };

  eventMouseUpInputNumber = (e: MouseEvent): any => {
    // console.log('eventMouseUpInputNumber', e);

    if (this.runtime.builder_attribute_input_move)
      return (
        e.stopPropagation(),
        this.LadiPageScript.isEmpty(
          this.runtime.builder_attribute_input_move_element
        ) ||
          (this.runtime.builder_attribute_input_move_element?.setAttribute(
            'data-can-change',
            !0 + ''
          ),
          this.LadiPageScript.fireEvent(
            this.runtime.builder_attribute_input_move_element,
            'change'
          ),
          this.runtime.builder_attribute_input_move_element?.removeAttribute(
            'data-can-change'
          )),
        (this.runtime.builder_attribute_input_move = !1),
        (this.runtime.builder_attribute_input_move_element = null),
        (this.runtime.builder_attribute_input_move_value = 0),
        (this.runtime.builder_attribute_input_move_position_x = 0),
        document
          .getElementById(this.runtime.builder_editor_id)
          ?.classList.remove('disabled'),
        console.log('end eventMouseUpInputNumber'),
        !0
      );
  };

  eventSelectedText = (e: MouseEvent) => {
    // console.log('eventSelectedText', e);

    (this.LadiPageScript.isEmpty(e) ||
      (this.LadiPageScript.isEmpty(
        this.LadiPageScript.findAncestor(e.target, 'builder-color-editor')
      ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-link-editor')
        ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-animated-editor')
        ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-attribute-editor')
        ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-quick-editor')
        ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-section-editor')
        ))) &&
      this.LadiPageScript.runTimeout((): void => {
        const textSelected = this.getSelectedText();
        console.log('get Selected Text', textSelected);

        if (this.LadiPageScript.isEmpty(textSelected)) {
          return (
            (this.runtime.current_select_text_range = null),
            void this.eventBus.cast('hide-edit-text-range', {
              event: e,
            })
          );
        }
        this.runtime.current_select_text_range = this.getSelectedRange();
        this.eventBus.cast('show-edit-text-range', {
          event: e,
        });
      }, 1);
  };

  getPaddingDevice = (e: string) => {
    var t = (this.getBuilderEditorWidth() - this.getWidth()) / 2;
    if (((t = t > 0 ? t : 0), !this.LadiPageScript.isEmpty(e))) {
      var i = document.getElementById(e);
      t = this.isElementPositionFixed(i) ? 0 : t;
    }
    return t;
  };

  getWidth = (e?: string) => {
    return (
      (e = this.LadiPageScript.isEmpty(e) ? this.data.device_screen : e),
      (this.data.width as any)[e as string]
    );
  };

  getSectionIdByTop = (e: any) => {
    var t = this.getElementNoParent(!1),
      i = '',
      n = this,
      a = this.getBuilderEditorScrollY();
    return (
      t.forEach((t: string) => {
        var o = n.getTopElement(t),
          r = n.getHeightElement(t);
        o <= a + e && o + r > a + e && (i = t);
      }),
      i
    );
  };

  getElementNoParent = (e: any) => {
    var t = this,
      i: { id: string; element: any }[] = [];
    Object.keys(this.data.elements).forEach((n) => {
      if (
        (e || n != this.LadiPageScript.runtime.builder_section_popup_id) &&
        n != this.LadiPageScript.runtime.builder_section_background_id
      ) {
        var a = t.getElement(n, !1);
        !this.LadiPageScript.isEmpty(a) &&
          this.LadiPageScript.isEmpty(a.option.parent) &&
          i.push({ id: n, element: a });
      }
    }),
      i.sort(function (e, i) {
        return (
          e.element[t.data.device_screen].option.index -
          i.element[t.data.device_screen].option.index
        );
      });
    var n: string[] = [];
    return (
      i.forEach(function (e) {
        n.push(e.id);
      }),
      n
    );
  };

  getTopElement = (e: any, t?: any, i?: any) => {
    if (
      ((t = this.LadiPageScript.isEmpty(t) ? this.data.device_screen : t),
      !i &&
        (this.LadiPageScript.isNull(
          ((this.runtime.position_element as any)[t] as any)[e]
        ) && (((this.runtime.position_element as any)[t] as any)[e] = {}),
        !this.LadiPageScript.isEmpty(
          ((this.runtime.position_element as any)[t] as any)[e].top
        )))
    )
      return ((this.runtime.position_element as any)[t] as any)[e].top;
    var n = this.getElement(e, !1);
    if (this.LadiPageScript.isEmpty(n)) return 0;
    var a = document.getElementById(e),
      o = 0;
    if (
      !this.LadiPageScript.isEmpty(a) &&
      this.LadiPageScript.isEmpty(this.runtime.current_popup_id) &&
      this.isElementPositionFixed(a)
    ) {
      var r = this.LadiPageScript.getElementBoundingClientRect(
        a as HTMLElement
      );
      o = r.y;
    }
    if (this.LadiPageScript.isEmpty(o))
      if (
        ((o = parseFloatLadiPage(n[t].style.top) || 0),
        i &&
          ((a = document.getElementById(e)),
          this.LadiPageScript.isEmpty(a) ||
            (o =
              parseFloatLadiPage(a?.style.getPropertyValue('top') || 0) || 0)),
        this.LadiPageScript.isEmpty(n.option.parent))
      ) {
        var s = this.getElementNoParent(!1),
          l = s.indexOf(e),
          c = this;
        (s = s.splice(0, l)).forEach((e) => {
          var i = c.getElement(e, !1);
          this.LadiPageScript.isEmpty(i) ||
            (o += parseFloatLadiPage(i[t].style.height) || 0);
        });
      } else o += this.getTopElement(n.option.parent, t, !1);
    return (
      i || (((this.runtime.position_element as any)[t] as any)[e].top = o), o
    );
  };

  getHeightElement = (e: any, t?: any, i?: any) => {
    if (
      ((t = this.LadiPageScript.isEmpty(t) ? this.data.device_screen : t), i)
    ) {
      var n = document.getElementById(e);
      if (!this.LadiPageScript.isEmpty(n))
        return (
          parseFloatLadiPage(n?.style.getPropertyValue('height') || 0) || 0
        );
    }
    var a = this.getElement(e, !1);
    return parseFloatLadiPage(a[t].style.height) || 0;
  };

  getListNoSelected = (e: any[], t?: any) => {
    const listNoSelected: string[] = [];
    return (
      e.forEach((e: string) => {
        if (
          this.LadiPageScript.isEmpty(this.runtime.builder_carousel_crop[e]) &&
          this.LadiPageScript.isEmpty(this.runtime.builder_image_crop[e])
        ) {
          var a = document.getElementById(e);
          if (this.LadiPageScript.isEmpty(a) || this.isElementPositionFixed(a))
            listNoSelected.push(e);
          else if (!t) {
            var o = this.getElement(e, !1);
            this.LadiPageScript.isEmpty(o) ||
              o.type !=
                this.LadiPagePlugin.getPlugin('banner').default_data.type ||
              listNoSelected.push(e);
          }
        } else listNoSelected.push(e);
      }),
      (e = e.filter((e) => !listNoSelected.includes(e)))
      // e.except(listNoSelected)
    );
  };

  addStyleElementCtrl = (e: boolean) => {
    if (!(e && this.runtime.list_element_ctrl.length <= 1)) {
      var t = 'body {';
      (t += 'cursor: pointer !important;'),
        (t += '}'),
        (t += '#' + this.runtime.builder_group_tmp_id + ' {'),
        (t += 'display: none;'),
        (t += '}'),
        (t += '#' + this.runtime.builder_quick_editor_id + ' {'),
        (t += 'display: none;'),
        (t += '}'),
        (t += '.builder-container .ladi-rotate, .builder-rotate-doc {'),
        (t += 'display: none;'),
        (t += '}'),
        (t += '.builder-container .ladi-selected {'),
        (t += 'display: none;'),
        (t += '}'),
        (t += '.builder-container .ladi-parent-selected {'),
        (t += 'display: none;'),
        (t += '}'),
        (t += '.builder-container .ladi-parent-selected-label {'),
        (t += 'display: none;'),
        (t += '}'),
        (t += '.builder-container .ladi-hover:not(.ladi-hover-ctrl) {'),
        (t += 'display: none;'),
        (t += '}'),
        (t +=
          '.builder-container .ladi-resize, .builder-group-tmp .ladi-resize {'),
        (t += 'display: none;'),
        (t += '}');
      var i = this.runtime.list_element_group_tmp.join(':after, #');
      this.LadiPageScript.isEmpty(i) ||
        ((i = '#' + i + ':after {'), (i += 'display: none;'), (i += '}')),
        (t += i);
      var n = this.runtime.list_element_ctrl.join(':after, #');
      this.LadiPageScript.isEmpty(n) ||
        ((n = '#' + n + ':after {'),
        (n += 'display: block;'),
        (n += "content: '';"),
        (n += 'border: 2px var(--main-primary) dashed;'),
        (n += 'position: absolute;'),
        (n += 'width: calc(100% - 4px);'),
        (n += 'height: calc(100% - 4px);'),
        (n += 'top: 0;'),
        (n += 'left: 0;'),
        (n += 'z-index: 90000080;'),
        (n += 'pointer-events: none;'),
        (n += '}')),
        (t += n),
        this.LadiPageScript.createStyleElement('style_ctrl_element', t);
    }
  };

  checkChildFix = (e: any, t: any, i: any, n: any): boolean => {
    return this.LadiPageScript.isEmpty(i) || this.LadiPageScript.isEmpty(n)
      ? this.checkChildFix(e, t, 'headline', 'button') ||
          this.checkChildFix(e, t, 'shape', 'button') ||
          this.checkChildFix(e, t, 'shape', 'video')
      : e == i && t == n;
  };

  snapListSnapScreen = () => {
    if (
      ((this.runtime.current_pixel_snap = this.isDesktop()
        ? this.runtime.pixel_element_snap_desktop
        : this.runtime.pixel_element_snap_mobile),
      !this.data.snap_grid.isEnable)
    ) {
      var e: any[] = [];
      this.runtime.builder_is_hold ||
        (this.runtime.builder_is_hold_group_tmp
          ? (e = this.runtime.list_element_group_tmp)
          : this.LadiPageScript.isEmpty(this.runtime.current_element_id) ||
            e.push(this.runtime.current_element_id));
      var t = e.length > 1,
        i = [],
        n: string[] = [],
        a = null,
        o = !this.LadiPageScript.isEmpty(this.runtime.current_popup_id),
        r = !t && e.length > 0,
        s = null;
      o
        ? (r &&
            ((a = this.getElement(e[0], !1)),
            (this.LadiPageScript.isEmpty(a) ||
              a.id == this.runtime.current_popup_id ||
              this.LadiPageScript.isEmpty(a.option.parent) ||
              a.option.parent == this.runtime.current_popup_id) &&
              (r = !1)),
          r
            ? (i = [
                a.option.parent,
                ...this.getChildElement(a.option.parent).filter(
                  (i) => !e.includes(i)
                ),
              ])
            : //  this.getChildElement(a.option.parent).except(e)).insert(
              //   0,
              //   a.option.parent,
              // )
              (i = this.getChildElement(this.runtime.current_popup_id).filter(
                (i) => !e.includes(i)
              )),
          //   this.getChildElement(this.runtime.current_popup_id).except(
          //   e,
          // )
          (i = [this.runtime.current_popup_id, ...i]))
        : // i.insert(0, this.runtime.current_popup_id))
          (r &&
            ((a = this.getElement(e[0], !1)),
            this.LadiPageScript.isEmpty(a) ||
            a.type ==
              this.LadiPagePlugin.getPlugin('section').default_data.type ||
            this.LadiPageScript.isEmpty(a.option.parent)
              ? (r = !1)
              : ((s = this.getElement(a.option.parent, !1)),
                (this.LadiPageScript.isEmpty(s) ||
                  s.type ==
                    this.LadiPagePlugin.getPlugin('section').default_data
                      .type) &&
                  (r = !1))),
          r
            ? (i = [
                a.option.parent,
                ...this.getChildElement(a.option.parent).filter(
                  (i) => !e.includes(i)
                ),
              ])
            : (i = (
                copy(this.runtime.list_element_in_screen) as string[]
              ).filter((i) => e.includes(i))),
          (n = this.runtime.list_section_in_screen));
      var l = this;
      if (
        (this.snapShowLine(),
        (this.runtime.list_element_in_screen_snap = []),
        (this.runtime.list_section_in_screen_snap = []),
        o)
      ) {
        var c = document.getElementById(this.runtime.current_popup_id),
          d = this.LadiPageScript.getElementBoundingClientRect(
            c as HTMLElement
          );
        (this.runtime.builder_snap_rect.top =
          d.y - this.runtime.builder_menu_top),
          (this.runtime.builder_snap_rect.left =
            d.x - this.runtime.builder_menu_left);
      } else
        (this.runtime.builder_snap_rect.top = 0),
          (this.runtime.builder_snap_rect.left = 0);
      i.forEach((e: string) => {
        if (((a = l.getElement(e, !1)), !this.LadiPageScript.isEmpty(a))) {
          var t = o ? 0 : l.getPaddingDevice(e),
            i = l.getTopElement(e, null, !0),
            n = l.getLeftElement(e, null, !0) + t,
            r = parseFloatLadiPage(a[l.data.device_screen].style.width) || 0,
            s = parseFloatLadiPage(a[l.data.device_screen].style.height) || 0,
            c = document.getElementById(e);
          if (l.isElementPositionFixed(c)) {
            if (e != l.runtime.current_popup_id) return;
            (i = parseFloatLadiPage(a[l.data.device_screen].style.top) || 0),
              (n = parseFloatLadiPage(a[l.data.device_screen].style.left) || 0);
          }
          if (
            this.LadiPageScript.isFunction(
              this.LadiPagePlugin.getPlugin(a.type).convertDimensionMove
            )
          ) {
            var d = this.LadiPagePlugin.getPlugin(a.type).convertDimensionMove(
              a,
              {
                width: r,
                height: s,
              }
            );
            (r = d.width), (s = d.height);
          }
          l.runtime.list_element_in_screen_snap.push({
            id: e,
            top: i,
            left: n,
            width: r,
            height: s,
            topheight: i + s,
            leftwidth: n + r,
            topheightcenter: i + s / 2,
            leftwidthcenter: n + r / 2,
            element: a,
          });
        }
      }),
        n.forEach((e) => {
          if (((a = l.getElement(e, !1)), !this.LadiPageScript.isEmpty(a))) {
            var t = l.getTopElement(e, null, !0),
              i = l.getPaddingDevice(e),
              n = l.getWidth(),
              o = parseFloatLadiPage(a[l.data.device_screen].style.height) || 0;
            l.runtime.list_section_in_screen_snap.push({
              id: e,
              top: t,
              left: i,
              width: n,
              height: o,
              topheight: t + o,
              leftwidth: i + n,
              topheightcenter: t + o / 2,
              leftwidthcenter: i + n / 2,
              element: a,
            });
          }
        });
    }
  };

  snapShowLine = () => {
    if (!this.data.snap_grid.isEnable) {
      var e = document.getElementById(this.runtime.builder_snap_top_id),
        t = document.getElementById(this.runtime.builder_snap_left_id),
        i = document.getElementById(this.runtime.builder_snap_bottom_id),
        n = document.getElementById(this.runtime.builder_snap_right_id);
      e?.classList.remove('ladi-hidden'),
        t?.classList.remove('ladi-hidden'),
        i?.classList.remove('ladi-hidden'),
        n?.classList.remove('ladi-hidden');
    }
  };

  getChildElement = (e: any, t?: any, i?: any, n?: any, a?: any, o?: any) => {
    o = this.LadiPageScript.isEmpty(o) ? this.data.device_screen : o;
    // var r = this,
    let s: any[] = [];
    Object.keys(this.data.elements).forEach((i) => {
      var n = this.getElement(i, !1);
      this.LadiPageScript.isEmpty(n) ||
        n.option.parent != e ||
        ((this.LadiPageScript.isEmpty(t) || t == n.type) &&
          s.push({ id: i, element: n }));
    }),
      s.sort((e, t) => {
        return i && !n
          ? this.getTopElement(e.id, o) - this.getTopElement(t.id, o)
          : n && !i
          ? this.getHeightElement(e.id, o) - this.getHeightElement(t.id, o)
          : n && i
          ? this.getTopHeightElement(e.id, o) -
            this.getTopHeightElement(t.id, o)
          : e.element[this.data.device_screen].option.index -
            t.element[this.data.device_screen].option.index;
      });
    var l: any[] = [];
    return (
      s.forEach((e) => {
        if (a) {
          var t = document.getElementById(e.id);
          if (this.isElementPositionFixed(t)) return;
        }
        l.push(e.id);
      }),
      l
    );
  };

  getTopHeightElement = (e: any, t: any, i?: any) => {
    return this.getTopElement(e, t, i) + this.getHeightElement(e, t, i);
  };

  getLeftElement = (e: any, t: any, i: any): any => {
    if (
      ((t = this.LadiPageScript.isEmpty(t) ? this.data.device_screen : t),
      !i &&
        (this.LadiPageScript.isNull(
          ((this.runtime.position_element as any)[t] as any)[e]
        ) && (((this.runtime.position_element as any)[t] as any)[e] = {}),
        !this.LadiPageScript.isEmpty(
          ((this.runtime.position_element as any)[t] as any)[e].left
        )))
    )
      return ((this.runtime.position_element as any)[t] as any)[e].left;
    var n = this.getElement(e, !1);
    if (this.LadiPageScript.isEmpty(n)) return 0;
    var a = document.getElementById(e),
      o = null;
    !this.LadiPageScript.isEmpty(a) &&
      this.LadiPageScript.isEmpty(this.runtime.current_popup_id) &&
      this.isElementPositionFixed(a) &&
      (o = this.LadiPageScript.getElementBoundingClientRect(
        a as HTMLElement
      ).x);
    return (
      this.LadiPageScript.isEmpty(o) &&
        ((o = parseFloatLadiPage(n[t].style.left) || 0),
        i &&
          ((a = document.getElementById(e)),
          this.LadiPageScript.isEmpty(a) ||
            (o =
              parseFloatLadiPage(a?.style.getPropertyValue('left') || 0) || 0)),
        this.LadiPageScript.isEmpty(n.option.parent) ||
          (o += this.getLeftElement(n.option.parent, t, !1))),
      i || (((this.runtime.position_element as any)[t] as any)[e].left = o),
      o
    );
  };

  setDocRotatePosition = (e: any, t: any) => {
    if (!this.LadiPageScript.isEmpty(t)) {
      t.style.setProperty('display', 'block', 'important');
      var i = document.getElementById(this.runtime.builder_rotate_doc_id),
        n = this.LadiPageScript.getElementBoundingClientRect(t),
        a = this.getBuilderEditorScrollY();
      i?.style.setProperty('top', n.y + a + 'px'),
        i?.style.setProperty('left', n.x + 'px'),
        i?.setAttribute('data-id', e),
        t.style.removeProperty('display');
    }
  };

  eventRemoveOldSelected = (e: any, t: any) => {
    console.log('eventRemoveOldSelected');
    // if (
    //   !this.LadiPageScript.isEmpty(this.runtime.current_element_id) &&
    //   e != this.runtime.current_element_id
    // ) {
    //   var i = document.getElementById(
    //     this.runtime.current_element_id,
    //   ) as HTMLElement;
    //   if (!this.LadiPageScript.isEmpty(i)) {
    //     var n = i.getElementsByClassName('ladi-selected')[0] as HTMLElement,
    //       a = i.getElementsByClassName('ladi-rotate')[0] as HTMLElement,
    //       o = i.getElementsByClassName('ladi-resize');
    //     for (
    //       this.LadiPageScript.isEmpty(n) || n.parentElement?.removeChild(n),
    //         this.LadiPageScript.isEmpty(a) || a.parentElement?.removeChild(a);
    //       o.length > 0;
    //     )
    //       (o[0] as HTMLElement).parentElement?.removeChild(o[0]);
    //     var r = i.querySelectorAll(
    //       '.ladi-headline, .ladi-paragraph, .ladi-list-paragraph ul',
    //     )[0];
    //     if (!this.LadiPageScript.isEmpty(r) && 'true' == r.contentEditable) {
    //       t && this.startRollbackElement(), (r.contentEditable = 'inherit');
    //       var s = this.getElement(this.runtime.current_element_id, !1);
    //       (s.option.innerHTML = r.innerHTML),
    //         s.type ==
    //           this.LadiPagePlugin.getPlugin('list_paragraph').default_data.type &&
    //           this.LadiPageScript.isEmpty(s.option.innerHTML) &&
    //           (s.option.innerHTML = '<li>&nbsp;</li>'),
    //         this.setElement(s.id, s, !0),
    //         this.setElementRepeaterNameByParent(s.id);
    //       var l = null,
    //         c = this.runtime.current_element_id;
    //       do {
    //         (l = !1),
    //           (c = this.getParentIdByConst(c, 'IS_ATTRIBUTE_GROUP', !0)),
    //           this.LadiPageScript.isEmpty(c) ||
    //             (this.resetSizeElement(c, null, !0), (l = !0));
    //       } while (l);
    //       (this.runtime.is_select_text = !1), t && this.endRollbackElement(!0);
    //     }
    //   }
    //   var d = this.getElement(this.runtime.current_element_id, !1);
    //   if (
    //     !this.LadiPageScript.isEmpty(d) &&
    //     !this.LadiPageScript.isEmpty(d.option.parent)
    //   ) {
    //     var p = document.getElementById(d.option.parent);
    //     if (!this.LadiPageScript.isEmpty(p)) {
    //       var u = p.getElementsByClassName('ladi-parent-selected')[0];
    //       this.LadiPageScript.isEmpty(u) || u.parentElement.removeChild(u);
    //       var g = p.getElementsByClassName('ladi-parent-selected-label')[0];
    //       this.LadiPageScript.isEmpty(g) || g.parentElement.removeChild(g);
    //     }
    //   }
    // }
    // for (
    //   var h = document.getElementsByClassName('ladi-selected'),
    //     m = document.getElementsByClassName('ladi-rotate'),
    //     v = document.getElementsByClassName('ladi-parent-selected'),
    //     f = document.getElementsByClassName('ladi-parent-selected-label');
    //   h.length > 0;
    // )
    //   h[0].parentElement.removeChild(h[0]);
    // for (; m.length > 0; ) m[0].parentElement.removeChild(m[0]);
    // for (; v.length > 0; ) v[0].parentElement.removeChild(v[0]);
    // for (; f.length > 0; ) f[0].parentElement.removeChild(f[0]);
    // document
    //   .getElementById(this.runtime.builder_rotate_doc_id)
    //   ?.classList.add('ladi-hidden'),
    //   (this.runtime.list_element_ctrl = []),
    //   (this.runtime.current_element_id = ''),
    //   (this.runtime.current_element_type = ''),
    //   (this.runtime.current_element_parent_type = null),
    //   (this.runtime.current_element_parent_id = null);
  };

  eventRemoveOldHover = (e: any) => {
    console.log('eventRemoveOldHover');
  };

  eventMouseUpHold = (e: any, t: any) => {
    console.log('eventMouseUpHold', e, t);

    e = this.LadiPageScript.getEventCursorData(e);
    var i = this;
    document
      .getElementById(i.runtime.builder_quick_editor_id)
      ?.style.removeProperty('display');

    // for (
    //   var n = document.getElementsByClassName('ladi-new-parent');
    //   n.length > 0;

    // )
    //   (n[0] as HTMLElement)?.parentElement?.removeChild(n[0]);

    if (!this.LadiPageScript.isNull(i.runtime.tmp.slow_down_max_count)) {
      // for (var a = 1; a <= (i.runtime.tmp.slow_down_max_count as number); a++) {
      //   var o = 'builder_timeout_run_background_slowdown_id_' + a;
      //   this.LadiPageScript.removeTimeout(i.runtime[o]), delete i.runtime[o];
      // }
      // for (
      //   var r = document.getElementsByClassName('ladi-image-move');
      //   r.length > 0;
      // )
      //   r[0].classList.remove('ladi-image-move');
    }
    var s = i.getPageXNotOutScreen(e, e.pageX, !0),
      l = i.getPageYNotOutScreen(e, e.pageY, !0);
    // console.log(s);
    // console.log(l);

    delete i.runtime.tmp.current_scroll_y;
    var c = i.runtime.mouse_hold_position_x,
      d = s,
      p = i.runtime.mouse_hold_position_y,
      u = l,
      // u = 10,
      g = i.getDimensionByPosition(c, d, p, u),
      h = i.getElementByDimension(g, !0);

    if (i.runtime.is_double_click) {
      console.log('db');

      var m = !0;
      if (
        (m &&
          i.runtime.builder_position_click_x > e.pageX &&
          i.runtime.builder_position_click_x - e.pageX >
            i.runtime.builder_position_click_double_click_max &&
          (m = !1),
        m &&
          e.pageX > i.runtime.builder_position_click_x &&
          e.pageX - i.runtime.builder_position_click_x >
            i.runtime.builder_position_click_double_click_max &&
          (m = !1),
        m &&
          i.runtime.builder_position_click_y > e.pageY &&
          i.runtime.builder_position_click_y - e.pageY >
            i.runtime.builder_position_click_double_click_max &&
          (m = !1),
        m &&
          e.pageY > i.runtime.builder_position_click_y &&
          e.pageY - i.runtime.builder_position_click_y >
            i.runtime.builder_position_click_double_click_max &&
          (m = !1),
        m &&
          (!i.runtime.builder_is_hold || h.length <= 1) &&
          console.log('db click'))
        // i.eventDoubleClick(e))
      )
        return;
    }
    var v: any[] = [],
      f = null,
      _ = !1;
    if (i.runtime.builder_is_hold) {
      var y = document.getElementById(
        i.runtime.builder_mouse_hold_id
      ) as HTMLElement;
      y.style.removeProperty('top'),
        y.style.removeProperty('left'),
        y.style.removeProperty('width'),
        y.style.removeProperty('height'),
        y.classList.add('ladi-hidden');
      for (var b = document.getElementsByClassName('ladi-hold'); b.length > 0; )
        (b[0] as HTMLElement)?.parentElement?.removeChild(b[0]);
      if ((h = i.getListNoSelected(h)).length > 0) {
        if (h.length > 1) {
          i.addBorderItemGroupTmp(),
            (f = document.getElementById(
              i.runtime.builder_group_tmp_id
            ) as HTMLElement)?.classList.remove('ladi-hidden'),
            document.body.classList.add('group-tmp');
          var w = i.getDimensionByList(h, null, !1);
          f.style.setProperty('top', w.top + 'px'),
            f.style.setProperty('left', w.left + 'px'),
            f.style.setProperty('width', w.width + 'px'),
            f.style.setProperty('height', w.height + 'px');
          // window.$rootScope.$broadcast('unselect-section'),
          // window.$rootScope.$broadcast('select-element', {
          //   list_element_group_tmp: h,
          //   event: e,
          // });
        } else i.eventMouseUpSelected(e, h[0], !1);
        (i.runtime.list_element_group_tmp = h), (_ = !0);
      } else i.eventMouseUpSelected(e, t, !1);
    } else {
      i.runtime.builder_is_hold_group_tmp
        ? (v = i.runtime.list_element_group_tmp)
        : this.LadiPageScript.isEmpty(i.runtime.current_element_id) ||
          v.push(i.runtime.current_element_id);
    }
    var L = function (e: any, t: any) {
        (e[i.data.device_screen].style.top == t.style.getPropertyValue('top') &&
          e[i.data.device_screen].style.left ==
            t.style.getPropertyValue('left')) ||
          ((e[i.data.device_screen].style.top =
            t.style.getPropertyValue('top')),
          (e[i.data.device_screen].style.left =
            t.style.getPropertyValue('left')));
        // i.setElement(e.id, e, !1),
        // i.afterResizeSizeElement(e.id),
        // i.setPositionRepeaterChild(e.id, !0)
      },
      P: any[] = [],
      S = !1,
      E: any = null;
    v.forEach((t: string) => {
      var n = document.getElementById(t);
      if (!this.LadiPageScript.isEmpty(n)) {
        var a = i.getElement(t, !1);
        if (
          this.LadiPageScript.isEmpty(a) ||
          !a.option.draggable ||
          i.isElementPositionFixed(n)
        )
          return;
        if (
          this.LadiPageScript.isFunction(
            this.LadiPagePlugin.getPlugin(a.type).checkDraggable
          ) &&
          !this.LadiPagePlugin.getPlugin(a.type, !0, a, !1).checkDraggable()
        )
          return;
        // var o = i.getNewElementParentId(a.id, !0, !1, null, e),
        //   r = i.getNewElementParentId(a.id, !1, !0, o, e);
        // if (this.LadiPageScript.isEmpty(r) || a.option.parent == r) L(a, n);
        // else {
        //   L(a, n);
        //   var s = a.option.parent;
        //   if (
        //     (P.push(function () {
        //       i.setElementParent(t, r, !1, !0, !0, !0),
        //         (S = !0),
        //         i.setRepeaterNameChild(t, s);
        //     }),
        //     a.type == this.LadiPagePlugin.getPlugin('form').default_data.type &&
        //       a.option.is_add_to_cart)
        //   )
        //     for (
        //       var l = i.getChildElement(a.id, 'form_item'), c = 0;
        //       c < l.length;
        //       c++
        //     ) {
        //       var d = i.getElement(l[c], !1);
        //       !this.LadiPageScript.isEmpty(d) &&
        //         d.option.product_variant &&
        //         i.syncElement(d.id, !0);
        //     }
        // }
        // if ('true' == n.getAttribute('data-alt')) {
        //   var p = n.getElementsByClassName('ladi-selected')[0];
        //   if (!this.LadiPageScript.isEmpty(p)) {
        //     var u = parseFloatLadiPage(p.style.getPropertyValue('top')) || 0,
        //       g = parseFloatLadiPage(p.style.getPropertyValue('left')) || 0;
        //     (E = function () {
        //       (i.runtime.tmp.addtopalt = u - 1),
        //         (i.runtime.tmp.addleftalt = g),
        //         window.$rootScope.$broadcast('duplicate-element', {
        //           event: e,
        //         }),
        //         delete i.runtime.tmp.addtopalt,
        //         delete i.runtime.tmp.addleftalt,
        //         i.setPositionUpElement(e, 1);
        //     }),
        //       p.classList.remove('alt'),
        //       p.style.removeProperty('top'),
        //       p.style.removeProperty('left');
        //     for (
        //       var h = n.getElementsByClassName('ladi-resize'), m = 0;
        //       m < h.length;
        //       m++
        //     )
        //       h[m].classList.remove('opacity-0');
        //   }
        // }
        n?.removeAttribute('data-alt');
        var v = n?.getElementsByClassName('ladi-rotate')[0] as HTMLElement;
        this.LadiPageScript.isEmpty(v) || v.classList.remove('ladi-hidden'),
          document
            .getElementById(i.runtime.builder_rotate_doc_id)
            ?.classList.remove('ladi-hidden');
      }
    });
    for (; P.length > 0; ) P.shift()();
    if (
      (v.forEach((t) => {
        var n = null,
          a = t;
        // do {
        //   (n = !1),
        //     (a = i.getParentIdByConst(a, 'IS_ATTRIBUTE_GROUP', !0)),
        //     this.LadiPageScript.isEmpty(a) ||
        //       (i.resetSizeElement(a, null, !0), (n = !0));
        // } while (n);
        i.runtime.builder_is_hold_group_tmp
          ? i.setPositionQuickEditor(null, !0, null, null, !0)
          : (i.eventMouseUpSelected(e, t, !1),
            i.setPositionQuickEditor(t, !0, null, null, !1));
      }),
      i.runtime.builder_is_hold_group_tmp)
    ) {
      f = document.getElementById(
        i.runtime.builder_group_tmp_id
      ) as HTMLElement;
      var x = i.getDimensionByList(v, null, !1);
      f.style.setProperty('top', x.top + 'px'),
        f.style.setProperty('left', x.left + 'px'),
        f.style.setProperty('width', x.width + 'px'),
        f.style.setProperty('height', x.height + 'px');
    }
    if (i.runtime.list_element_group_tmp.length <= 1) {
      var C = t;
      if (
        (1 == i.runtime.list_element_group_tmp.length &&
          (C = i.runtime.list_element_group_tmp[0]),
        i.runtime.check_click_first_child)
      ) {
        console.log(i.runtime.tmp.check_mouse_up_hold + 'dm nó');
        var A = i.getElement(t, !1);
        this.LadiPageScript.isEmpty(A) ||
          A.type !=
            this.LadiPagePlugin.getPlugin('section').default_data.type ||
          i.eventMouseUpSelected(e, C, !1);
      } else {
        console.log(i.runtime.tmp.check_mouse_up_hold + 'dm nó');
        i.runtime.tmp.check_mouse_up_hold && i.eventMouseUpSelected(e, C, !1);
      }
    } else {
      i.eventRemoveOldSelected(null, !1);

      // i.showSwapElement(
      //   i.runtime.current_element_id,
      //   i.runtime.list_element_group_tmp,
      // );
      this.LadiPageScript.isEmpty(t) &&
        0 == i.runtime.list_element_group_tmp.length &&
        // (window.$rootScope.$broadcast('unselect-section'),
        // window.$rootScope.$broadcast('unselect-element'),
        // window.$rootScope.$broadcast('close-attribute')),
        console.log('4545');

      (i.runtime.current_event = i.const.ELEMENT_EVENT.selected),
        (i.runtime.is_element_not_move_out = !1),
        _ && (i.runtime.list_element_ctrl = i.runtime.list_element_group_tmp),
        // S && i.setListElementInScreen(),
        this.LadiPageScript.isFunction(E) && E();
    }
  };

  getPageXNotOutScreen = (e: any, t: any, i: any) => {
    var n = i ? 20 : 0;
    return (
      e.clientX < 0 + n
        ? (t += 0 + n - e.clientX)
        : e.clientX > window.innerWidth - n - this.runtime.scrollbar_size &&
          (t -=
            e.clientX - (window.innerWidth - n - this.runtime.scrollbar_size)),
      t
    );
  };

  getPageYNotOutScreen = (e: any, t: any, i: any) => {
    var n = i ? 20 : 0;
    return (
      e.clientY < this.runtime.builder_menu_top + n
        ? (t += this.runtime.builder_menu_top + n - e.clientY)
        : e.clientY > window.innerHeight - n &&
          (t -= e.clientY - (window.innerHeight - n)),
      (t =
        t -
        (this.runtime.tmp.current_scroll_y || 0) +
        this.getBuilderEditorScrollY())
    );
  };

  getDimensionByPosition = (e: any, t: any, i: any, n: any) => {
    var a = 0,
      o = 0,
      r = 0,
      s = 0;
    e != t &&
      i != n &&
      (t - e > 0 ? ((a = e), (o = t)) : ((a = t + 1), (o = e)),
      n - i > 0 ? ((r = i), (s = n)) : ((r = n + 1), (s = i)));
    var l = r - this.runtime.builder_menu_top + this.getBuilderEditorScrollY(),
      c = a - this.runtime.builder_menu_left,
      d = o - a,
      p = s - r;
    return (
      (d <= 0 || p <= 0) && ((l = 0), (c = 0), (d = 0), (p = 0)),
      { width: d, height: p, top: l, left: c }
    );
  };

  getElementByDimension = (e: any, t: boolean) => {
    var i: any[] = [],
      n = !this.LadiPageScript.isEmpty(this.runtime.current_popup_id),
      a = 0,
      o = 0,
      r = null;
    if (n) {
      r = document.getElementById(this.runtime.current_popup_id);
      var s = this.LadiPageScript.getElementBoundingClientRect(
          r as HTMLElement
        ),
        l = this.getBuilderEditorScrollY();
      (a += s.y - this.runtime.builder_menu_top + l),
        (o += s.x - this.runtime.builder_menu_left);
    }
    var c = this,
      d = t
        ? this.runtime.list_element_in_screen_no_fixed
        : this.runtime.list_element_in_screen;
    return (
      (d = this.getElementByDimensionBanner(d)).forEach((t: string) => {
        var r = c.getElement(t, !1);
        if (!this.LadiPageScript.isEmpty(r) && !r.option.locked) {
          var s = r[c.data.device_screen],
            l = n ? 0 : c.getPaddingDevice(t),
            d = c.getTopElement(t, null, !1),
            p = c.getLeftElement(t, null, !1) + l,
            u = parseFloatLadiPage(s.style.width),
            g = parseFloatLadiPage(s.style.height);
          e.top - a < d + g &&
            e.top - a + e.height > d &&
            e.left - o < p + u &&
            e.left - o + e.width > p &&
            i.push(t);
        }
      }),
      i
    );
  };

  getElementByDimensionBanner = (e: any) => {
    if (this.runtime.is_builder_banner) {
      var t = this,
        i = this.getElementNoParent(!1)[0],
        n = this.getChildElement(i, 'banner');
      if (((e = e.except(n)), t.runtime.list_element_group_tmp.length > 0)) {
        var a = t.getElement(t.runtime.list_element_group_tmp[0], !1);
        this.LadiPageScript.isEmpty(a) ||
          this.LadiPageScript.isEmpty(a.option.parent) ||
          -1 == n.indexOf(a.option.parent) ||
          (e = t.getChildElement(a.option.parent));
      } else
        n.forEach(function (i) {
          e = e.concat(t.getChildElement(i));
        });
    }
    return e;
  };
}
