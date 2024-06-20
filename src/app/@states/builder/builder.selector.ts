import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBuilderRuntimeState } from './builder.state';

export const selectBuilder =
  createFeatureSelector<IBuilderRuntimeState>('builder');

export const hasElementSelected = createSelector(
  selectBuilder,
  (builder) => !!builder.elementSelected,
);

export const hasElementDragging = createSelector(
  selectBuilder,
  (builder) => builder.hasElementDragging,
);

export const elementEditable = createSelector(
  selectBuilder,
  (builder) => builder.elementEditable,
);

export const elementSelectedId = createSelector(
  selectBuilder,
  (builder) => builder.elementSelected,
);

export const elementHovered = createSelector(
  selectBuilder,
  (builder) => builder.elementHovered,
);

export const sectionSelected = createSelector(
  selectBuilder,
  (builder) => builder.sectionSelected,
);

export const selectIsSelectText = createSelector(
  selectBuilder,
  (builder) => builder.isSelectText,
);

export const selectSelectStart = createSelector(
  selectBuilder,
  (builder) => builder.selectStart,
);

export const selectElementDownEditing = createSelector(
  selectBuilder,
  (builder) => builder.elementDownEditing,
);

export const selectGroupTmpState = createSelector(
  selectBuilder,
  (builder) => builder.groupTMP,
);

export const selectColorEditorState = createSelector(
  selectBuilder,
  (builder) => builder.colorEditorState,
);

export const selectFontCustomState = createSelector(
  selectBuilder,
  (builder) => builder.fontCustomState,
);

export const selectQuickEditorState = createSelector(
  selectBuilder,
  (builder) => builder.quickEditorState,
);

export const selectIdFirebase = createSelector(
  selectBuilder,
  (builder) => builder.idFirebase,
);

export const selectLoading = createSelector(
  selectBuilder,
  (builder) => builder.loading,
);

export const selectBuilderSnapVertical = createSelector(
  selectBuilder,
  (builder) => builder.builderSnapVertical,
);

export const selectBuilderSnapHorizontal = createSelector(
  selectBuilder,
  (builder) => builder.builderSnapHorizontal,
);
