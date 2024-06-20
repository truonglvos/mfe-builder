import { QUICK_EDITOR_HEIGHT } from '@constants/init-value';
import { createSelector } from '@ngrx/store';
import {
  hasElementSelected,
  hasElementDragging,
  elementSelectedId,
  selectIsSelectText,
  selectFontCustomState,
  selectQuickEditorState,
} from '@states/builder';
import { isDesktop } from '@states/menu';
import {
  selectBuilderElements,
  selectElements,
  selectListElementGroupTmp,
} from '@states/source';
import { pxToNumner } from '@shares/plusPxWithNumber';

export const quickEditorSelector = createSelector(
  hasElementSelected,
  hasElementDragging,
  elementSelectedId,
  selectElements,
  isDesktop,
  selectBuilderElements,
  selectIsSelectText,
  selectFontCustomState,
  selectQuickEditorState,
  selectListElementGroupTmp,
  (
    hasElementSelected,
    hasElementDragging,
    elementSelectedId,
    elements,
    isDesktop,
    selectBuilderElements,
    isSelectText,
    fontCustomState,
    quickEditorState,
    listElementGroupTmp
  ) => {
    let quickEditorPosition = {
      top: 0,
      left: 0,
    };
    if (elementSelectedId) {
      const element = elements[elementSelectedId];
      const indexSection = selectBuilderElements.findIndex(
        (section) => section.id === element.option?.parent
      );
      let sumSectionBeforeHeight = 0;
      if (indexSection > 0) {
        for (let i = 0; i < indexSection; i++) {
          sumSectionBeforeHeight += isDesktop
            ? pxToNumner(
                elements[selectBuilderElements[i].id].desktop?.style.height
              )
            : pxToNumner(
                elements[selectBuilderElements[i].id].mobile?.style.height
              );
        }
      }
      const top = isDesktop
        ? pxToNumner(element.desktop?.style.top)
        : pxToNumner(element.mobile?.style.top);
      const left = isDesktop
        ? pxToNumner(element.desktop?.style.left)
        : pxToNumner(element.mobile?.style.left);
      const width = isDesktop
        ? pxToNumner(element.desktop?.style.width)
        : pxToNumner(element.mobile?.style.width);
      const height = isDesktop
        ? pxToNumner(element.desktop?.style.height)
        : pxToNumner(element.mobile?.style.height);
      quickEditorPosition = {
        top: top - QUICK_EDITOR_HEIGHT - 5 + sumSectionBeforeHeight,
        left,
      };
    }
    return {
      quickEditorPosition,
      showEditText: !isSelectText && !listElementGroupTmp.length,
      showEditTextRange: isSelectText && !listElementGroupTmp.length,
      elementSelectedId,
      hasElementDragging,
      fontCustomState,
      quickEditorState,
      showCreateGroup: listElementGroupTmp.length > 1,
    };
  }
);
