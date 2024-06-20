import { createFeatureSelector, createSelector } from '@ngrx/store';
import { elementSelectedId } from '@states/builder';
import { ISourceState } from './source.state';

export const selectSource = createFeatureSelector<ISourceState>('source');

export const selectElements = createSelector(
  selectSource,
  (state: ISourceState) => state.elements
);

export const selectIndexElement = createSelector(
  selectSource,
  (state: ISourceState) => state.indexElement
);

export const selectBuilderElements = createSelector(
  selectSource,
  (state: ISourceState) => state.builderElements
);

export const isHasSection = createSelector(selectElements, (elements) =>
  Object.keys(elements).some((key) => key.match(/SECTION\d+/))
);

export const selectListElementInScreen = createSelector(
  selectSource,
  (state: ISourceState) => state.listElementInScreen
);

export const selectListElementInSnap = createSelector(
  selectSource,
  (state: ISourceState) => state.listElementInSnap
);

export const selectListElementGroupTmp = createSelector(
  selectSource,
  (state: ISourceState) => state.listElementGroupTmp
);

export const selectElementSelected = createSelector(
  selectSource,
  elementSelectedId,
  (state: ISourceState, elementSelectedId) => state.elements[elementSelectedId]
);
