import { createAction, props } from '@ngrx/store';
import { IColor } from './builder.state';

export enum builderActionConst {
  HANDLE_MOUSE_MOVE_SELECT = '[Handle BuilderEditorComponent] Handle Mouse Move Select',
}

export const updateElementSelected = createAction(
  '[Update BuilderEditorComponent] Update Element Selected',
  props<{ elementId: string; resetSectionSelected?: boolean }>(),
);

export const updateElementHovered = createAction(
  '[Update BuilderEditorComponent] Update Element Hovered',
  props<{ elementId: string }>(),
);

export const updateSectionSelected = createAction(
  '[Update BuilderEditorComponent] Update Section Selected',
  props<{ sectionId: string }>(),
);

export const updateHasElementDragging = createAction(
  '[Update BuilderEditorComponent] Update Has Element Dragging',
  props<{ hasElementDragging: boolean }>(),
);

export const updateWindowClient = createAction(
  '[Update BuilderEditorComponent] Update Window Client',
  props<{
    payload: {
      width: number;
      height: number;
    };
  }>(),
);

export const updateElementEditable = createAction(
  '[Update BuilderEditorComponent] Update Element Editable',
  props<{ elementId: string }>(),
);

export const updateIsSelectText = createAction(
  '[Update BuilderEditorComponent] Update Is Selected Text',
  props<{ isSelectText: boolean }>(),
);

export const updateSelectStart = createAction(
  '[Update BuilderEditorComponent] Update Is Selecte Start',
  props<{ selectStart: boolean }>(),
);

export const updateElementDownUpEditing = createAction(
  '[Update BuilderEditorComponent] Update Element Down Editing',
  props<{
    payload: {
      elementDownEditing: boolean;
    };
  }>(),
);

export const updateMouseMoveSelected = createAction(
  '[Update BuilderEditorComponent] Update Mouse Move Selected',
  props<{
    payload: {
      mouseMoveSelected: boolean;
    };
  }>(),
);

export const updateBuilderMouseHold = createAction(
  '[Update BuilderEditorComponent] Update Builder Mouse Hold',
  props<{
    payload: {
      top?: number;
      left?: number;
      height?: number;
      width?: number;
    };
  }>(),
);

export const handleMouseMoveSelect = createAction(
  builderActionConst.HANDLE_MOUSE_MOVE_SELECT,
  props<{
    payload: {
      top: number;
      left: number;
      height: number;
      width: number;
    };
  }>(),
);

export const updateElementIsDragging = createAction(
  '[Update BuilderEditorComponent] Update Element Down Editing',
  props<{
    payload: {
      elementIsDragging: boolean;
    };
  }>(),
);

export const updateGroupTmpState = createAction(
  '[Update BuilderEditorComponent] Update Group Tmp State',
  props<{
    payload: {
      show: boolean;
      top?: number;
      left?: number;
      width?: number;
      height?: number;
    };
  }>(),
);

export const updateTypeColor = createAction(
  '[Update BuilderEditorComponent] Update Type Color',
  props<{
    payload: {
      colorEditorState: {
        colorType: IColor;
        colorDefault: string;
      };
    };
  }>(),
);

export const updateFontCustomState = createAction(
  '[Update BuilderEditorComponent] Update Font Custom State',
  props<{
    payload: {
      fontCustomState: {
        show: boolean;
      };
    };
  }>(),
);

export const updateQuickEditorState = createAction(
  '[Update BuilderEditorComponent] Update Quick Editor State',
  props<{
    payload: {
      quickEditorState: {
        show: boolean;
        top?: number;
        left?: number;
      };
    };
  }>(),
);

export const updateIdDocumentFirebase = createAction(
  '[Update BuilderEditorComponent] Update Id Document Firebase',
  props<{
    payload: {
      idFirebase: string;
    };
  }>(),
);

export const updateLoading = createAction(
  '[Update BuilderEditorComponent] Update Loading',
  props<{
    payload: {
      loading: boolean;
    };
  }>(),
);

export const updateBuilderSnapVertical = createAction(
  '[Update BuilderEditorComponent] Update Builder Snap Vertical',
  props<{
    payload: {
      show?: boolean;
      left?: number;
      top?: number;
      height?: number;
    };
  }>(),
);

export const updateBuilderSnapHorizontal = createAction(
  '[Update BuilderEditorComponent] Update Builder Snap Horizontal',
  props<{
    payload: {
      show?: boolean;
      left?: number;
      top?: number;
      width?: number;
    };
  }>(),
);

// effect
export const handleOpenColorEditor = createAction(
  '[Handle BuilderEditorComponent] Handle Open Color Editor',
  props<{
    payload: {
      colorType: IColor;
    };
  }>(),
);

export const handleShowQuickEditor = createAction(
  '[Handle BuilderEditorComponent] Handle Show Quick Editor',
  props<{
    payload: {
      elementId: string;
    };
  }>(),
);

export const handleSaveSource = createAction(
  '[Handle BuilderEditorComponent] Handle Save Source',
  props<{ payload: {} }>(),
);

export const handleListElementInSnap = createAction(
  '[Handle BuilderEditorComponent] Handle List Elementt In Snap',
);
