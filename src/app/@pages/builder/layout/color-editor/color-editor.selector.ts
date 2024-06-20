import { createSelector } from '@ngrx/store';
import { selectColorEditorState } from '@states/builder';

export const colorEditorSelector = createSelector(
  selectColorEditorState,
  (colorEditorState) => ({
    colorEditorState,
  })
);
