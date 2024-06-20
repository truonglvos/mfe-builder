import { Injectable } from '@angular/core';
import { isArray, isNull, isString } from '@shares/utility';

@Injectable({
  providedIn: 'root',
})
export class LadiPageScriptService {
  const = {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    DOMAIN_GOOGLE_DOCS: 'docs.google.com',
    POWERED_BY_IMAGE: 'https://w.ladicdn.com/source/v3/by/ladipage.svg',
    STATIC_W_DOMAIN: 'w.ladicdn.com',
    STATIC_S_DOMAIN: 's.ladicdn.com',
    APP_RUNTIME_PREFIX: '_runtime',
    ACTION_TYPE: {
      action: 'action',
      '1st_click': '1st_click',
      '2nd_click': '2nd_click',
      hover: 'hover',
      complete: 'complete',
    },
    DATA_ACTION_TYPE: {
      link: 'link',
      section: 'section',
      email: 'email',
      phone: 'phone',
      popup: 'popup',
      dropbox: 'dropbox',
      hidden_show: 'hidden_show',
      collapse: 'collapse',
      set_value: 'set_value',
      copy_clipboard: 'copy_clipboard',
      change_index: 'change_index',
      set_style: 'set_style',
      set_value_2nd: 'set_value_2nd',
      lightbox: 'lightbox',
      popup_cart: 'popup_cart',
      popup_checkout: 'popup_checkout',
    },
    DATA_ACTION_LIGHTBOX_TYPE: {
      image: 'image',
      video: 'video',
      iframe: 'iframe',
    },
    COUNTDOWN_TYPE: {
      countdown: 'countdown',
      daily: 'daily',
      endtime: 'endtime',
    },
    COUNTDOWN_ITEM_TYPE: {
      day: 'day',
      hour: 'hour',
      minute: 'minute',
      seconds: 'seconds',
    },
    VIDEO_TYPE: { youtube: 'youtube', direct: 'direct' },
    BACKGROUND_STYLE: {
      solid: 'solid',
      gradient: 'gradient',
      image: 'image',
      video: 'video',
    },
    PUBLISH_PLATFORM: {
      ladipage: 'LADIPAGE',
      ladipagedns: 'LADIPAGEDNS',
      wordpress: 'WORDPRESS',
      haravan: 'HARAVAN',
      sapo: 'SAPO',
      shopify: 'SHOPIFY',
      itop: 'ITOPWEBSITE',
      ftp: 'FTP',
      other: 'OTHER',
    },
    SECTION_TYPE: { default: 'DEFAULT', global: 'GLOBAL' },
    TRACKING_NAME: 'ladicid',
    ACCESS_KEY_NAME: 'ladiack',
    REF_NAME: 'ref',
    OTP_TYPE: {
      send: 'OTP_SEND',
      resend: 'OTP_RESEND',
      sms: 'OTP_SMS',
      voice: 'OTP_VOICE',
      zns: 'OTP_ZNS',
    },
    STATUS_SEND: { capture: 1, otp: 1, sendform: 2 },
    PUBLISH_STYLE: { desktop_min_width: 768, mobile_small_min_width: 320 },
    ANIMATED_LIST: [
      'rotate-1',
      'rotate-2',
      'rotate-3',
      'type',
      'scale',
      'loading-bar',
      'slide',
      'clip',
      'zoom',
      'push',
    ],
    POSITION_TYPE: {
      default: 'default',
      top: 'top',
      bottom: 'bottom',
      top_left: 'top_left',
      top_center: 'top_center',
      top_right: 'top_right',
      center_left: 'center_left',
      center_right: 'center_right',
      bottom_left: 'bottom_left',
      bottom_center: 'bottom_center',
      bottom_right: 'bottom_right',
    },
    COLLECTION_TYPE: { carousel: 'carousel', readmore: 'readmore' },
    INPUT_TYPE: {
      tel: 'tel',
      password: 'password',
      text: 'text',
      date: 'date',
      select_multiple: 'select_multiple',
      number: 'number',
      email: 'email',
      textarea: 'textarea',
      select: 'select',
      radio: 'radio',
      checkbox: 'checkbox',
      file: 'file',
      product_variant: 'product_variant',
    },
    CONTENT_TYPE: {
      form_data: 'FORM_DATA',
      form_urlencoded: 'X_WWW_FORM_URLENCODED',
      json: 'JSON',
    },
    SORT_BY_TYPE: { asc: 'asc', desc: 'desc' },
    PRODUCT_VARIANT_TYPE: {
      combined: 'combined',
      combobox: 'combobox',
      label: 'label',
    },
    PRODUCT_VARIANT_OPTION_TYPE: { color: 1, image: 2 },
    PRODUCT_VARIANT_TITLE: { left: 'left', top: 'top' },
    FORM_THANKYOU_TYPE: { default: 'default', url: 'url', popup: 'popup' },
    GAME_RESULT_TYPE: { default: 'default', popup: 'popup' },
    PERCENT_TRACKING_SCROLL: [0, 25, 50, 75, 100],
    TIME_ONPAGE_TRACKING: [10, 30, 60, 120, 180, 300, 600],
    FORM_CONFIG_TYPE: {
      email: 'EMAIL',
      mail_chimp: 'MAIL_CHIMP',
      infusion_soft: 'INFUSION_SOFT',
      infusion_soft_ladi: 'INFUSION_SOFT_LADI',
      active_campaign: 'ACTIVE_CAMPAIGN',
      sendgrid: 'SENDGRID',
      hubspot: 'HUBSPOT',
      smtp: 'SMTP',
      esms: 'ESMS',
      get_response: 'GET_RESPONSE',
      convertkit: 'CONVERTKIT',
      ladiflow: 'LADIFLOW',
      telegram: 'TELEGRAM',
      slack: 'SLACK',
      zalo_zns: 'ZALO_ZNS',
      mautic: 'MAUTIC',
      google_sheet: 'GOOGLE_SHEET',
      google_form: 'GOOGLE_FORM',
      custom_api: 'CUSTOM_API',
      ladisales: 'LADISALES',
      haravan: 'HARAVAN',
      sapo: 'SAPO',
      shopify: 'SHOPIFY',
      nhanh_vn: 'NHANH_VN',
      google_recaptcha: 'GOOGLE_RECAPTCHA',
      google_recaptcha_checkbox: 'GOOGLE_RECAPTCHA_CHECKBOX',
      google_recaptcha_enterprise: 'GOOGLE_RECAPTCHA_ENTERPRISE',
      kiotviet: 'KIOTVIET',
      wordpress: 'WORDPRESS',
      metu: 'METU',
      ladichat: 'LADICHAT',
      shopping: 'SHOPPING',
      blog: 'BLOG',
      conversion_api: 'CONVERSION_API',
      popupx: 'POPUPX',
    },
    FORM_UPLOAD_FILE_LENGTH: 20,
    FORM_UPLOAD_FILE_SIZE: 25,
    CART_LAYOUT: { editable: 'editable', viewonly: 'viewonly' },
    WIDTH_SECTION_RESIZE: {},
    RESIZE_ADD_PIXEL: 300,
    RESIZE_ADD_PIXEL_THUMB: 50,
    RESIZE_RANGE: 50,
    TOOLTIP_TYPE: {
      default: 'default',
      info: 'info',
      success: 'success',
      error: 'error',
      notice: 'notice',
    },
    TOOLTIP_POSITION: {
      top_left: 'top_left',
      top_middle: 'top_middle',
      top_right: 'top_right',
      bottom_left: 'bottom_left',
      bottom_middle: 'bottom_middle',
      bottom_right: 'bottom_right',
      left_top: 'left_top',
      left_middle: 'left_middle',
      left_bottom: 'left_bottom',
      right_top: 'right_top',
      right_middle: 'right_middle',
      right_bottom: 'right_bottom',
    },
    TOOLTIP_SIZE: { small: 'small', medium: 'medium', big: 'big' },
    STORY_PAGE: {
      horizontal: 'horizontal',
      vertical: 'vertical',
      none: 'none',
    },
    COMBOBOX_TYPE: { delivery_method: 'delivery_method' },
    PRODUCT_TYPE: { event: 'Event', service: 'Service', physical: 'Physical' },
  };
  runtime = {
    backdrop_popup_id: 'backdrop-popup',
    backdrop_dropbox_id: 'backdrop-dropbox',
    lightbox_screen_id: 'lightbox-screen',
    builder_section_popup_id: 'SECTION_POPUP',
    builder_section_background_id: 'BODY_BACKGROUND',
    ladipage_powered_by_classname: 'ladipage_powered_by',
    current_element_mouse_down_carousel: null,
    current_element_mouse_down_carousel_position_x: 0,
    current_element_mouse_down_carousel_diff: 40,
    current_element_mouse_down_gallery_control: null,
    current_element_mouse_down_gallery_control_time: 0,
    current_element_mouse_down_gallery_control_time_click: 300,
    current_element_mouse_down_gallery_control_position_x: 0,
    current_element_mouse_down_gallery_view: null,
    current_element_mouse_down_gallery_view_position_x: 0,
    current_element_mouse_down_gallery_view_diff: 40,
    scroll_show_popup: {},
    scroll_depth: [],
    scroll_to_section: {},
    send_request_response: {},
    is_mobile_only: !1,
    interval_countdown: null,
    interval_gallery: null,
    timeout_gallery: {},
    interval_carousel: null,
    count_click_dom: {},
    timenext_carousel: {},
    time_click_dom: {},
    time_click: 300,
    time_otp: 6e4,
    isClient: !1,
    isDesktop: !0,
    isBrowserDesktop: !0,
    isIE: !1,
    isLoadHtmlGlobal: !1,
    isYouTubeIframeAPIReady: !1,
    isLoadYouTubeIframeAPI: !1,
    isVideoButtonUnmute: !0,
    device: this.const.DESKTOP,
    ladipage_id: null,
    func_get_code_otp: {},
    list_dataset_load: [],
    list_scroll_func: {},
    list_loaded_func: [],
    list_show_popup_func: {},
    list_youtube_ready_exec: [],
    list_scrolling_exec: {},
    list_scrolled_exec: {},
    list_lightbox_id: {},
    list_set_value_name_country: ['ward', 'district', 'state', 'country'],
    tmp: {},
    tabindexForm: 0,
    eventData: {},
    eventDataGlobal: {},
    timenow: 0,
    widthScrollBar: 0,
    replaceStr: {},
    replacePrefixStart: '{{',
    replacePrefixEnd: '}}',
    replaceNewPrefixStart: '!::',
    replaceNewPrefixEnd: '::!',
  };
  constructor() {}
  // ulti
  isEmpty = (e: any) =>
    !!isNull(e) ||
    (isString(e)
      ? 0 == (e = e.trim()).length || 'undefined' == e.toLowerCase()
      : !!isArray(e) && 0 == e.length);

  isNull = (e: any) => {
    return void 0 === e || void 0 == e;
  };

  isString = (e: any) => {
    return 'string' == typeof e || e instanceof String;
  };

  isFunction = (e: any) => 'function' === typeof e || e instanceof Function;

  isObject = (e: any) => {
    return !this.isFunction(e) && !this.isArray(e) && e instanceof Object;
  };

  isArray = (e: any) => {
    return e instanceof Array;
  };
  // end ulti

  createStyleElement = (id: string, html: string) => {
    // var element = document.getElementById(id) as HTMLElement;
    // let styleEle: HTMLStyleElement;
    // return (
    //   this.isEmpty(element) &&
    //     (((styleEle = document.createElement('style')).id = id),
    //     (styleEle.type = 'text/css'),
    //     document.head.appendChild(styleEle)),
    //   element.innerHTML != html && (element.innerHTML = html),
    //   element
    // );
  };

  getElementBoundingClientRect = (id: string | HTMLElement) => {
    let element: HTMLElement;
    if (typeof id === 'string') {
      element = document.getElementById(id) as HTMLElement;
    } else {
      element = id;
    }
    return element.getBoundingClientRect();
  };

  findAncestor = (e: any, t: any) => {
    t = isArray(t) ? t : [t];
    for (
      var n = function (e: any, t: any) {
          if (isNull(e) || isNull(e.classList) || !e.classList.contains(t))
            for (; (e = e.parentElement) && !e.classList.contains(t); );
          return e;
        },
        a = 0;
      a < t.length && ((e = n(e, t[a])), !this.isEmpty(e));
      a++
    );
    return e;
  };

  getEventCursorData = (e: any) => {
    return (
      ['pageX', 'pageY', 'screenX', 'screenY'].forEach((i) => {
        this.isNull(e[i]) &&
          (!this.isEmpty(e.touches) && e.touches.length > 0
            ? (e[i] = e.touches[0][i])
            : !this.isEmpty(e.targetTouches) && e.targetTouches.length > 0
            ? (e[i] = e.targetTouches[0][i])
            : !this.isEmpty(e.changedTouches) &&
              e.changedTouches.length > 0 &&
              (e[i] = e.changedTouches[0][i]));
      }),
      e
    );
  };

  fireEvent = (e: any, t: any, i?: any) => {
    e = this.isString(e) ? document.querySelector(e) : e;
    var n = document.createEvent('HTMLEvents');
    (n.initEvent(t, !0, !0), this.isObject(i)) &&
      Object.keys(i).forEach((e) => {
        (n[e as keyof Event] as any) = i[e];
      });
    return !e.dispatchEvent(n);
  };

  runTimeout = (func: Function, time: number) => {
    if (this.isFunction(func)) {
      if (!this.isEmpty(time) && time > 0) setTimeout(func, time);
      func();
    }
  };

  removeTimeout = (timeoutId: string | number | undefined) => {
    return clearTimeout(timeoutId);
  };
}
