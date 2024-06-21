import { Injectable } from '@angular/core';
import { DEVICE, RESIZE_ENUM } from '@constants/enum';
import { INDEX_START, QUICK_EDITOR_HEIGHT } from '@constants/init-value';
import { IDemension, ILandingFirebaseItem } from '@models/app.model';
import { IElement, IElementDevice } from '@models/element.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { plusPx } from '@shares/plusPxWithNumber';
import {
  copy,
  getDimensionByList,
  getElement,
  getLeftElement,
  getPaddingDevice,
  getTopElement,
  parseFloatLadi,
  parseFloatLadiPage,
} from '@shares/utility';
import {
  elementSelectedId,
  handleListElementInSnap,
  handleShowQuickEditor,
  selectBuilderSnapHorizontal,
  selectBuilderSnapVertical,
  selectColorEditorState,
  selectGroupTmpState,
  updateBuilderSnapHorizontal,
  updateBuilderSnapVertical,
  updateElementSelected,
  updateGroupTmpState,
  updateLoading,
  updateQuickEditorState,
} from '@states/builder';
import { selectDevice, selectMenu } from '@states/menu';
import { finalize, map, switchMap, take, tap, timeout } from 'rxjs';
import {
  actionNoop,
  handleMouseMoveSelect,
  handleMouseUpHold,
  handleMoveGroupTmp,
  handleSetColorElement,
  handleResizeElement,
  sourceActionConst,
  updateHeightElement,
  updateListElementGroupTmp,
  updateListElementInScreen,
  updateColorElement,
  updateElementDimension,
  loadDataFromFirebase,
  updateSourceElementFirst,
  updateBuilderElementFirst,
  handleGetListElementInScreen,
  handleUpdateHeadlineAfterEdit,
  updateHeadlineAfterEdit,
  handleDragGroupTmpEnd,
  updateElementIndex,
  updateListElementInSnap,
  handleDragElementMove,
  updateElementWhenDragMove,
  updateItemInListElementInSnap,
  handleMouseUpCommon,
  handleDeleteElement,
  deleteElement,
  handleDragElementEnd,
} from './source.actions';
import {
  selectBuilderElements,
  selectElements,
  selectElementSelected,
  selectListElementGroupTmp,
  selectListElementInScreen,
  selectListElementInSnap,
} from './source.selector';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StateComponentService } from '@services/state-component.service';
import {
  IBuilderElement,
  IListItemInSnap,
  IListItemSnapBinding,
} from './source.state';
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class SourceEffect {
  updateSectionSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sourceActionConst.SET_LIST_ELEMENT_IN_SCREEN),
      concatLatestFrom((action) => this.store.select(selectMenu)),
      map(([action, selectMenu]) =>
        updateListElementInScreen({
          payload: {
            device: selectMenu.device.deviceScreen,
            isAddNew: false,
            deviceObj: selectMenu.device,
          },
        })
      )
    )
  );

  handleMouseMoveSelect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleMouseMoveSelect),
      concatLatestFrom(() => [
        this.store.select(selectMenu),
        this.store.select(selectElements),
        this.store.select(selectListElementInScreen),
      ]),
      map(([action, selectMenu, listElement, listElementInScreen]) => {
        const listElementGroupTmp: string[] = [];
        listElementInScreen.forEach((eleId) => {
          const elen = getElement(listElement, eleId, !0) as Partial<IElement>;
          if (!elen) {
            return;
          }
          var s = elen[selectMenu.device.deviceScreen] as IElementDevice,
            l = getPaddingDevice(eleId, selectMenu.device),
            d = getTopElement(
              eleId,
              selectMenu.device.deviceScreen,
              listElement,
              this.runtime.runtime.position_element
            ),
            p =
              getLeftElement(
                eleId,
                selectMenu.device.deviceScreen,
                listElement
              ) + l,
            u = parseFloatLadiPage(s.style.width),
            g = parseFloatLadiPage(s.style.height);

          const e = (
            action as {
              payload: IDemension;
            }
          ).payload;
          if (
            e.top < d + g &&
            e.top + e.height - 56 > d &&
            e.left < p + u &&
            e.left + e.width > p
          ) {
            listElementGroupTmp.push(eleId);
          }
        });
        return updateListElementGroupTmp({
          payload: {
            listElementGroupTmp,
          },
        });
      })
    )
  );

  handleMouseUpHold$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleMouseUpHold),
      concatLatestFrom(() => [
        this.store.select(selectListElementGroupTmp),
        this.store.select(selectElements),
        this.store.select(selectMenu),
      ]),
      map(([_, listElementGroupTmp, listElement, selectMenu]) => {
        if (listElementGroupTmp.length === 1) {
          this.store.dispatch(
            updateElementSelected({ elementId: listElementGroupTmp[0] })
          );
          this.store.dispatch(
            handleShowQuickEditor({
              payload: { elementId: listElementGroupTmp[0] },
            })
          );
          return updateListElementGroupTmp({
            payload: {
              listElementGroupTmp: [],
            },
          });
        }
        if (listElementGroupTmp.length > 1) {
          const demension = getDimensionByList(
            listElementGroupTmp,
            listElement,
            selectMenu.device,
            this.runtime.runtime.position_element
          );
          this.store.dispatch(
            updateGroupTmpState({
              payload: {
                show: true,
                ...demension,
                top: demension.top - this.runtime.runtime.builder_menu_top,
              },
            })
          );
          this.store.dispatch(
            updateQuickEditorState({
              payload: {
                quickEditorState: {
                  show: true,
                  top:
                    demension.top -
                    QUICK_EDITOR_HEIGHT -
                    5 -
                    this.runtime.runtime.builder_menu_top,
                  left: demension.left,
                },
              },
            })
          );
        }

        return updateListElementGroupTmp({
          payload: {
            listElementGroupTmp: listElementGroupTmp,
          },
        });
      })
    )
  );

  handleDragGroupTmp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleMoveGroupTmp),
      concatLatestFrom(() => [
        this.store.select(selectDevice),
        this.store.select(selectListElementGroupTmp),
        this.store.select(selectGroupTmpState),
      ]),
      map(([action, device, listElementGroupTmp, groupTmpState]) => {
        const data = action.payload;
        this.store.dispatch(
          updateGroupTmpState({
            payload: {
              ...groupTmpState,
              top: groupTmpState.top + data.deltaY,
              left: groupTmpState.left + data.deltaX,
            },
          })
        );
        listElementGroupTmp.forEach((id) => {
          if (this.runtime.runtime.position_element[device.deviceScreen][id]) {
            delete this.runtime.runtime.position_element[device.deviceScreen][
              id
            ];
          }
          this.store.dispatch(
            updateHeightElement({
              payload: {
                id: id,
                isDesktop: device.deviceScreen === 'desktop',
                ...data,
              },
            })
          );
        });
        return actionNoop();
      })
    )
  );

  handleSetColorElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleSetColorElement),
      concatLatestFrom(() => [
        this.store.select(selectDevice),
        this.store.select(selectColorEditorState),
        this.store.select(elementSelectedId),
      ]),
      map(([action, device, colorEditorState, elementId]) => {
        return updateColorElement({
          payload: {
            device,
            color: action.payload.color,
            typeColor: colorEditorState.colorType,
            elementId,
          },
        });
      })
    )
  );

  handleResizeElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleResizeElement),
      concatLatestFrom(() => [
        this.store.select(selectDevice),
        this.store.select(elementSelectedId),
        this.store.select(selectElementSelected),
      ]),
      map(([action, device, elementId, elementSelected]) => {
        if (
          this.runtime.runtime.position_element[device.deviceScreen][elementId]
        ) {
          delete this.runtime.runtime.position_element[device.deviceScreen][
            elementId
          ];
        }

        let dimension = {};
        if (action.payload.typeResize === RESIZE_ENUM.LADI_E_RESIZE) {
          dimension = {
            ...dimension,
            width:
              plusPx(
                elementSelected[device.deviceScreen]?.style.width,
                action.payload.deltaX
              ) + 'px',
          };
        }
        if (action.payload.typeResize === RESIZE_ENUM.LADI_W_RESIZE) {
          dimension = {
            ...dimension,
            width:
              plusPx(
                elementSelected[device.deviceScreen]?.style.width,
                action.payload.deltaX,
                -1
              ) + 'px',
            left:
              plusPx(
                elementSelected[device.deviceScreen]?.style.left,
                action.payload.deltaX
              ) + 'px',
          };
        }
        if (action.payload.typeResize === RESIZE_ENUM.LADI_N_RESIZE) {
          dimension = {
            ...dimension,
            height:
              plusPx(
                elementSelected[device.deviceScreen]?.style.height,
                action.payload.deltaY,
                -1
              ) + 'px',
            top:
              plusPx(
                elementSelected[device.deviceScreen]?.style.top,
                action.payload.deltaY
              ) + 'px',
          };
        }
        if (action.payload.typeResize === RESIZE_ENUM.LADI_S_RESIZE) {
          dimension = {
            ...dimension,
            height:
              plusPx(
                elementSelected[device.deviceScreen]?.style.height,
                action.payload.deltaY
              ) + 'px',
          };
        }
        return updateElementDimension({
          payload: {
            device,
            elementId,
            dimension,
          },
        });
      })
    )
  );

  loadDataFromFirebase$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadDataFromFirebase),
        switchMap((action) => {
          this.store.dispatch(updateLoading({ payload: { loading: true } }));
          return this.afs
            .doc<ILandingFirebaseItem>(
              `landing-page/${action.payload.firebaseId}`
            )
            .valueChanges()
            .pipe(
              timeout(5000),
              take(1),
              finalize(() =>
                this.store.dispatch(
                  updateLoading({ payload: { loading: false } })
                )
              )
            );
        }),
        map((data) => {
          this.store.dispatch(
            updateElementIndex({
              indexElement: (data?.indexElement as number) || INDEX_START,
            })
          );
          const source = data?.source ? JSON.parse(data?.source) : {};
          const builderElements: IBuilderElement[] = data?.builderSource
            ? JSON.parse(data?.builderSource)
            : [];
          let sectionHeight = {
            [DEVICE.DESKTOP]: 0,
            [DEVICE.MOBILE]: 0,
          };
          this.store.dispatch(
            updateSourceElementFirst({
              payload: {
                elements: source,
              },
            })
          );
          this.store.dispatch(
            updateBuilderElementFirst({
              payload: {
                builderElements: data?.builderSource
                  ? JSON.parse(data?.builderSource)
                  : [],
              },
            })
          );
          this.runtime.data.elements = copy(source);
          setTimeout(() => {
            builderElements.forEach((section) => {
              section.childs?.forEach((item) => {
                const ele = getElement(
                  this.runtime.data.elements,
                  item.id,
                  !1
                ) as IElement;
                if (ele?.id) {
                  this.runtime.runtime.position_element[DEVICE.DESKTOP][
                    ele.id
                  ] = {
                    top: getTopElement(ele.id, undefined, null, undefined),
                    left: parseFloatLadi(ele[DEVICE.DESKTOP]?.style?.left),
                    width: parseFloatLadi(ele[DEVICE.DESKTOP]?.style?.width),
                    height: parseFloatLadi(ele[DEVICE.DESKTOP]?.style?.height),
                    topAbsolute: parseFloatLadi(
                      ele[DEVICE.DESKTOP]?.style?.top
                    ),
                  };
                  this.runtime.runtime.position_element[DEVICE.MOBILE][ele.id] =
                    {
                      top: getTopElement(ele.id, undefined, null, undefined),
                      left: parseFloatLadi(ele[DEVICE.MOBILE]?.style?.left),
                      width: parseFloatLadi(ele[DEVICE.MOBILE]?.style?.width),
                      height: parseFloatLadi(ele[DEVICE.MOBILE]?.style?.height),
                      topAbsolute: parseFloatLadi(
                        ele[DEVICE.MOBILE]?.style?.top
                      ),
                    };
                }
              });
              const sectionElement = getElement(
                this.runtime.data.elements,
                section.id,
                !1
              ) as IElement;

              sectionHeight = {
                desktop:
                  sectionHeight[DEVICE.DESKTOP] +
                  parseFloatLadi(sectionElement[DEVICE.DESKTOP].style.height),
                mobile:
                  sectionHeight[DEVICE.MOBILE] +
                  parseFloatLadi(sectionElement[DEVICE.MOBILE].style.height),
              };
            });

            this.store.dispatch(handleGetListElementInScreen());
            this.store.dispatch(handleListElementInSnap());
          });
        })
      ),
    { dispatch: false }
  );

  handleGetListElementInScreen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleGetListElementInScreen),
      concatLatestFrom(() => [this.store.select(selectDevice)]),
      map(([action, deviceObj]) => {
        return updateListElementInScreen({
          payload: {
            isAddNew: false,
            device: deviceObj.deviceScreen,
            deviceObj,
          },
        });
      })
    )
  );

  handleUpdateHeadlineAfterEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleUpdateHeadlineAfterEdit),
      concatLatestFrom(() => [this.store.select(selectDevice)]),
      map(([action, deviceObj]) => {
        return updateHeadlineAfterEdit({
          payload: {
            device: deviceObj.deviceScreen,
            elementId: action.payload.elementId,
            height: parseFloatLadi(action.payload.height),
            innerHTML: action.payload.innerHTML,
          },
        });
      })
    )
  );

  handleDragGroupTmpEnd$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(handleDragGroupTmpEnd),
        concatLatestFrom(() => [
          this.store.select(selectListElementGroupTmp),
          this.store.select(selectDevice),
          this.store.select(selectElements),
        ]),
        map(([action, listGroupTmp, device, listElement]) => {
          listGroupTmp.forEach((id) => {
            this.runtime.setPositionElement(id, device, listElement);
            this.store.dispatch(
              updateItemInListElementInSnap({
                payload: {
                  item: this.runtime.getElementInSnapValue(
                    id,
                    device,
                    listElement
                  ),
                },
              })
            );
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  handleDragElementEnd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleDragElementEnd),
      concatLatestFrom(() => [
        this.store.select(elementSelectedId),
        this.store.select(selectDevice),
        this.store.select(selectElements),
      ]),
      map(([action, id, device, listElement]) => {
        console.log(id);

        this.runtime.setPositionElement(id, device, listElement);
        return updateItemInListElementInSnap({
          payload: {
            item: this.runtime.getElementInSnapValue(
              id,
              device,
              listElement,
              true
            ),
          },
        });
      })
    )
  );

  handleListElementInSnap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleListElementInSnap),
      concatLatestFrom(() => [
        this.store.select(selectDevice),
        this.store.select(selectListElementInScreen),
        this.store.select(selectElements),
      ]),
      map(([_, device, listElementInScreen, listElement]) => {
        const listElementInSnap: IListItemInSnap[] = [];
        listElementInScreen.forEach((elementId) => {
          listElementInSnap.push(
            this.runtime.getElementInSnapValue(elementId, device, listElement)
          );
        });
        return updateListElementInSnap({ payload: { listElementInSnap } });
      })
    )
  );

  handleDragElementMove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleDragElementMove),
      concatLatestFrom(() => [
        this.store.select(selectDevice),
        this.store.select(selectElements),
        this.store.select(selectListElementInSnap),
        this.store.select(selectBuilderSnapVertical),
        this.store.select(selectBuilderSnapHorizontal),
      ]),
      map(
        ([
          action,
          device,
          listElement,
          listElementInSnap,
          builderSnapVertical,
          builderSnapHorizontal,
        ]) => {
          const ele = getElement(
            listElement,
            action.payload.elementId,
            !1
          ) as IElement;
          const itemSnapValue: IListItemInSnap = copy(
            this.runtime.getElementInSnapValue(
              action.payload.elementId,
              device,
              listElement,
              true
            )
          );
          let top = plusPx(
            ele[device.deviceScreen]?.style.top,
            action.payload.deltaY
          );
          let left = plusPx(
            ele[device.deviceScreen]?.style.left,
            action.payload.deltaX
          );
          let listItemSnapBindingVertical: IListItemSnapBinding[] = [];
          let listItemSnapBindingHorizontal: IListItemSnapBinding[] = [];
          let leftBuilderSnap = 0;
          let topBuilderSnap = 0;
          listElementInSnap.forEach((item) => {
            if (item.id === action.payload.elementId) {
              return;
            }
            // snap left
            if (
              Math.abs(
                item.left + action.payload.deltaX - itemSnapValue.left
              ) <= this.runtime.const.WIDTH_SNAP
            ) {
              left = item.left;
              leftBuilderSnap = left + getPaddingDevice('', device);
              listItemSnapBindingVertical.push({ ...item, type: 'left' });
            }
            if (
              Math.abs(
                itemSnapValue.leftwidthcenter +
                  action.payload.deltaX -
                  item.leftwidthcenter
              ) <= this.runtime.const.WIDTH_SNAP
            ) {
              left = item.left + (item.width - itemSnapValue.width) / 2;
              leftBuilderSnap =
                itemSnapValue.leftwidthcenter + getPaddingDevice('', device);
              listItemSnapBindingVertical.push({
                ...item,
                type: 'left_width_center',
              });
            }
            if (
              Math.abs(
                itemSnapValue.leftwidth + action.payload.deltaX - item.leftwidth
              ) <= this.runtime.const.WIDTH_SNAP
            ) {
              left = item.left + item.width - itemSnapValue.width;
              leftBuilderSnap = item.leftwidth + getPaddingDevice('', device);
              listItemSnapBindingVertical.push({
                ...item,
                type: 'left_width',
              });
            }

            if (
              Math.abs(
                itemSnapValue.left + action.payload.deltaX - item.leftwidth
              ) <= this.runtime.const.WIDTH_SNAP
            ) {
              left = item.leftwidth;
              leftBuilderSnap = item.leftwidth + getPaddingDevice('', device);
              listItemSnapBindingVertical.push({
                ...item,
                type: 'left_width',
              });
            }
            if (
              Math.abs(
                itemSnapValue.leftwidth + action.payload.deltaX - item.left
              ) <= this.runtime.const.WIDTH_SNAP
            ) {
              left = item.left - itemSnapValue.width;
              leftBuilderSnap = item.left + getPaddingDevice('', device);
              listItemSnapBindingVertical.push({
                ...item,
                type: 'left_width',
              });
            }

            // snap top

            if (
              Math.abs(item.top + action.payload.deltaY - itemSnapValue.top) <=
              this.runtime.const.WIDTH_SNAP
            ) {
              const ele = getElement(listElement, item.id, !1) as IElement;
              top = parseFloatLadi(ele[device.deviceScreen].style.top);
              topBuilderSnap = item.top;
              listItemSnapBindingHorizontal.push({
                ...item,
                type: 'top',
              });
            }
            if (
              Math.abs(
                item.topheight + action.payload.deltaY - itemSnapValue.topheight
              ) <= this.runtime.const.WIDTH_SNAP
            ) {
              const ele = getElement(listElement, item.id, !1) as IElement;
              top =
                parseFloatLadi(ele[device.deviceScreen].style.top) +
                item.height -
                itemSnapValue.height;
              topBuilderSnap = item.topheight;
              listItemSnapBindingHorizontal.push({
                ...item,
                type: 'top',
              });
            }
            if (
              Math.abs(
                item.topheightcenter +
                  action.payload.deltaY -
                  itemSnapValue.topheightcenter
              ) <= this.runtime.const.WIDTH_SNAP
            ) {
              const ele = getElement(listElement, item.id, !1) as IElement;
              top =
                parseFloatLadi(ele[device.deviceScreen].style.top) +
                (item.height - itemSnapValue.height) / 2;
              topBuilderSnap = item.topheightcenter;
              listItemSnapBindingHorizontal.push({
                ...item,
                type: 'top',
              });
            }
          });
          if (listItemSnapBindingVertical.length === 0) {
            this.store.dispatch(
              updateBuilderSnapVertical({ payload: { show: false } })
            );
          }
          if (listItemSnapBindingHorizontal.length === 0) {
            this.store.dispatch(
              updateBuilderSnapHorizontal({
                payload: { show: false },
              })
            );
          }
          if (listItemSnapBindingVertical.length > 0) {
            let top = 0;
            let height = 0;
            if (itemSnapValue.top > listItemSnapBindingVertical[0].topheight) {
              top = listItemSnapBindingVertical[0].topheight;
              height =
                itemSnapValue.top - listItemSnapBindingVertical[0].topheight;
            }
            if (listItemSnapBindingVertical[0].top > itemSnapValue.topheight) {
              top = itemSnapValue.topheight;
              height =
                listItemSnapBindingVertical[0].top - itemSnapValue.topheight;
            }
            this.store.dispatch(
              updateBuilderSnapVertical({
                payload: {
                  show: true,
                  left: leftBuilderSnap,
                  top,
                  height: parseFloatLadi(height),
                },
              })
            );
          }
          if (listItemSnapBindingHorizontal.length > 0) {
            let left = 0;
            let width = 0;
            if (
              itemSnapValue.left > listItemSnapBindingHorizontal[0].leftwidth
            ) {
              left = listItemSnapBindingHorizontal[0].leftwidth;
              width =
                itemSnapValue.left - listItemSnapBindingHorizontal[0].leftwidth;
            }
            if (
              listItemSnapBindingHorizontal[0].left > itemSnapValue.leftwidth
            ) {
              left = itemSnapValue.leftwidth;
              width =
                listItemSnapBindingHorizontal[0].left - itemSnapValue.leftwidth;
            }
            this.store.dispatch(
              updateBuilderSnapHorizontal({
                payload: {
                  show: true,
                  left: left + getPaddingDevice('', device),
                  top: topBuilderSnap,
                  width,
                },
              })
            );
          }
          this.store.dispatch(
            updateElementWhenDragMove({
              payload: {
                elementId: action.payload.elementId,
                top,
                left,
                device,
              },
            })
          );
          return actionNoop();
        }
      )
    )
  );

  handleMouseUpCommon$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(handleMouseUpCommon),
        concatLatestFrom(() => [
          this.store.select(selectBuilderSnapVertical),
          this.store.select(selectBuilderSnapHorizontal),
        ]),
        tap(([_, builderSnapVertical, builderSnapHorizontal]) => {
          if (builderSnapVertical.show) {
            this.store.dispatch(
              updateBuilderSnapVertical({ payload: { show: false } })
            );
          }
          if (builderSnapHorizontal.show) {
            this.store.dispatch(
              updateBuilderSnapHorizontal({ payload: { show: false } })
            );
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  handleDeleteElement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(handleDeleteElement),
      concatLatestFrom(() => [
        this.store.select(elementSelectedId),
        this.store.select(selectElements),
        this.store.select(selectBuilderElements),
      ]),
      map(([_, elementId]) => {
        this.store.dispatch(updateElementSelected({ elementId: '' }));
        this.store.dispatch(
          updateQuickEditorState({
            payload: { quickEditorState: { show: false } },
          })
        );
        if (this.runtime.runtime.position_element[DEVICE.DESKTOP][elementId]) {
          delete this.runtime.runtime.position_element[DEVICE.DESKTOP][
            elementId
          ];
          delete this.runtime.runtime.position_element[DEVICE.MOBILE][
            elementId
          ];
        }
        return deleteElement({ payload: { elementId: 'HEADLINE12' } });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private afs: AngularFirestore,
    private runtime: StateComponentService
  ) {}
}
