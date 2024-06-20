import { Pipe, PipeTransform } from '@angular/core';
import { HEADLINE_CONST } from '@constants/elements/headline-const';
import { ELEMENT_ITEM } from '@constants/enum';
import { SECTION_STRING } from '@constants/init-value';

@Pipe({
  name: 'getTypeResize',
})
export class GetTypeResizePipe implements PipeTransform {
  transform(
    value: string[],
    elementType?: ELEMENT_ITEM | typeof SECTION_STRING
  ): string[] {
    if (elementType === ELEMENT_ITEM.HEADLINE) {
      value = value.filter(
        (item) => !HEADLINE_CONST.RESIZE_EXCEPT.includes(item)
      );
    }
    return value;
  }
}
