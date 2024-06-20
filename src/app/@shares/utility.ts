import { ELEMENT_ID } from '@constants/const';
import { DEVICE } from '@constants/enum';
import { IElementPosition } from '@models/app.model';
import {
  IElement,
  IElementDevice,
  IElementNoParent,
} from '@models/element.model';
import { IDevice } from '@states/menu';
import { IElementObj } from '@states/source';

export {};

declare global {
  interface Array<T = any> {
    removeSpace(): T[];
  }
  //   interface ArrayConstructor {
  //   }
}

Array.prototype.removeSpace = function () {
  let e: any[] = [];
  return (
    this.forEach(function (t) {
      (t = t.trim()).length > 0 && e.push(t);
    }),
    e
  );
};

export const isArray = (e: any) => Array.isArray(e);
export const isFunction = (e: any) =>
  'function' === typeof e || e instanceof Function;
export const isObject = (e: any) =>
  !isFunction(e) && !isArray(e) && e instanceof Object;
export const isBoolean = (e: any) => typeof e === 'boolean';
export const isNull = (e: any) => void 0 === e || void 0 == e;
export const isString = (e: any) =>
  typeof e === 'string' || e instanceof String;
export const isEmpty = (e: any) =>
  !!isNull(e) ||
  (isString(e)
    ? 0 == (e = e.trim()).length || 'undefined' == e.toLowerCase()
    : !!isArray(e) && 0 == e.length);
export const equals = (a: any, b: any) =>
  typeof a === typeof b && JSON.stringify(a) === JSON.stringify(b);
export const copy = (e: any) => (isNull(e) ? e : JSON.parse(JSON.stringify(e)));

export const getSelectedElement = () => {
  let selection = window.getSelection();
  if (selection?.rangeCount) {
    let i = selection.getRangeAt(0).commonAncestorContainer;
    return 1 == i.nodeType ? i : i.parentNode;
  }
  return null;
};

export const getSelectedRange = (): Range | null => {
  let selection = window.getSelection() as Selection;
  if (selection?.rangeCount) return selection.getRangeAt(0);
  return null;
};

export const selectRangeText = (node: Node) => {
  const selection = window.getSelection();
  const range = document.createRange();
  if (selection && range) {
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export const reSelectedTextRange = (
  current_select_text_range: Range | null
) => {
  if (!current_select_text_range) return;
  const selection = window.getSelection();
  if (selection && selection.rangeCount) {
    selection.removeAllRanges();
    selection.addRange(current_select_text_range);
  }
};

export const getSelectedText = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount) {
    return selection.toString();
  }
  return '';
};

export const checkSelectedRangeAll = () => {
  let range = getSelectedRange();
  if (isEmpty(range)) return !1;
  var t = null;
  if (
    (isEmpty(range?.commonAncestorContainer) ||
      ((t = findAncestor(range?.commonAncestorContainer, 'ladi-element')),
      isEmpty(t) || (t = t.querySelector('[contenteditable="true"]'))),
    isEmpty(t))
  )
    return !1;
  if ('true' != t.contentEditable) return !1;
  var i = getSelectedText();
  if (
    !equals(i.split('\n').removeSpace(), t.innerText.split('\n').removeSpace())
  ) {
    var n = t.innerText.trim().length;
    if (0 == n && !isEmpty(i) && i.trim().length == n) return !1;
    if (n > 0 && (isEmpty(i) || i.trim().length != n)) return !1;
  }
  try {
    for (var a = 0, o = 0, r = 0; r < t.childNodes.length; r++)
      'BR' != t.childNodes[r].tagName ? a++ : (o = r),
        0 == r && t.childNodes[r].nodeName;
    if (1 == a && '#text' != t.childNodes[o].nodeName)
      return (t.childNodes[o].outerHTML = t.childNodes[o].innerHTML), !0;
  } catch (e) {}
  return !0;
};

export const findAncestor = (e: any, t: any) => {
  t = isArray(t) ? t : [t];
  for (
    var n = function (e: any, t: any) {
        if (isNull(e) || isNull(e.classList) || !e.classList.contains(t))
          for (; (e = e.parentElement) && !e.classList.contains(t); );
        return e;
      },
      a = 0;
    a < t.length && ((e = n(e, t[a])), !isEmpty(e));
    a++
  );
  return e;
};

export const subStringBeforeNumber = (e: string): string => {
  for (e += ''; e.length > 0 && isNaN(parseInt(e[0])); ) e = e.substring(1);
  return e;
};

export const getElement = (
  elements: IElementObj,
  id: string,
  isCopy: boolean
): Partial<IElement> | null => {
  let e = elements[id];
  return isCopy ? (isEmpty(e) ? null : copy(e)) : e;
};

export const getElements = (
  elements: IElementObj,
  ids: string[],
  isCopy: boolean
) => {
  let result: Partial<IElement>[] = [];
  return (
    ids.forEach((id) => {
      let ele = getElement(elements, id, isCopy);
      if (isEmpty(ele)) {
        result.push(ele as Partial<IElement>);
      }
    }),
    result
  );
};

export const getPaddingDevice = (elementId: string, device: IDevice) => {
  var t = (getBuilderEditorWidth() - getWidth(device)) / 2;
  // if (((t = t > 0 ? t : 0), !isEmpty(elementId))) {
  //   var i = document.getElementById(elementId);
  //   t = !0 ? 0 : t;
  // }
  return t;
};

export const getBuilderEditorWidth = (): number =>
  (document.getElementById(ELEMENT_ID.builder_editor_id) as HTMLElement)
    .clientWidth;

export const getBuilderEditorScrollY = (): number =>
  document.getElementById(ELEMENT_ID.builder_editor_id)?.scrollTop as number;

export const getBuilderEditorHeight = (): number =>
  document.getElementById(ELEMENT_ID.builder_editor_id)?.clientHeight as number;

export const getWidth = (device: IDevice, screen?: DEVICE) => {
  const screenString = isEmpty(screen)
    ? device.deviceScreen
    : (screen as DEVICE);
  return device.width[screenString];
};

export const getEventCursorData = (e: any) => {
  return ['pageX', 'pageY', 'screenX', 'screenY'].forEach((property) => {
    // e.t
  });
};

export const isElementPositionFixed = (element: HTMLElement, t: any) => {
  if (!isEmpty(element)) {
    let position = element.style.getPropertyValue('position');
    return (
      isEmpty(position) && (position = getComputedStyle(element).position),
      'fixed' == position
    );
  }

  return !1;
};

export const parseFloatLadi = (
  value: string | number | undefined,
  fraction = 6
) => {
  if (!value) return 0;
  let valueNumber = parseFloat(value + '');
  try {
    return parseFloat(formatNumber(valueNumber, 21, null, fraction));
  } catch (e) {
    return NaN;
  }
};
export const parseFloatLadiPage = (
  value: string | number | undefined,
  fraction = 6
) => {
  if (!value) {
    return 0;
  }
  let valueNumber = parseFloat(value + '');
  try {
    return parseFloat(formatNumber(valueNumber, 21, null, fraction));
  } catch (e) {
    return NaN;
  }
};
export const formatNumber = (e: any, t: any, i: any, n: number) => {
  if (void 0 != e) {
    void 0 == i && (i = 0), void 0 == n && (n = 0);
    var a = '\\d(?=(\\d{' + (t || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    e = e.toFixed(Math.max(0, ~~n)).replace(new RegExp(a, 'g'), '$&,');
    var o = null,
      r = null;
    i >= 1 &&
      ((r = (o = e.split('.'))[0]),
      (e = r = new Array(i - r.length + 1).join('0') + r),
      2 == o.length && (e += '.' + o[1])),
      n >= 1 &&
        2 == (o = e.split('.')).length &&
        ((r = o[1]),
        (r = new Array(n - r.length + 1).join('0') + r),
        (e = o[0] + '.' + r));
  }
  return e;
};

export const snapListSnapScreen = (isDesktop: boolean) => {
  const current_pixel_snap = isDesktop ? 5 : 3;
};

export const getListElementInScreen = (
  elements: IElementObj,
  device_screen: DEVICE
) => {
  const listElemetNoParent = getElementNoParent(elements, device_screen, !1);
  const builderScrollY = getBuilderEditorScrollY();
  const builderEditorHeight = getBuilderEditorHeight();
  const result: string[] = [];
  return (
    listElemetNoParent.forEach((ele) => {
      getChildElement(elements, ele, '', '', '', '', device_screen).forEach(
        (id) => {
          var top = getTopElement(id, device_screen, null),
            element = getElement(elements, id, !1) as Partial<IElement>,
            height = parseFloatLadi(element[device_screen]?.style?.height || 0);
          ((top >= builderScrollY &&
            top <= builderScrollY + builderEditorHeight) ||
            (top + height >= builderScrollY &&
              top + height <= builderScrollY + builderEditorHeight) ||
            (top < builderScrollY &&
              top + height > builderScrollY + builderEditorHeight)) &&
            result.push(id);
        }
      );
    }),
    result
  );
};

export const getElementNoParent = (
  elements: IElementObj,
  device_screen: DEVICE,
  e: boolean
): string[] => {
  let listElement: IElementNoParent[] = [];
  Object.keys(elements).forEach((key) => {
    if (
      (e || key !== ELEMENT_ID.builder_section_popup_id) &&
      key !== ELEMENT_ID.builder_section_background_id
    ) {
      let element = getElement(elements, key, !1);
      !isEmpty(element) &&
        isEmpty(element?.option?.parent) &&
        listElement.push({ id: key, element: element as Partial<IElement> });
    }
  });
  listElement.sort(
    (a, b) =>
      a.element[device_screen]?.option?.index ||
      0 - (b.element[device_screen]?.option?.index || 0)
  );
  let result: string[] = [];
  return (
    listElement.forEach((ele) => {
      result.push(ele.id);
    }),
    result
  );
};

export const getChildElement = (
  elements: any,
  e: any,
  t: any,
  i: any,
  n: any,
  a: any,
  device_screen: DEVICE
) => {
  let s: IElementNoParent[] = [];
  Object.keys(elements).forEach(function (i) {
    var n = getElement(elements, i, !1) as Partial<IElement>;
    isEmpty(n) ||
      n.option?.parent != e ||
      ((isEmpty(t) || t == n.type) && s.push({ id: i, element: n }));
  }),
    s.sort(function (e, t) {
      return i && !n
        ? getTopElement(e.id, device_screen, null) -
            getTopElement(t.id, device_screen, null)
        : n && !i
        ? getHeightElement(e.id, device_screen, null) -
          getHeightElement(t.id, device_screen, null)
        : n && i
        ? getTopHeightElement(e.id, device_screen, null) -
          getTopHeightElement(t.id, device_screen, null)
        : ((e.element[device_screen] as unknown as IElementDevice).option
            ?.index || 0) - (t.element[device_screen]?.option?.index || 0);
    });
  var l: string[] = [];
  return (
    s.forEach(function (e) {
      if (a) {
        var t = document.getElementById(e.id) as HTMLElement;
        if (isElementPositionFixed(t, null)) return;
      }
      l.push(e.id);
    }),
    l
  );
};

export const getHeightElement = (
  id: string,
  device_screen: DEVICE,
  elements: IElementObj | null
): number => {
  if (!elements) {
    let ele = document.getElementById(id);
    if (!isEmpty(ele)) {
      return parseFloatLadi(ele?.style.getPropertyValue('height') || 0);
    }
  }
  let element = getElement(
    elements as IElementObj,
    id,
    !1
  ) as Partial<IElement>;
  return parseFloatLadi(element[device_screen]?.style?.height || 0) || 0;
};

export const getTopElement = (
  id: string,
  device_screen: DEVICE | undefined,
  elements: IElementObj | null,
  elementPosition?: IElementPosition
) => {
  if (!elements && !elementPosition) {
    return getElementBoundingClientRect(id).y || 0;
  }
  if (
    elementPosition &&
    device_screen &&
    (elementPosition as IElementPosition)[device_screen][id]
  ) {
    return (elementPosition as IElementPosition)[device_screen][id].top;
  }
  let element = getElement(
    elements as IElementObj,
    id,
    !1
  ) as Partial<IElement>;
  return (
    (device_screen &&
      parseFloatLadi(element[device_screen]?.style?.top || 0)) ||
    0
  );
};

export const getTopHeightElement = (
  id: string,
  device_screen: DEVICE,
  elements: IElementObj | null
) => {
  return (
    getTopElement(id, device_screen, null) +
    getHeightElement(id, device_screen, elements)
  );
};

export const getElementBoundingClientRect = (id: string) => {
  var t = document.getElementById(id)?.getBoundingClientRect();
  return {
    y: t?.y,
    left: t?.left,
  };
};

export const getListSectionInScreen = (
  elements: IElementObj,
  device_screen: DEVICE
) => {
  const listSection = getElementNoParent(elements, device_screen, !1);
  const result: string[] = [];
  const builderScrollY = getBuilderEditorScrollY();
  const builderEditorHeight = getBuilderEditorHeight();
  return (
    listSection.forEach(function (id) {
      const top = getTopElement(id, device_screen, null);
      const section = getElement(elements, id, !1) as Partial<IElement>;
      const height = parseFloatLadi(section[device_screen]?.style?.height || 0);
      ((top >= builderScrollY && top <= builderScrollY + builderEditorHeight) ||
        (top + height >= builderScrollY &&
          top + height <= builderScrollY + builderEditorHeight) ||
        (top < builderScrollY &&
          top + height > builderScrollY + builderEditorHeight)) &&
        result.push(id);
    }),
    result
  );
};

export const getLeftElement = (
  id: string,
  device: DEVICE,
  elements?: IElementObj
) => {
  if (isEmpty(elements)) {
    return getElementBoundingClientRect(id).left || 0;
  }
  const ele = getElement(elements as IElementObj, id, !1) as Partial<IElement>;
  return parseFloatLadi(ele[device]?.style?.left || 0) || 0;
};

export const getDataElementInSnap = (
  elements: IElementObj,
  element: Partial<IElement>,
  device: DEVICE,
  deviceObj: IDevice
) => {
  const paddingDevice = getPaddingDevice(element.id as string, deviceObj),
    top = getTopElement(element.id as string, device, null),
    left =
      getLeftElement(element.id as string, device, elements) + paddingDevice,
    width = parseFloatLadi(element[device]?.style?.width || 0),
    height = parseFloatLadi(element[device]?.style?.height || 0);
  return {
    id: element.id as string,
    top: top,
    left: left,
    width,
    height,
    topheight: top + height,
    leftwidth: left + width,
    topheightcenter: top + height / 2,
    leftwidthcenter: left + width / 2,
    element,
  };
};

export const editorTextElement = (id: string) => {
  const ele = document.getElementById(id);
  if (ele) {
    const childEle = document.querySelectorAll(
      '.ladi-headline, .ladi-paragraph, .ladi-list-paragraph ul'
    )[0] as HTMLElement;
    if (childEle) {
      let newEle = childEle;
      do {
        newEle = newEle.parentElement as HTMLElement;
      } while (!newEle.classList.contains('ladi-element'));
      newEle.id === id &&
        ((childEle.contentEditable = 'true'),
        childEle.removeEventListener('paste', () => {}),
        childEle.addEventListener('paste', () => {
          console.log('paste');
        }),
        childEle.removeEventListener('input', () => {}),
        childEle.addEventListener('input', () => {
          console.log('input');
        }),
        childEle.removeEventListener('selectstart', eventSelectedText),
        childEle.addEventListener('selectstart', eventSelectedText),
        childEle.focus(),
        document.execCommand('selectAll', !1, undefined));
      eventSelectedText();
    }
  }
};

export const eventSelectedText = () => {
  const i = getSelectedText();
  console.log(i);
};

export const snapShowLine = (snapGridEnable: boolean) => {
  if (!snapGridEnable) {
    var e = document.getElementById(
        ELEMENT_ID.builder_snap_top_id
      ) as HTMLElement,
      t = document.getElementById(
        ELEMENT_ID.builder_snap_left_id
      ) as HTMLElement,
      i = document.getElementById(
        ELEMENT_ID.builder_snap_bottom_id
      ) as HTMLElement,
      n = document.getElementById(
        ELEMENT_ID.builder_snap_right_id
      ) as HTMLElement;
    e.classList.remove('ladi-hidden'),
      t.classList.remove('ladi-hidden'),
      i.classList.remove('ladi-hidden'),
      n.classList.remove('ladi-hidden');
  }
};

export const getDimensionByList = (
  list: string[],
  listElement: IElementObj,
  device: IDevice,
  elementPosition?: IElementPosition
) => {
  let n = 0,
    a = 0,
    o = 0,
    r = 0,
    l = 0,
    c = 0,
    g = !0;
  return (
    list.forEach((e) => {
      var l = getElement(listElement, e, !1) as Partial<IElement>;
      if (!isEmpty(l)) {
        var c = l[device.deviceScreen] as IElementDevice,
          d = getPaddingDevice(e, device),
          p = getTopElement(e, device.deviceScreen, null, elementPosition),
          u = getLeftElement(e, device.deviceScreen, listElement) + d,
          m = parseFloatLadiPage(c.style.width),
          v = parseFloatLadiPage(c.style.height);
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
