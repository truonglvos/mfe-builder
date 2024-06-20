import { createSelector } from '@ngrx/store';
import {
  selectElements,
  selectIndexElement,
  isHasSection,
  selectBuilderElements,
  selectListElementGroupTmp,
} from '@states/source';

import { isDesktop, selectDevice, selectSnapGrid } from '@states/menu';
import {
  selectBuilder,
  selectBuilderSnapHorizontal,
  selectBuilderSnapVertical,
  selectGroupTmpState,
} from '@states/builder';

export const builderEdittor = createSelector(
  selectBuilderElements,
  selectElements,
  selectIndexElement,
  isHasSection,
  isDesktop,
  selectBuilder,
  selectDevice,
  selectSnapGrid,
  selectListElementGroupTmp,
  selectGroupTmpState,
  selectBuilderSnapVertical,
  selectBuilderSnapHorizontal,
  (
    selectBuilderElements,
    elements,
    indexElement,
    isHasSection,
    isDesktop,
    builder,
    device,
    snapGrid,
    listElementGroupTmp,
    selectGroupTmpState,
    builderSnapVertical,
    builderSnapHorizontal
  ) => ({
    selectBuilderElements,
    elements,
    indexElement,
    isHasSection,
    isDesktop,
    builder,
    device,
    snapGrid,
    listElementGroupTmp,
    selectGroupTmpState,
    builderSnapVertical,
    builderSnapHorizontal,
  })
);
