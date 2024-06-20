import { Injectable } from '@angular/core';
import { QUICK_EDITOR_HEIGHT } from '@constants/init-value';
import { IElement, IElementDevice } from '@models/element.model';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { pxToNumner } from '@shares/plusPxWithNumber';
import { getElement } from '@shares/utility';
import { selectDevice } from '@states/menu';
import {
  actionNoop,
  selectBuilderElements,
  selectElements,
  selectIndexElement,
} from '@states/source';
import { map } from 'rxjs';
import {
  handleOpenColorEditor,
  handleSaveSource,
  handleShowQuickEditor,
  updateLoading,
  updateQuickEditorState,
  updateTypeColor,
} from './builder.actions';
import { elementSelectedId, selectIdFirebase } from './builder.selector';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ILandingFirebaseItem } from '@models/app.model';

@Injectable()
export class BuilderEffect {
  // updateSectionSelected$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(builderActionConst.HANDLE_MOUSE_MOVE_SELECT),
  //     concatLatestFrom((action) =>
  //       this.store.select(
  //         createSelector(
  //           selectElements,
  //           selectListElementInScreen,
  //           (listElement, listElementInScreen) => ({
  //             listElement,
  //             listElementInScreen,
  //           }),
  //         ),
  //       ),
  //     ),
  //     map(([action, data]) => {
  //       console.log(data);
  //       console.log(action);

  //       return {} as any;
  //     }),
  //   ),
  // );

  handleOpenColorEditor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleOpenColorEditor),
      concatLatestFrom(() => [
        this.store.select(elementSelectedId),
        this.store.select(selectElements),
        this.store.select(selectDevice),
      ]),
      map(([action, elementId, listElement, device]) => {
        const ele = getElement(listElement, elementId, !1) as IElement;
        let color = 'rgb(0, 0, 0)';
        if (action.payload.colorType === 'color') {
          color = (ele[device.deviceScreen] as IElementDevice).style
            ?.color as string;
        }
        if (action.payload.colorType === 'background-color') {
          color = (ele[device.deviceScreen] as IElementDevice).style
            ?.background_color as string;
        }

        return updateTypeColor({
          payload: {
            colorEditorState: {
              colorType: action.payload.colorType,
              colorDefault: color,
            },
          },
        });
      })
    )
  );

  handleShowQuickEditor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleShowQuickEditor),
      concatLatestFrom(() => [
        this.store.select(selectElements),
        this.store.select(selectBuilderElements),
        this.store.select(selectDevice),
      ]),
      map(([action, listElement, listElementBuilder, device]) => {
        const element = listElement[action.payload.elementId];
        const indexSection = listElementBuilder.findIndex(
          (section) => section.id === element.option?.parent
        );
        let sumSectionBeforeHeight = 0;
        if (indexSection > 0) {
          for (let i = 0; i < indexSection; i++) {
            sumSectionBeforeHeight += pxToNumner(
              listElement[listElementBuilder[i].id][device.deviceScreen]?.style
                .height
            );
          }
        }

        return updateQuickEditorState({
          payload: {
            quickEditorState: {
              show: true,
              top:
                pxToNumner(element[device.deviceScreen]?.style.top) -
                QUICK_EDITOR_HEIGHT -
                5 +
                sumSectionBeforeHeight,
              left: pxToNumner(element[device.deviceScreen]?.style.left),
            },
          },
        });
      })
    )
  );

  handleSaveSource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleSaveSource),
      concatLatestFrom(() => [
        this.store.select(selectElements),
        this.store.select(selectBuilderElements),
        this.store.select(selectIdFirebase),
        this.store.select(selectIndexElement),
      ]),
      map(([action, elements, builderElements, idFirebase, indexElement]) => {
        this.store.dispatch(updateLoading({ payload: { loading: true } })),
          this.afs
            .doc<ILandingFirebaseItem>(`landing-page/${idFirebase}`)
            .update({
              source: JSON.stringify(elements),
              builderSource: JSON.stringify(builderElements),
              indexElement: indexElement,
            })
            .finally(() =>
              this.store.dispatch(
                updateLoading({ payload: { loading: false } })
              )
            );
        return actionNoop();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private afs: AngularFirestore
  ) {}
}
