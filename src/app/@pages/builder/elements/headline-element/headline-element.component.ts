import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBuilderAction from '@states/builder/builder.actions';
import { elementEditable } from '@states/builder/builder.selector';
import { updateInnerHTML } from '@states/source';
import {
  checkSelectedRangeAll,
  getSelectedRange,
  getSelectedText,
  isEmpty,
} from '@shares/utility';
import { CommonFunctionService } from '@services/common-function.service';

@Component({
  selector: 'app-headline-element',
  templateUrl: './headline-element.component.html',
  styleUrls: ['./headline-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadlineElementComponent implements OnInit {
  @Input() styleString: string = '';
  @Input() innerHTML: string = '';
  @Input() elementId: string = '';
  readonly elementEditable$ = this.store.select(elementEditable);
  constructor(
    private store: Store,
    private commonFunctionService: CommonFunctionService
  ) {}

  ngOnInit(): void {}
  blur(event: FocusEvent) {
    console.log(event);
    return;
    this.store.dispatch(
      fromBuilderAction.updateElementEditable({ elementId: '' })
    );
    this.store.dispatch(
      updateInnerHTML({
        payload: {
          id: this.elementId,
          value: (event.target as HTMLElement).innerHTML,
        },
      })
    );
  }
  dbClickElement(isEditing: boolean): void {
    this.commonFunctionService.editText(this.elementId, isEditing);
  }

  mouseUp(isEditable: boolean) {
    if (isEditable) {
      setTimeout(() => {
        const textSelected = getSelectedText();
        if (isEmpty(textSelected)) {
          this.store.dispatch(
            fromBuilderAction.updateIsSelectText({ isSelectText: false })
          );
        } else {
          this.store.dispatch(
            fromBuilderAction.updateIsSelectText({ isSelectText: true })
          );
        }
      }, 1);
      this.store.dispatch(
        fromBuilderAction.updateElementDownUpEditing({
          payload: { elementDownEditing: false },
        })
      );
    }
  }

  mousedown(isEditable: boolean) {
    if (isEditable) {
      this.store.dispatch(
        fromBuilderAction.updateElementDownUpEditing({
          payload: { elementDownEditing: true },
        })
      );
    }
  }
}
