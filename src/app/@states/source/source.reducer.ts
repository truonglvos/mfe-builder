import { Action, createReducer, on } from '@ngrx/store';
import { IListItemInSnap, initSourceData, ISourceState } from './source.state';
import * as fromSourceAction from './source.actions';
import { plusPx } from '../../@shares/plusPxWithNumber';
import { IElement, IElementDevice, IOptionCommon } from '@models/element.model';
import { immerOn } from 'ngrx-immer/store';
import { ELEMENT_ITEM, TYPE_DRAG } from '@constants/enum';
import {
  getDataElementInSnap,
  getElement,
  getListElementInScreen,
  getListSectionInScreen,
} from '@shares/utility';

const sourceReducer = createReducer(
  initSourceData,
  on(fromSourceAction.updateSourceElement, (state, { element }) => {
    return {
      ...state,
      elements: { ...state.elements, element },
    };
  }),
  immerOn(fromSourceAction.updateSourceElementFirst, (state, { payload }) => {
    state.elements = payload.elements;
  }),
  immerOn(fromSourceAction.updateBuilderElementFirst, (state, { payload }) => {
    state.builderElements = payload.builderElements;
  }),
  immerOn(fromSourceAction.updateHeightElement, (state, { payload }) => {
    const element = { ...state.elements[payload.id] };
    switch (payload.typeDrag) {
      case TYPE_DRAG.RESIZE_SECTION:
        const height = plusPx(
          payload.isDesktop
            ? element.desktop?.style?.height
            : element.mobile?.style?.height,
          payload.deltaY
        );
        if (payload.isDesktop) {
          (
            state.elements[`${payload.id}`].desktop as IElementDevice
          ).style.height = `${height}px`;
        } else {
          (
            state.elements[`${payload.id}`].mobile as IElementDevice
          ).style.height = `${height}px`;
        }
        break;
      case TYPE_DRAG.DRAG_ELEMENT:
        const top = plusPx(
          payload.isDesktop
            ? element.desktop?.style?.top
            : element.mobile?.style?.top,
          payload.deltaY
        );

        const left = plusPx(
          payload.isDesktop
            ? element.desktop?.style?.left
            : element.mobile?.style?.left,
          payload.deltaX
        );
        if (payload.isDesktop) {
          (
            state.elements[`${payload.id}`].desktop as IElementDevice
          ).style.top = `${top}px`;
          (
            state.elements[`${payload.id}`].desktop as IElementDevice
          ).style.left = `${left}px`;
        } else {
          (
            state.elements[`${payload.id}`].mobile as IElementDevice
          ).style.top = `${top}px`;
          (
            state.elements[`${payload.id}`].mobile as IElementDevice
          ).style.left = `${left}px`;
        }
        break;
    }
  }),
  immerOn(fromSourceAction.updateInnerHTML, (state, { payload }) => {
    (state.elements[`${payload.id}`].option as IOptionCommon).innerHTML =
      payload.value;
  }),
  immerOn(fromSourceAction.createNewElement, (state, { payload }) => {
    state.elements[payload.id] = payload.element;
    state.indexElement = state.indexElement + 1;
    if (payload.type === ELEMENT_ITEM.SECTION) {
      state.builderElements = [
        ...state.builderElements.slice(0, payload.indexSection + 1),
        { id: payload.id, childs: [] },
        ...state.builderElements.slice(payload.indexSection + 1),
      ];
    } else {
      const indexBuilderElement = state.builderElements.findIndex(
        (section) => section.id === payload.sectionAddElement
      );
      if (state.builderElements[indexBuilderElement].childs) {
        state.builderElements[indexBuilderElement].childs?.push({
          id: payload.id,
        });
      }
    }
  }),
  immerOn(fromSourceAction.updateListElementInScreen, (state, { payload }) => {
    if (payload.isAddNew) {
      state.listElementInScreen.push(payload.id as string);
    }
    if (!payload.isAddNew) {
      const listElementInScreen = getListElementInScreen(
        state.elements,
        payload.device
      );
      console.log(listElementInScreen);

      state.listElementInScreen = listElementInScreen;
      state.listElementInScreen.forEach((ele) => {
        const element = getElement(
          state.elements,
          ele,
          !1
        ) as Partial<IElement>;
        const dataElement: IListItemInSnap = getDataElementInSnap(
          state.elements,
          element as Partial<IElement>,
          payload.device,
          payload.deviceObj
        );
        state.listElementInSnap.push(dataElement);
      });
    }
  }),
  immerOn(fromSourceAction.updateListSectionInScreen, (state, { payload }) => {
    const listSectionInScreen = getListSectionInScreen(
      state.elements,
      payload.device
    );
  }),

  immerOn(fromSourceAction.updateStyleQuickEditor, (state, { payload }) => {
    const element = getElement(state.elements, payload.elementId, false);
    if (
      (element?.desktop as IElementDevice).style[payload.key] === payload.value
    ) {
      (
        state.elements[payload.elementId][payload.device] as IElementDevice
      ).style[payload.key] = '';
    } else {
      (
        state.elements[payload.elementId][payload.device] as IElementDevice
      ).style[payload.key] = payload.value;
    }
  }),

  immerOn(fromSourceAction.updateHeightElementNew, (state, { payload }) => {
    // const element = { ...state.elements[payload.id] };
    if (payload.isDesktop) {
      (
        state.elements[`${payload.id}`].desktop as IElementDevice
      ).style.height = `${payload.top}px`;
    } else {
      (
        state.elements[`${payload.id}`].mobile as IElementDevice
      ).style.height = `${payload.top}px`;
    }
  }),

  immerOn(fromSourceAction.updateListElementGroupTmp, (state, { payload }) => {
    state.listElementGroupTmp = payload.listElementGroupTmp;
  }),

  immerOn(fromSourceAction.updateListElementGroupTmp, (state, { payload }) => {
    state.listElementGroupTmp = payload.listElementGroupTmp;
  }),

  immerOn(fromSourceAction.updateColorElement, (state, { payload }) => {
    (
      state.elements[payload.elementId][
        payload.device.deviceScreen
      ] as IElementDevice
    ).style[payload.typeColor] = payload.color;
  }),

  immerOn(fromSourceAction.updateElementDimension, (state, { payload }) => {
    (
      state.elements[payload.elementId][
        payload.device.deviceScreen
      ] as IElementDevice
    ).style = {
      ...(
        state.elements[payload.elementId][
          payload.device.deviceScreen
        ] as IElementDevice
      ).style,
      ...(payload.dimension ? (payload.dimension as {}) : {}),
    };
  }),

  immerOn(fromSourceAction.updateHeadlineAfterEdit, (state, { payload }) => {
    (
      state.elements[payload.elementId][payload.device] as IElementDevice
    ).style.height = `${payload.height}px`;
    (state.elements[payload.elementId].option as IOptionCommon).innerHTML =
      payload.innerHTML;
  }),

  immerOn(fromSourceAction.updateElementIndex, (state, { indexElement }) => {
    state.indexElement = indexElement;
  }),

  immerOn(fromSourceAction.updateListElementInSnap, (state, { payload }) => {
    state.listElementInSnap = payload.listElementInSnap;
  }),

  immerOn(fromSourceAction.updateElementWhenDragMove, (state, { payload }) => {
    (
      state.elements[payload.elementId][
        payload.device.deviceScreen
      ] as IElementDevice
    ).style.top = `${payload.top}px`;
    (
      state.elements[payload.elementId][
        payload.device.deviceScreen
      ] as IElementDevice
    ).style.left = `${payload.left}px`;
  }),

  immerOn(
    fromSourceAction.updateItemInListElementInSnap,
    (state, { payload }) => {
      const index = state.listElementInSnap.findIndex(
        (item) => item.id === payload.item.id
      );
      state.listElementInSnap[index] = payload.item;
    }
  ),

  immerOn(fromSourceAction.deleteElement, (state, { payload }) => {
    const ele = getElement(state.elements, payload.elementId, !1);
    const sectionId = ele?.option?.parent;
    const sectionIndex = state.builderElements.findIndex(
      (section) => section.id === sectionId
    );
    if (sectionIndex !== -1) {
      const listChildNew =
        state.builderElements[sectionIndex].childs?.filter(
          (child) => child.id !== payload.elementId
        ) || [];
      state.builderElements[sectionIndex].childs = listChildNew;
    }
    delete state.elements[payload.elementId];
    state.elements = {
      ...state.elements,
    };
  })
);

export function reducer(state: ISourceState | undefined, action: Action) {
  return sourceReducer(state, action);
}
