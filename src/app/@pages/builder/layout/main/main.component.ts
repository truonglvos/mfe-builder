import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateIdDocumentFirebase } from '@states/builder';
import { loadDataFromFirebase } from '@states/source';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private _sub = new Subscription();
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}
  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  ngOnInit(): void {
    this._sub.add(
      this.activatedRoute.paramMap.subscribe((params) => {
        if (params.has('id') && params.get('id')) {
          this.store.dispatch(
            updateIdDocumentFirebase({
              payload: { idFirebase: params.get('id') as string },
            })
          );

          this.store.dispatch(
            loadDataFromFirebase({
              payload: { firebaseId: params.get('id') as string },
            })
          );
        }
      })
    );
  }
}
