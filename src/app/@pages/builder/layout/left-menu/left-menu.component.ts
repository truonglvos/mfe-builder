import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ADD_NEW_LEFT, DEVICE, ELEMENT_ITEM } from '@constants/enum';
import {
  ELEMENT_LIST,
  LIST_SHORTCUT_MENU_ALL,
  LIST_SHORTCUT_MENU_PRIMARY,
  MENU_ADD_NEW_LEFT,
} from '@constants/menu';
import { Store } from '@ngrx/store';
import {
  IDevice,
  updateElementItemActive,
  updateMenuLeftActive,
  updateShortcutAllElementRight,
} from '@states/menu';
import { createNewElement, updateListElementInScreen } from '@states/source';
import { createElement } from '@constants/elements';
import { leftMenuSelector } from './left-menu.selector';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class LeftMenuComponent implements OnInit {
  @Output() addNewElement = new EventEmitter<{ element: any; id: string }>();
  vm$ = this.store.select(leftMenuSelector);
  menuAddNewLeft = MENU_ADD_NEW_LEFT;
  elementList = ELEMENT_LIST;
  listShortcutMenuPrimary = LIST_SHORTCUT_MENU_PRIMARY;
  listShortcutMenuAll = LIST_SHORTCUT_MENU_ALL;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  clickMenuLeftElement(menu: ADD_NEW_LEFT | undefined) {
    this.store.dispatch(
      updateMenuLeftActive({ menuLeftActive: menu as ADD_NEW_LEFT })
    );
  }

  clickElement(elementItemActive: ELEMENT_ITEM) {
    this.store.dispatch(
      updateElementItemActive({
        elementItemActive,
      })
    );
  }

  clickShortcutAllElementLoadMore(showShortcutAllElementRight: boolean) {
    this.store.dispatch(
      updateShortcutAllElementRight({
        showShortcutAllElementRight: !showShortcutAllElementRight,
      })
    );
  }

  clickShortcutAllElementMove() {}
  clickShortcutAllElement(
    type: ELEMENT_ITEM,
    indexElement: number,
    sectionAddElement: string,
    deviceObj: IDevice
  ) {
    const dataElement = createElement(
      type,
      indexElement,
      sectionAddElement || 'SECTION37',
      'section'
    );
    this.addNewElement.emit(dataElement);
    this.store.dispatch(
      createNewElement({
        payload: {
          type,
          id: dataElement?.id as string,
          element: dataElement?.element,
          sectionAddElement,
          indexSection: 0,
        },
      })
    );
    if (type !== ELEMENT_ITEM.SECTION) {
      this.store.dispatch(
        updateListElementInScreen({
          payload: {
            device: DEVICE.DESKTOP,
            isAddNew: true,
            deviceObj: deviceObj,
            id: dataElement?.id as string,
          },
        })
      );
    }
  }
}
