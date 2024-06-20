import { DEVICE, ELEMENT_ITEM, TYPE_DRAG, RESIZE_ENUM } from '@constants/enum';
import { IDemension } from '@models/app.model';
import { IElement } from '@models/element.model';
import { createAction, props } from '@ngrx/store';
import { IColor } from '@states/builder';
import { IDevice } from '@states/menu';
import { IBuilderElement, IElementObj, IListItemInSnap } from './source.state';

export enum sourceActionConst {
  SET_LIST_ELEMENT_IN_SCREEN = '[Set BuilderEditorComponent] Set List Element In Screen',
  UPDATE_LIST_ELEMENT_IN_SCREEN = '[Update List BuilderEditorComponent] Update List Element In Screen',
  HANDLE_MOUSE_MOUSE_SELECT = '[Handle Mouse Move BuilderEditorComponent] Handle Mouse Move Select Group Tmp',
  HANDLE_GET_LIST_ELEMENT_IN_SCREEN_FIRST = '[Handle Element In Screen BuilderEditorComponent] Get List Element In Screen First',
}

export const updateBuilderElementFirst = createAction(
  '[Update BuilderEditorComponent] Update Builder Element First',
  props<{
    payload: {
      builderElements: IBuilderElement[];
    };
  }>()
);

export const updateSourceElementFirst = createAction(
  '[Update BuilderEditorComponent] Update Source Element First',
  props<{
    payload: {
      elements: IElementObj;
    };
  }>()
);

export const updateSourceElement = createAction(
  '[Update BuilderEditorComponent] Update Source Element',
  props<{ element: { [index: string]: IElement } }>()
);

export const updateHeightElement = createAction(
  '[Update BuilderEditorComponent] Update Element Height',
  props<{
    payload: {
      id: string;
      isDesktop: boolean;
      deltaY: number;
      deltaX: number;
      typeDrag: TYPE_DRAG;
    };
  }>()
);

export const updateHeightElementNew = createAction(
  '[Update BuilderEditorComponent] Update Element Height New',
  props<{
    payload: {
      id: string;
      isDesktop: boolean;
      top: number;
    };
  }>()
);

export const updateInnerHTML = createAction(
  '[Update BuilderEditorComponent] Update Inner HTML',
  props<{
    payload: {
      id: string;
      value: string;
    };
  }>()
);

export const createNewElement = createAction(
  '[Update BuilderEditorComponent] Create Element',
  props<{
    payload: {
      type: ELEMENT_ITEM;
      id: string;
      element: any;
      sectionAddElement: string;
      indexSection: number;
    };
  }>()
);

export const updateListElementInScreen = createAction(
  sourceActionConst.UPDATE_LIST_ELEMENT_IN_SCREEN,
  props<{
    payload: {
      isAddNew: boolean;
      device: DEVICE;
      deviceObj: IDevice;
      id?: string;
    };
  }>()
);

export const updateListSectionInScreen = createAction(
  '[Update BuilderEditorComponent] Update List Section In Screen',
  props<{ payload: { device: DEVICE; isAddNew: boolean } }>()
);

export const updateStyleQuickEditor = createAction(
  '[Update QuickEditor] Update Style Quick Editor',
  props<{
    payload: { device: DEVICE; elementId: string; key: string; value: string };
  }>()
);

export const updateListElementGroupTmp = createAction(
  '[Update QuickEditor] Update List Element Group Tmp',
  props<{
    payload: {
      listElementGroupTmp: string[];
    };
  }>()
);

export const setListElementInScreen = createAction(
  sourceActionConst.SET_LIST_ELEMENT_IN_SCREEN,
  props<{ payload: { isAddNew: boolean } }>()
);

export const actionNoop = createAction(
  '[Action BuilderEditorComponent] Action Noop'
);

export const updateColorElement = createAction(
  '[Update Color Element] Update Color Element',
  props<{
    payload: {
      device: IDevice;
      color: string;
      typeColor: IColor;
      elementId: string;
    };
  }>()
);

export const updateElementDimension = createAction(
  '[Update BuilderEditorComponent] Update Element Dimension',
  props<{
    payload: {
      device: IDevice;
      elementId: string;
      dimension?: Partial<IDemension>;
    };
  }>()
);

export const updateHeadlineAfterEdit = createAction(
  '[Update BuilderEditorComponent] Update Height Headline After Edit',
  props<{
    payload: {
      device: DEVICE;
      elementId: string;
      height: number;
      innerHTML: string;
    };
  }>()
);

export const updateElementIndex = createAction(
  '[Update BuilderEditorComponent] Update Element Index',
  props<{ indexElement: number }>()
);

export const updateListElementInSnap = createAction(
  '[Update BuilderEditorComponent] Update List Element In Snap',
  props<{ payload: { listElementInSnap: IListItemInSnap[] } }>()
);

export const updateElementWhenDragMove = createAction(
  '[Update BuilderEditorComponent] Update Element When Drag Move',
  props<{
    payload: { elementId: string; top: number; left: number; device: IDevice };
  }>()
);

export const updateItemInListElementInSnap = createAction(
  '[Update BuilderEditorComponent] Update Item In List Element In Snap',
  props<{
    payload: { item: IListItemInSnap };
  }>()
);

export const deleteElement = createAction(
  '[Delete BuilderEditorComponent] Delete Element',
  props<{
    payload: { elementId: string };
  }>()
);

//effect

export const handleMouseUpHold = createAction(
  '[Handle BuilderEditorComponent] Handle Mouse Up Hold'
);

export const handleMouseMoveSelect = createAction(
  sourceActionConst.HANDLE_MOUSE_MOUSE_SELECT,
  props<{
    payload: { top: number; left: number; height: number; width: number };
  }>()
);

export const handleMoveGroupTmp = createAction(
  '[Handle BuilderEditorComponent] Handle Mouse Move Group Tmp',
  props<{
    payload: { deltaY: number; deltaX: number; typeDrag: TYPE_DRAG };
  }>()
);

export const handleSetColorElement = createAction(
  '[Handle BuilderEditorComponent] Handle Set Color Element',
  props<{
    payload: { color: string };
  }>()
);

export const handleResizeElement = createAction(
  '[Handle BuilderEditorComponent] Handle Resize Element',
  props<{
    payload: { typeResize: RESIZE_ENUM; deltaY: number; deltaX: number };
  }>()
);

export const loadDataFromFirebase = createAction(
  '[Handle BuilderEditorComponent] Load Data From Firebase',
  props<{
    payload: { firebaseId: string };
  }>()
);

export const handleUpdateHeadlineAfterEdit = createAction(
  '[Handle BuilderEditorComponent] Handle Update Height Headline',
  props<{
    payload: { elementId: string; height: number; innerHTML: string };
  }>()
);

export const handleGetListElementInScreen = createAction(
  sourceActionConst.HANDLE_GET_LIST_ELEMENT_IN_SCREEN_FIRST
);

export const handleDragGroupTmpEnd = createAction(
  '[Handle BuilderEditorComponent] Handle Drag Group Tmp End'
);

export const handleDragElementEnd = createAction(
  '[Handle BuilderEditorComponent] Handle Drag Element End'
);

export const handleMouseUpCommon = createAction(
  '[Handle BuilderEditorComponent] Handle Mouse Up Common'
);

export const handleDeleteElement = createAction(
  '[Handle BuilderEditorComponent] Handle Delete ELement'
);

export const handleDragElementMove = createAction(
  '[Handle BuilderEditorComponent] Handle Drag Element Move',
  props<{
    payload: {
      elementId: string;
      deltaY: number;
      deltaX: number;
      typeDrag: TYPE_DRAG;
    };
  }>()
);
