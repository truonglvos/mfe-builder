import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ColorPickerControl } from '@iplab/ngx-color-picker';
import { Store } from '@ngrx/store';
import { IColor, updateTypeColor } from '@states/builder';
import { colorEditorSelector } from './color-editor.selector';
import { handleSetColorElement } from '@states/source';
import {
  checkSelectedRangeAll,
  getSelectedRange,
  getSelectedText,
} from '@shares/utility';
import { LadiPageScriptService } from '@services/ladi-page-script.service';
import { RuntimeService } from '@services/runtime.service';

@Component({
  selector: 'app-color-editor',
  templateUrl: './color-editor.component.html',
  styleUrls: ['./color-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorEditorComponent {
  readonly vm$ = this.store.select(colorEditorSelector);
  colorPickerControl = new ColorPickerControl();
  constructor(
    private store: Store,
    private runtimeService: RuntimeService,
    private LadiPageScript: LadiPageScriptService
  ) {}

  closeColorEditor() {
    this.store.dispatch(
      updateTypeColor({
        payload: {
          colorEditorState: {
            colorType: 'none',
            colorDefault: 'color: rgb(0, 0, 0)',
          },
        },
      })
    );
  }

  colorChange(color: string, typeColor: IColor) {
    if (
      !this.LadiPageScript.isEmpty(getSelectedText()) &&
      typeColor === 'color'
    ) {
      if (checkSelectedRangeAll()) {
        this.store.dispatch(handleSetColorElement({ payload: { color } }));
      } else {
        document.execCommand('foreColor', !0, color);
      }
      this.runtimeService.runtime.current_select_text_range =
        getSelectedRange();
      return;
    }
    if (typeColor === 'background-color') {
      document.execCommand('backColor', !0, color);
    }
    if (typeColor === 'color') {
      this.store.dispatch(handleSetColorElement({ payload: { color } }));
    }
  }
}
