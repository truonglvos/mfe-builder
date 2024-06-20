import {
  IElementItem,
  IMenuAddNewLeft,
  IShortCutMenu,
} from '@models/menu.model';
import { ADD_NEW_LEFT, ELEMENT_ITEM } from './enum';

export const MENU_ADD_NEW_LEFT: IMenuAddNewLeft[] = [
  {
    label: 'phần tử',
    isLine: false,
    value: ADD_NEW_LEFT.ELEMENT,
    dataShortcutMenu: true,
  },
  {
    label: 'assets',
    isLine: false,
    value: ADD_NEW_LEFT.ASSETS,
    dataShortcutMenu: false,
  },
  {
    isLine: true,
  },
  {
    label: 'section',
    isLine: false,
    value: ADD_NEW_LEFT.SECTION,
    dataShortcutMenu: true,
  },
  {
    label: 'popup',
    isLine: false,
    value: ADD_NEW_LEFT.POPUP,
    dataShortcutMenu: true,
  },
  {
    label: 'dropbox',
    isLine: false,
    value: ADD_NEW_LEFT.DROPBOX,
    dataShortcutMenu: true,
  },
  {
    isLine: true,
  },
  {
    label: 'Ứng dụng',
    isLine: false,
    value: ADD_NEW_LEFT.APP,
    dataShortcutMenu: true,
  },
  {
    label: 'Quản lý nội dung',
    isLine: false,
    value: ADD_NEW_LEFT.DATASET,
    dataShortcutMenu: false,
  },
  {
    label: 'Quản lý Media',
    isLine: false,
    value: ADD_NEW_LEFT.MEDIA,
    dataShortcutMenu: false,
  },
  {
    label: 'Quản lý tài liệu',
    isLine: false,
    value: ADD_NEW_LEFT.FOLDER,
    dataShortcutMenu: false,
  },
  {
    label: 'Quản lý Font',
    isLine: false,
    value: ADD_NEW_LEFT.FONT,
    dataShortcutMenu: false,
  },
];

export const ELEMENT_LIST: IElementItem[] = [
  {
    label: 'Văn bản',
    type: ELEMENT_ITEM.HEADLINE,
    dataShortcutMenu: true,
  },
  {
    label: 'Nút bấm',
    type: ELEMENT_ITEM.BUTTON,
    dataShortcutMenu: true,
  },
  {
    label: 'Ảnh',
    type: ELEMENT_ITEM.IMAGE,
    dataShortcutMenu: true,
  },
  {
    label: 'Gallery',
    type: ELEMENT_ITEM.GALLERY,
    dataShortcutMenu: false,
  },
  {
    label: 'Hình hộp',
    type: ELEMENT_ITEM.BOX,
    dataShortcutMenu: true,
  },
  {
    label: 'Biểu tượng',
    type: ELEMENT_ITEM.SHAPE,
    dataShortcutMenu: false,
  },
  {
    label: 'Đường kẻ',
    type: ELEMENT_ITEM.LINE,
    dataShortcutMenu: false,
  },
  {
    label: 'Form',
    type: ELEMENT_ITEM.FORM,
    dataShortcutMenu: false,
  },
  {
    label: 'Video',
    type: ELEMENT_ITEM.VIDEO,
    dataShortcutMenu: false,
  },
  {
    label: 'Collection List',
    type: ELEMENT_ITEM.COLLECTION,
    dataShortcutMenu: false,
  },
  {
    label: 'Carousel',
    type: ELEMENT_ITEM.CAROUSEL,
    dataShortcutMenu: false,
  },
  {
    label: 'Tabs',
    type: ELEMENT_ITEM.TABS,
    dataShortcutMenu: false,
  },
  {
    label: 'Frame',
    type: ELEMENT_ITEM.FRAME,
    dataShortcutMenu: false,
  },
  {
    label: 'Accordion',
    type: ELEMENT_ITEM.ACCORDION,
    dataShortcutMenu: false,
  },
  {
    label: 'Table',
    type: ELEMENT_ITEM.TABLE,
    dataShortcutMenu: false,
  },
  {
    label: 'Survey',
    type: ELEMENT_ITEM.SURVEY,
    dataShortcutMenu: false,
  },
  {
    label: 'Mã HTML',
    type: ELEMENT_ITEM.HTML_CODE,
    dataShortcutMenu: false,
  },
];

export const LIST_SHORTCUT_MENU_PRIMARY: IShortCutMenu[] = [
  {
    label: 'Hình ảnh',
    type: ELEMENT_ITEM.IMAGE,
  },
  {
    label: 'Tiêu đề',
    type: ELEMENT_ITEM.HEADLINE,
  },
  {
    label: 'Đoạn văn',
    type: ELEMENT_ITEM.PARAGRAPH,
  },
  {
    label: 'Nút bấm',
    type: ELEMENT_ITEM.BUTTON,
  },
  {
    label: 'Hình hộp',
    type: ELEMENT_ITEM.BOX,
  },
  {
    label: 'Biểu tượng',
    type: ELEMENT_ITEM.SHAPE,
  },
  {
    label: 'Video',
    type: ELEMENT_ITEM.VIDEO,
  },
];

export const LIST_SHORTCUT_MENU_ALL: IShortCutMenu[] = [
  {
    label: 'Gallery',
    type: ELEMENT_ITEM.GALLERY,
  },
  {
    label: 'Table',
    type: ELEMENT_ITEM.TABLE,
  },
  {
    label: 'Nhóm nút bấm',
    type: ELEMENT_ITEM.TABLE,
  },
  {
    label: 'Danh sách',
    type: ELEMENT_ITEM.TABLE,
  },
  {
    label: 'Mã HTML',
    type: ELEMENT_ITEM.HTML_CODE,
  },
  {
    label: 'Đường kẻ',
    type: ELEMENT_ITEM.LINE,
  },
  {
    label: 'frame',
    type: ELEMENT_ITEM.FRAME,
  },
  {
    label: 'Pen Tool',
    type: ELEMENT_ITEM.TABLE,
  },
  {
    label: 'Accordion',
    type: ELEMENT_ITEM.ACCORDION,
  },
  {
    label: 'form',
    type: ELEMENT_ITEM.FORM,
  },
  {
    label: 'Countdown',
    type: ELEMENT_ITEM.TABLE,
  },
  {
    label: 'Carousel',
    type: ELEMENT_ITEM.CAROUSEL,
  },
  {
    label: 'Notify',
    type: ELEMENT_ITEM.TABLE,
  },
  {
    label: 'Collection List',
    type: ELEMENT_ITEM.COLLECTION,
  },
  {
    label: 'Spin Lucky',
    type: ELEMENT_ITEM.TABLE,
  },
  {
    label: 'Tabs',
    type: ELEMENT_ITEM.TABS,
  },
];
