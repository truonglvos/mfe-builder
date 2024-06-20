import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DEVICE } from '@constants/enum';
import { IMenuItemStyle } from '@models/common.model';
import { Store } from '@ngrx/store';
import { CommonFunctionService } from '@services/common-function.service';
import { LadiPageScriptService } from '@services/ladi-page-script.service';
import { RuntimeService } from '@services/runtime.service';
import {
  checkSelectedRangeAll,
  getSelectedRange,
  getSelectedText,
} from '@shares/utility';
import { handleOpenColorEditor, updateFontCustomState } from '@states/builder';
import { handleDeleteElement, updateStyleQuickEditor } from '@states/source';
import { quickEditorSelector } from './quick-editor.selector';

@Component({
  selector: 'app-quick-editor',
  templateUrl: './quick-editor.component.html',
  styleUrls: ['./quick-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickEditorComponent implements OnInit {
  readonly vm$ = this.store.select(quickEditorSelector);
  fontSizeList: number[] = [
    8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72,
  ];
  fontCustomList: IMenuItemStyle[] = [
    {
      icon: 'bold',
      cssProperty: 'bold',
      label: 'In đậm',
    },
    {
      icon: 'italic',
      cssProperty: 'italic',
      label: 'In nghiêng',
    },
    {
      icon: 'underline',
      cssProperty: 'underline',
      label: 'gạch chân',
    },
    {
      icon: 'strikethrough',
      cssProperty: 'strikethrough',
      label: 'Gạch ngang',
    },
    {
      icon: 'uppercase',
      cssProperty: 'uppercase',
      label: 'In hoa',
    },
  ];
  constructor(
    private store: Store,
    private commonFunctionService: CommonFunctionService,
    private runtimeService: RuntimeService,
    private LadiPageScript: LadiPageScriptService
  ) {}

  ngOnInit(): void {}
  changeFontSize() {
    console.log(1);
  }

  editText(id: string) {
    this.commonFunctionService.editText(id);
  }

  setBoldText(id: string, event: MouseEvent) {
    event.stopPropagation();
    if (!this.LadiPageScript.isEmpty(getSelectedText())) {
      if (checkSelectedRangeAll()) {
        this.store.dispatch(
          updateStyleQuickEditor({
            payload: {
              device: DEVICE.DESKTOP,
              elementId: id,
              key: 'font-weight',
              value: 'bold',
            },
          })
        );
      } else {
        document.execCommand('bold', !1, undefined);
      }
      this.runtimeService.runtime.current_select_text_range =
        getSelectedRange();
    }
  }

  setItalicText(id: string, event: MouseEvent) {
    event.stopPropagation();
    if (!this.LadiPageScript.isEmpty(getSelectedText())) {
      if (checkSelectedRangeAll()) {
        this.store.dispatch(
          updateStyleQuickEditor({
            payload: {
              device: DEVICE.DESKTOP,
              elementId: id,
              key: 'font-style',
              value: 'italic',
            },
          })
        );
      } else {
        document.execCommand('italic', !0, undefined);
      }
      this.runtimeService.runtime.current_select_text_range =
        getSelectedRange();
    }
  }

  clickTextColor(event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(
      handleOpenColorEditor({
        payload: { colorType: 'color' },
      })
    );
  }

  clickTextBackgroundColor() {
    this.store.dispatch(
      handleOpenColorEditor({
        payload: { colorType: 'background-color' },
      })
    );
  }

  clickMenuChildFontCustom(isShowing: boolean) {
    this.store.dispatch(
      updateFontCustomState({
        payload: {
          fontCustomState: {
            show: !isShowing,
          },
        },
      })
    );
  }

  clickSetFontCustom(cssProperty: string) {
    console.log(cssProperty);
  }

  deleteElement() {
    this.store.dispatch(handleDeleteElement());
  }
}
