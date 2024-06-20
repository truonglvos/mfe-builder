import { createSelector } from '@ngrx/store';
import { sectionSelected } from '@states/builder';
import { selectDevice, selectMenu } from '@states/menu';
import { selectBuilderElements, selectIndexElement } from '@states/source';

export const leftMenuSelector = createSelector(
  selectMenu,
  selectIndexElement,
  sectionSelected,
  selectBuilderElements,
  selectDevice,
  (selectMenu, indexElement, sectionSelected, builderElements, device) => ({
    selectMenu,
    indexElement,
    sectionAddElement: sectionSelected
      ? sectionSelected
      : builderElements.length
      ? builderElements[0].id
      : '',
    device,
    sectionSelected,
  })
);
