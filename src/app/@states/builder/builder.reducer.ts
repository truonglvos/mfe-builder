import { Action, createReducer } from '@ngrx/store';
import { IBuilderRuntimeState, initBuilderState } from './builder.state';
import { immerOn } from 'ngrx-immer/store';
import * as fromBuilderActions from './builder.actions';

const builderReducer = createReducer(
  initBuilderState,
  immerOn(
    fromBuilderActions.updateElementSelected,
    (state, { elementId, resetSectionSelected }) => {
      state.elementSelected = elementId;
      if (resetSectionSelected) {
        state.sectionSelected = '';
      }
    },
  ),
  immerOn(fromBuilderActions.updateElementHovered, (state, { elementId }) => {
    state.elementHovered = elementId;
  }),
  immerOn(fromBuilderActions.updateSectionSelected, (state, { sectionId }) => {
    state.elementSelected = '';
    state.sectionSelected = sectionId;
    state.elementEditable = '';
  }),
  immerOn(
    fromBuilderActions.updateHasElementDragging,
    (state, { hasElementDragging }) => {
      state.hasElementDragging = hasElementDragging;
    },
  ),
  immerOn(fromBuilderActions.updateWindowClient, (state, { payload }) => {
    state.clientConfig.width = payload.width;
    state.clientConfig.height = payload.height;
  }),
  immerOn(fromBuilderActions.updateElementEditable, (state, { elementId }) => {
    state.elementEditable = elementId;
  }),
  immerOn(fromBuilderActions.updateIsSelectText, (state, { isSelectText }) => {
    state.isSelectText = isSelectText;
  }),
  immerOn(fromBuilderActions.updateSelectStart, (state, { selectStart }) => {
    state.selectStart = selectStart;
  }),
  immerOn(fromBuilderActions.updateElementIsDragging, (state, { payload }) => {
    state.elementIsDragging = payload.elementIsDragging;
  }),
  immerOn(
    fromBuilderActions.updateElementDownUpEditing,
    (state, { payload }) => {
      state.elementDownEditing = payload.elementDownEditing;
    },
  ),
  immerOn(fromBuilderActions.updateMouseMoveSelected, (state, { payload }) => {
    state.mouseMoveSelected = payload.mouseMoveSelected;
  }),
  immerOn(fromBuilderActions.updateBuilderMouseHold, (state, { payload }) => {
    if (payload.top || payload.top === 0) {
      state.builderMouseHold.top = payload.top;
    }
    if (payload.left || payload.left === 0) {
      state.builderMouseHold.left = payload.left;
    }
    if (payload.width || payload.width === 0) {
      state.builderMouseHold.width = payload.width;
    }
    if (payload.height || payload.height === 0) {
      state.builderMouseHold.height = payload.height;
    }
  }),
  immerOn(fromBuilderActions.updateGroupTmpState, (state, { payload }) => {
    state.groupTMP = {
      ...state.groupTMP,
      ...payload,
    };
  }),
  immerOn(fromBuilderActions.updateTypeColor, (state, { payload }) => {
    state.colorEditorState = payload.colorEditorState;
  }),

  immerOn(fromBuilderActions.updateFontCustomState, (state, { payload }) => {
    state.fontCustomState = payload.fontCustomState;
  }),

  immerOn(fromBuilderActions.updateQuickEditorState, (state, { payload }) => {
    state.quickEditorState = {
      ...state.quickEditorState,
      ...payload.quickEditorState,
    };
  }),

  immerOn(fromBuilderActions.updateIdDocumentFirebase, (state, { payload }) => {
    state.idFirebase = payload.idFirebase;
  }),

  immerOn(fromBuilderActions.updateLoading, (state, { payload }) => {
    state.loading = payload.loading;
  }),

  immerOn(
    fromBuilderActions.updateBuilderSnapVertical,
    (state, { payload }) => {
      state.builderSnapVertical = {
        ...state.builderSnapVertical,
        ...payload,
      };
    },
  ),

  immerOn(
    fromBuilderActions.updateBuilderSnapHorizontal,
    (state, { payload }) => {
      state.builderSnapHorizontal = {
        ...state.builderSnapHorizontal,
        ...payload,
      };
    },
  ),
);

export function reducer(
  state: IBuilderRuntimeState | undefined,
  action: Action,
) {
  return builderReducer(state, action);
}
