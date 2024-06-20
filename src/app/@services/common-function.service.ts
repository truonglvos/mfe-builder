import { Injectable, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateElementEditable, updateIsSelectText } from '@states/builder';

@Injectable({
  providedIn: 'root',
})
export class CommonFunctionService {
  constructor(private store: Store) {}

  editText(id: string, isEditing = false) {
    this.store.dispatch(updateElementEditable({ elementId: id }));
    const element = document.getElementById(id) as HTMLElement;
    const headline = element.getElementsByClassName('ladi-headline')[0];
    (headline as HTMLElement).focus();
    if (!isEditing) {
      setTimeout(() => {
        (headline as HTMLElement).focus();
        document.execCommand('selectAll', false, undefined);
        this.store.dispatch(updateIsSelectText({ isSelectText: true }));
      }, 100);
    }
  }
}
