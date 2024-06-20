import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { selectLoading } from '@states/builder';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  readonly vm$ = this.store.select(
    createSelector(selectLoading, (loading) => ({ loading }))
  );
  constructor(private store: Store) {}
}
