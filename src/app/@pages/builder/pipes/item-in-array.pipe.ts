import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemInArray',
})
export class ItemInArrayPipe implements PipeTransform {
  transform(eleId: string, arrayList: string[]): boolean {
    return arrayList.includes(eleId);
  }
}
