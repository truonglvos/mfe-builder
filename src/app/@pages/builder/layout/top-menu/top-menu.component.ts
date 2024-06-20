import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEVICE } from '@constants/enum';
import { Store } from '@ngrx/store';
import { handleSaveSource } from '@states/builder';
import {
  IDeviceScreen,
  selectMenu,
  toggleSnap,
  toggleTools,
  updateDevice,
  updateShowAddNew,
} from '@states/menu';
import { tap } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {
  device = DEVICE;
  selectMenu$ = this.store.select(selectMenu).pipe(tap((v) => console.log(v)));
  constructor(private store: Store) {}

  clickButtonAdd(showAddNew: boolean) {
    this.store.dispatch(updateShowAddNew({ showAddNew: !showAddNew }));
  }

  setDeviceScreen(deviceScreen: IDeviceScreen) {
    this.store.dispatch(
      updateDevice({
        payload: {
          deviceScreen,
        },
      })
    );
  }

  toggleTool() {
    this.store.dispatch(toggleTools({ active: true }));
  }

  clickToggleSnap() {
    this.store.dispatch(toggleSnap({ active: true }));
  }

  clickButtonSave() {
    this.store.dispatch(handleSaveSource({ payload: {} }));
  }
}
