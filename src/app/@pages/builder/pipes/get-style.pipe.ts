import { Pipe, PipeTransform } from '@angular/core';
import { ELEMENT_ITEM } from '@constants/enum';
import { SECTION_STRING } from '@constants/init-value';
import { IStyle } from '@models/element.model';
import { getStyleWithKeys } from '@shares/getStyle';

@Pipe({
  name: 'getStyle',
})
export class GetStylePipe implements PipeTransform {
  transform(
    objStyle: Partial<IStyle> = {},
    elementType: ELEMENT_ITEM | typeof SECTION_STRING | undefined,
    styles: string[],
    isAll = true
  ): string {
    return getStyleWithKeys(
      objStyle,
      elementType as ELEMENT_ITEM | typeof SECTION_STRING,
      styles,
      isAll
    );
  }
}
