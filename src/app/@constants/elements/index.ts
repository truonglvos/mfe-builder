import { ELEMENT_ITEM } from '@const/enum';
import { createBox } from './box.const';
import { createButton } from './button.const';
import { createHeadline } from './headline-const';
import { createSection } from './section-const';

export const createElement = (
  type: ELEMENT_ITEM,
  index: number,
  parent?: string,
  parentType?: string,
) => {
  switch (type) {
    case ELEMENT_ITEM.HEADLINE:
      return createHeadline(index, parent as string, parentType as string);
    case ELEMENT_ITEM.SECTION:
      return createSection(index);
    case ELEMENT_ITEM.BOX:
      return createBox(index, parent as string, parentType as string);
    case ELEMENT_ITEM.BUTTON:
      return createButton(index, parent as string, parentType as string);
    default:
      return createHeadline(index, parent as string, parentType as string);
  }
};
