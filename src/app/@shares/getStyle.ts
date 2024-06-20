import { ELEMENT_ITEM } from '@constants/enum';
import { SECTION_STRING } from '@constants/init-value';
import { IStyle } from '@models/element.model';

const demensionCss = ['top', 'left', 'height', 'width'];

export function getStyleWithKeys(
  objStyle: Partial<IStyle>,
  elementType: ELEMENT_ITEM | typeof SECTION_STRING,
  styles: string[],
  isAll = true
): string {
  let styleString = '';
  if (isAll) {
    Object.keys(objStyle).forEach((style) => {
      if (objStyle[style] && !demensionCss.includes(style)) {
        styleString += `${style}: ${objStyle[style]};`;
      }
    });
  } else {
    if (elementType === ELEMENT_ITEM.HEADLINE) {
      styles = styles.filter((item) => item !== 'height');
    }
    styles.forEach((style) => {
      if (objStyle[style]) {
        styleString += `${style}: ${objStyle[style]};`;
      }
    });
  }
  return styleString;
}
