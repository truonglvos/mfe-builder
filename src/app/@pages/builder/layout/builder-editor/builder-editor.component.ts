import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DEVICE, ELEMENT_ITEM, RESIZE_ENUM, TYPE_DRAG } from '@constants/enum';
import { Store } from '@ngrx/store';
import * as fromSourceActions from '@states/source/source.actions';
import * as fromBuilderActions from '@states/builder/builder.actions';
import { builderEdittor } from './builder-editor.selector';
import {
  copy,
  isEmpty,
  parseFloatLadi,
  parseFloatLadiPage,
} from '@shares/utility';

import { createElement } from '@constants/elements';

import { debounceTime, fromEvent, last, map, Subject, takeUntil } from 'rxjs';
import { IDevice } from '@states/menu';

import { DestroyService } from '@services/destroy.service';
import { IData } from '@services/runtime.model';
import { LadiPageScriptService } from '@services/ladi-page-script.service';
import { LadipagePluginService } from '@services/ladipage-plugin.service';
import { IElement } from '@models/element.model';
import { CommonFunctionService } from '@services/common-function.service';
import { LADI_RESIZE_TYPE } from '@constants/const';
import { StateComponentService } from '@services/state-component.service';
@Component({
  selector: 'app-builder-editor',
  templateUrl: './builder-editor.component.html',
  styleUrls: ['./builder-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class BuilderEditorComponent implements OnInit, OnDestroy {
  data: IData = {
    title: '',
    description: '',
    keyword: '',
    image: '',
    favicon: '',
    is_lazyload: !0,
    is_mobile_only: !1,
    story_page: {
      // type: this.const.STORY_PAGE.none,
      is_autoplay: !1,
      autoplay_time: 10,
    },
    is_follow: !0,
    tracking_global_id: null,
    tracking_global_delay: null,
    facebook_pixel: '',
    tiktok_pixel: '',
    google_analytics_id: '',
    google_ads_id: '',
    google_tag_manager_id: '',
    before_head: '',
    before_body: '',
    font_default: '"Open Sans", sans-serif',
    adv: null,
    adv_publish: {},
    thankyou_page: {},
    is_view_content: !0,
    tracking_button_click: !0,
    shopping: {},
    device_screen: DEVICE.DESKTOP,
    width: {},
    is_snap: !1,
    is_swap_element: !1,
    is_shortcut_all_element: !1,
    snap_grid: { isEnable: !1, range: 10 },
    elements: {
      SECTION37: {
        id: 'SECTION37',
        name: 'SECTION37',
        type: 'section',
        attr: {},
        custom_class: [],
        option: {
          conversion_name: '',
          google_ads_conversion: '',
          google_ads_label: '',
          event_custom_script: '',
          section_setting: {
            is_tabs: false,
            is_selected: true,
          },
          tooltip_section_sticky: true,
          section_type: 'DEFAULT',
          background_video: {
            video_type: 'youtube',
          },
          icon_setting: {
            type: 'default',
            value_arrow: '',
            value_close: '',
            color: '#000',
          },
          is_generate_empty: false,
          is_sync: true,
          is_sort: false,
          droppable: true,
          removable: true,
          duplicate: true,
          selectable: true,
        },
        desktop: {
          option: {
            index: 37,
            sticky: false,
            sticky_position: 'top',
            sticky_position_top: '0px',
            sticky_position_bottom: '0px',
            sticky_bar_position: 'top',
            sticky_bar_position_top: '0px',
            sticky_bar_position_bottom: '0px',
            readmore_range: '0px',
            auto_scroll: false,
            'background-style': 'solid',
            overlay: {
              'background-class': ['ladi-background-auto'],
              'background-position': 'center top',
              'background-repeat': 'repeat',
            },
            hidden: false,
          },
          class: ['ladi-background-auto'],
          style: {
            height: '200px',
            'background-position': 'center top',
            'background-repeat': 'repeat',
          },
          custom_style: {},
        },
        mobile: {
          option: {
            index: 37,
            sticky: false,
            sticky_position: 'top',
            sticky_position_top: '0px',
            sticky_position_bottom: '0px',
            sticky_bar_position: 'top',
            sticky_bar_position_top: '0px',
            sticky_bar_position_bottom: '0px',
            readmore_range: '0px',
            auto_scroll: false,
            'background-style': 'solid',
            overlay: {
              'background-class': ['ladi-background-auto'],
              'background-position': 'center top',
              'background-repeat': 'repeat',
            },
            hidden: false,
          },
          class: ['ladi-background-auto'],
          style: {
            height: '150px',
            'background-position': 'center top',
            'background-repeat': 'repeat',
          },
          custom_style: {},
        },
        childs: [],
      },
      HEADLINE38: {
        id: 'HEADLINE38',
        name: 'HEADLINE38',
        type: ELEMENT_ITEM.HEADLINE,
        attr: {},
        custom_class: [],
        option: {
          data_event: [],
          action_funnel: false,
          innerHTML: 'dkm nha o<br>',
          tag_name: 'h3',
          conversion_name: '',
          google_ads_conversion: '',
          google_ads_label: '',
          event_custom_script: '',
          parent: 'SECTION37',
          data_tooltip: {
            type: 'default',
            position: 'top_middle',
            size: 'medium',
          },
          data_setting: {
            type_dataset: 'COLLECTION',
            sort_name: 'created_at',
            sort_by: 'desc',
          },
          is_sync: true,
          is_sort: false,
          locked: false,
          multiple_parent: true,
          draggable: true,
          editable: true,
          removable: true,
          duplicate: true,
          selectable: true,
          real_size_element: true,
          text_background_image: true,
          not_move_out: false,
          equals_parent_id: false,
        },
        desktop: {
          option: {
            index: 38,
            sticky: false,
            sticky_position: 'default',
            sticky_position_top: '0px',
            sticky_position_left: '0px',
            sticky_position_bottom: '0px',
            sticky_position_right: '0px',
            hover: {
              transform: {},
              ontop: false,
            },
            input_padding_left_right: '0px',
            hidden: false,
          },
          class: [],
          style: {
            width: '200px',
            height: '29px',
            top: '119px',
            left: '341px',
            color: 'rgba(0, 0, 0, 1)',
            'font-size': '18px',
            'font-weight': 'bold',
            'text-align': 'left',
            'line-height': '1.6',
          },
          custom_style: {},
        },
        mobile: {
          option: {
            index: 38,
            sticky: false,
            sticky_position: 'default',
            sticky_position_top: '0px',
            sticky_position_left: '0px',
            sticky_position_bottom: '0px',
            sticky_position_right: '0px',
            hover: {
              transform: {},
              ontop: false,
            },
            input_padding_left_right: '0px',
            hidden: false,
          },
          class: [],
          style: {
            width: '200px',
            height: '29px',
            top: '0px',
            left: '0px',
            color: 'rgba(0, 0, 0, 1)',
            'font-size': '18px',
            'font-weight': 'bold',
            'text-align': 'left',
            'line-height': '1.6',
          },
          custom_style: {},
        },
      },
    },
    tmp: {},
    // version: this.const.VERSION,
    index_element: 0,
    index_element_option: 0,
  };
  readonly builderEdittor$ = this.store.select(builderEdittor);
  elementItem = ELEMENT_ITEM;
  typeDrag = TYPE_DRAG;
  ladiResize = LADI_RESIZE_TYPE;
  private _scrollBuilderSub = new Subject<{ deviceObj: IDevice }>();
  mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
  mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(
    takeUntil(this.destroy$)
  );
  origanalPosition = { x: 0, y: 0 };
  constructor(
    private store: Store,
    private readonly destroy$: DestroyService,
    private LadiPageScript: LadiPageScriptService,
    private LadiPagePlugin: LadipagePluginService,
    private commonFunctionService: CommonFunctionService,
    private builderRuntime: StateComponentService
  ) {}
  ngOnDestroy(): void {
    this.removeEventElement();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.addEventElement();
    }, 0);

    this._scrollBuilderSub.pipe(debounceTime(200)).subscribe((data) => {
      this.builderRuntime.runtime.tmp.builderScrollY =
        document.getElementById('builder-editor')?.scrollTop;
      this.store.dispatch(
        fromSourceActions.setListElementInScreen({
          payload: {
            isAddNew: false,
          },
        })
      );

      this.store.dispatch(
        fromSourceActions.updateListSectionInScreen({
          payload: {
            device: DEVICE.DESKTOP,
            isAddNew: false,
          },
        })
      );
    });
  }

  addNewElement(data: { element: IElement; id: string }) {
    this.builderRuntime.addElement(data.element, data.id);
  }

  //section events

  addNewSection(indexElement: number, indexSection: number): void {
    console.log('indexElement', indexElement);
    const dataElement = createElement(ELEMENT_ITEM.SECTION, indexElement);
    this.builderRuntime.addElement(dataElement.element, dataElement.id);
    this.store.dispatch(
      fromSourceActions.createNewElement({
        payload: {
          type: ELEMENT_ITEM.SECTION,
          id: dataElement?.id as string,
          element: dataElement?.element,
          sectionAddElement: '',
          indexSection,
        },
      })
    );

    this.store.dispatch(
      fromBuilderActions.updateSectionSelected({
        sectionId: dataElement?.id as string,
      })
    );
  }

  sectionClickOut() {
    console.log('out');

    this.store.dispatch(
      fromBuilderActions.updateSectionSelected({ sectionId: '' })
    );
  }

  // element events
  elementMouseEnter(elementId: string) {
    this.store.dispatch(fromBuilderActions.updateElementHovered({ elementId }));
  }

  elementMouseLeave(elementId: string) {
    this.store.dispatch(
      fromBuilderActions.updateElementHovered({ elementId: '' })
    );
  }

  //builder
  scrollBuilderEditor(deviceObj: IDevice) {
    this._scrollBuilderSub.next({ deviceObj });
  }

  // private methods

  resizeSectionDown(
    start: MouseEvent,
    sectionId: string,
    isDesktop: boolean,
    typeDrag: TYPE_DRAG,
    isEditable = false
  ) {
    if (!isEditable) {
      let origanalX = start.pageX,
        origanalY = start.pageY;
      const dragMove$ = this.mouseMove$.pipe(
        map((moveEvent) => ({
          originalEvent: moveEvent,
          deltaX: moveEvent.pageX - origanalX,
          deltaY: moveEvent.pageY - origanalY,
          startOffsetX: start.offsetX,
          startOffsetY: start.offsetY,
        })),
        takeUntil(this.mouseUp$)
      );

      const dragEnd$ = this.mouseMove$.pipe(
        map((moveEvent) => ({
          originalEvent: moveEvent,
          deltaX: moveEvent.pageX - start.pageX,
          deltaY: moveEvent.pageY - start.pageY,
          startOffsetX: start.offsetX,
          startOffsetY: start.offsetY,
        })),
        takeUntil(this.mouseUp$),
        last()
      );

      dragMove$.subscribe((move) => {
        const offsetY = move.originalEvent.y - move.startOffsetY;
        this.store.dispatch(
          fromSourceActions.updateHeightElement({
            payload: {
              id: sectionId,
              isDesktop,
              deltaY: move.deltaY,
              deltaX: move.deltaX,
              typeDrag,
            },
          })
        );
        origanalY = move.originalEvent.pageY;
        origanalX = move.originalEvent.pageX;
      });
    }
  }

  // #start function complete
  getSelectedRange = () => {
    const section = window.getSelection();
    if (section && section.rangeCount) {
      return section.getRangeAt(0);
    }
    return null;
  };

  getSelectedText = () => {
    let e = '';
    const section = window.getSelection();
    if (section && section.rangeCount) {
      return (e = section.toString());
    }
    return e;
  };

  getBuilderEditorScrollY = () => {
    return (
      document.getElementById(this.builderRuntime.runtime.builder_editor_id)
        ?.scrollTop || 0
    );
  };

  getBuilderEditorWidth = () => {
    return (
      document.getElementById(this.builderRuntime.runtime.builder_editor_id)
        ?.clientWidth || 0
    );
  };

  getBuilderEditorHeight = () => {
    return (
      document.getElementById(this.builderRuntime.runtime.builder_editor_id)
        ?.clientHeight || 0
    );
  };

  isDesktop = () => {
    return this.builderRuntime.data.device_screen === DEVICE.DESKTOP;
  };

  getElement = (id: string, isCopy: boolean): IElement => {
    const element = this.builderRuntime.data.elements[id];
    return isCopy ? (isEmpty(element) ? null : copy(element)) : element;
  };

  eventRemoveSelected = () => {
    if (!isEmpty(this.builderRuntime.runtime.current_element_id)) {
      const currentElement = document.getElementById(
        this.builderRuntime.runtime.current_element_id
      );
      if (!isEmpty(currentElement)) {
        const selectedEle =
            currentElement?.getElementsByClassName('ladi-selected')[0],
          rotateEle = currentElement?.getElementsByClassName('ladi-rotate')[0],
          resizeEle = currentElement?.getElementsByClassName('ladi-resize');
        for (
          isEmpty(selectedEle) ||
            selectedEle?.parentElement?.removeChild(selectedEle),
            isEmpty(rotateEle) ||
              rotateEle?.parentElement?.removeChild(rotateEle),
            document
              .getElementById(this.builderRuntime.runtime.builder_rotate_doc_id)
              ?.classList.add('ladi-hidden');
          resizeEle?.length || 0 > 0;

        ) {
          (
            resizeEle as HTMLCollectionOf<HTMLElement>
          )[0]?.parentElement?.removeChild(
            (resizeEle as HTMLCollectionOf<HTMLElement>)[0]
          );
        }
      }
    }
    const element = this.getElement(
      this.builderRuntime.runtime.current_element_id,
      !1
    );
    if (!isEmpty(element) && !isEmpty(element.option.parent)) {
      const parentElement = document.getElementById(
        element.option.parent as string
      );
      if (!isEmpty(parentElement)) {
        const parentElected = parentElement?.getElementsByClassName(
          'ladi-parent-selected'
        )[0];
        isEmpty(parentElected) ||
          parentElected?.parentElement?.removeChild(parentElected);
        const parentLabel = parentElement?.getElementsByClassName(
          'ladi-parent-selected-label'
        )[0];
        isEmpty(parentLabel) ||
          parentLabel?.parentElement?.removeChild(parentLabel);
      }
    }
  };

  removePositionCacheElement = (elementId?: string) => {
    if (this.LadiPageScript.isEmpty(elementId)) {
      this.builderRuntime.runtime.position_element[DEVICE.DESKTOP] = {};
      this.builderRuntime.runtime.position_element[DEVICE.MOBILE] = {};
    }
    delete (
      this.builderRuntime.runtime.position_element[DEVICE.DESKTOP] as any
    )[elementId as string],
      delete (
        this.builderRuntime.runtime.position_element[DEVICE.MOBILE] as any
      )[elementId as string];
  };

  // #end function complete

  // start function complete no type

  // end function complete no type
  eventMouseUp = (e: MouseEvent) => {
    document.removeEventListener('mouseup', this.eventMouseUp);
    document.removeEventListener('mousemove', this.eventMouseMove);
    this.mouseResizeUp();
    this.store.dispatch(fromSourceActions.handleMouseUpCommon());
    if (
      Math.abs(e.clientX - this.builderRuntime.runtime.mouse_hold_position_x) >=
        3 ||
      Math.abs(e.clientY - this.builderRuntime.runtime.mouse_hold_position_y) >=
        3
    ) {
      if (
        this.builderRuntime.runtime.tmp.check_mouse_up_hold &&
        this.builderRuntime.runtime.currentElementType === 'section_normal'
      ) {
        this.store.dispatch(fromSourceActions.handleMouseUpHold());
      }

      if (
        this.builderRuntime.runtime.tmp.check_mouse_up_hold &&
        this.builderRuntime.runtime.currentElementType === 'group_tmp'
      ) {
        this.store.dispatch(fromSourceActions.handleDragGroupTmpEnd());
      }

      if (
        this.builderRuntime.runtime.tmp.check_mouse_up_hold &&
        this.builderRuntime.runtime.currentElementType === 'item_normal'
      ) {
        // handle drag element end
        this.store.dispatch(fromSourceActions.handleDragElementEnd());
      }
    }

    if (
      this.builderRuntime.runtime.tmp.check_mouse_up_hold &&
      Math.abs(e.clientX - this.builderRuntime.runtime.mouse_hold_position_x) <
        3 &&
      Math.abs(e.clientY - this.builderRuntime.runtime.mouse_hold_position_y) <
        3
    ) {
      // this.store.dispatch(fromSourceActions.handleMouseUpHold());
      if (
        this.builderRuntime.runtime.current_element_type ==
        this.LadiPagePlugin.getPlugin('section').default_data.type
      ) {
        this.store.dispatch(
          fromBuilderActions.updateSectionSelected({
            sectionId: this.builderRuntime.runtime.current_element_id,
          })
        );
      }

      if (
        this.builderRuntime.runtime.current_element_type &&
        this.builderRuntime.runtime.current_element_type !=
          this.LadiPagePlugin.getPlugin('section').default_data.type
      ) {
        this.store.dispatch(
          fromBuilderActions.handleShowQuickEditor({
            payload: {
              elementId: this.builderRuntime.runtime.current_element_id,
            },
          })
        );
      }
    }

    this.store.dispatch(
      fromBuilderActions.updateMouseMoveSelected({
        payload: { mouseMoveSelected: false },
      })
    );
    this.store.dispatch(
      fromBuilderActions.updateBuilderMouseHold({
        payload: {
          width: 0,
          height: 0,
        },
      })
    );
    if (this.builderRuntime.runtime.element_is_dragging) {
      this.builderRuntime.runtime.element_is_dragging = false;
      this.store.dispatch(
        fromBuilderActions.updateHasElementDragging({
          hasElementDragging: false,
        })
      );
      if (
        this.builderRuntime.runtime.current_element_type &&
        this.builderRuntime.runtime.current_element_type !=
          this.LadiPagePlugin.getPlugin('section').default_data.type
      ) {
        this.store.dispatch(
          fromBuilderActions.handleShowQuickEditor({
            payload: {
              elementId: this.builderRuntime.runtime.current_element_id,
            },
          })
        );
      }
    }
    this.builderRuntime.runtime.tmp.check_mouse_up_hold = false;
    this.builderRuntime.runtime.currentElementType = 'noon';
  };

  eventMouseDownBuilderEditor = (event: MouseEvent) => {
    document.addEventListener('mouseup', this.eventMouseUp);
    document.addEventListener('mousemove', this.eventMouseMove),
      (this.builderRuntime.runtime.mouse_hold_position_x = event.pageX);
    this.builderRuntime.runtime.mouse_hold_position_y = event.pageY;
    this.origanalPosition = {
      x: this.builderRuntime.runtime.mouse_hold_position_x,
      y: this.builderRuntime.runtime.mouse_hold_position_y,
    };
    this.builderRuntime.runtime.timenow_element_click = Date.now();
    this.builderRuntime.runtime.tmp.check_mouse_up_hold = true;
    if ((event.stopPropagation(), 3 != event.which)) {
      if (
        !(this.builderRuntime.runtime.tmp.check_mouse_down_builder =
          this.builderRuntime.runtime.timenow_mouse_down_click +
            this.builderRuntime.runtime.time_double_click >
          Date.now())
      ) {
        const target = event.target as HTMLElement;
        this.mouseResizeDown(event, target);
        if (
          target.classList?.contains(
            this.builderRuntime.runtime.builder_group_tmp_id
          )
        ) {
          this.builderRuntime.runtime.currentElementType = 'group_tmp';
          this.builderRuntime.runtime.element_editing_id = '';
          return;
        }
        this.store.dispatch(
          fromBuilderActions.updateGroupTmpState({
            payload: {
              show: false,
            },
          })
        );
        this.store.dispatch(
          fromSourceActions.updateListElementGroupTmp({
            payload: { listElementGroupTmp: [] },
          })
        );
        const eventElementId = this.getEventElementId(
          event,
          event.target,
          this.builderRuntime.runtime.element_select_parent
        );
        if (!eventElementId) {
          this.builderRuntime.runtime.current_element_id = '';
          this.builderRuntime.runtime.current_element_type = '';
          this.builderRuntime.runtime.currentElementType = 'noon';
          this.store.dispatch(
            fromBuilderActions.updateQuickEditorState({
              payload: {
                quickEditorState: {
                  show: false,
                },
              },
            })
          );
          return;
        }
        const ele = this.getElement(eventElementId, !1);
        if (!ele?.id) return;
        this.updateHeightElementAfterInput(ele.id);
        this.builderRuntime.runtime.current_element_id = ele?.id;

        this.builderRuntime.runtime.current_element_type = ele?.type;
        if (ele.id !== this.builderRuntime.runtime.element_editing_id) {
          this.builderRuntime.runtime.element_editing_id = '';
        }
        if (
          ele?.type ==
          this.LadiPagePlugin.getPlugin('section').default_data.type
        ) {
          this.builderRuntime.runtime.currentElementType = 'section_normal';
          this.store.dispatch(
            fromBuilderActions.updateMouseMoveSelected({
              payload: { mouseMoveSelected: true },
            })
          );
          this.store.dispatch(
            fromBuilderActions.updateBuilderMouseHold({
              payload: {
                top:
                  this.builderRuntime.runtime.mouse_hold_position_y +
                  (this.builderRuntime.runtime.tmp.builderScrollY || 0),
                left: this.builderRuntime.runtime.mouse_hold_position_x,
              },
            })
          );
          this.store.dispatch(
            fromBuilderActions.updateQuickEditorState({
              payload: { quickEditorState: { show: false } },
            })
          );
        } else {
          this.builderRuntime.runtime.currentElementType = 'item_normal';
          this.store.dispatch(
            fromBuilderActions.updateElementSelected({ elementId: ele.id })
          );
        }
      }
    }
  };

  eventMouseDbClickBuilderEditor = (event: MouseEvent) => {
    const eventElementId = this.getEventElementId(
      event,
      event.target,
      this.builderRuntime.runtime.element_select_parent
    );
    const ele = this.getElement(eventElementId, !1);
    if (!ele || this.builderRuntime.runtime.element_editing_id === ele.id)
      return;
    if (
      [ELEMENT_ITEM.HEADLINE, ELEMENT_ITEM.BUTTON].includes(
        ele.type as ELEMENT_ITEM
      )
    ) {
      this.commonFunctionService.editText(ele.id, false);
      this.builderRuntime.runtime.element_editing_id = ele.id;
    }
  };

  eventMouseMove = (event: MouseEvent) => {
    if (
      !this.builderRuntime.runtime.current_element_id ||
      this.builderRuntime.runtime.element_editing_id
    )
      return;
    if (!this.builderRuntime.runtime.element_is_dragging) {
      this.builderRuntime.runtime.element_is_dragging = true;
      this.store.dispatch(
        fromBuilderActions.updateHasElementDragging({
          hasElementDragging: true,
        })
      );
      this.store.dispatch(
        fromBuilderActions.updateQuickEditorState({
          payload: {
            quickEditorState: { show: false },
          },
        })
      );
    }
    if (this.builderRuntime.runtime.builder_is_resize) {
      let deltaX = event.pageX - this.origanalPosition.x,
        deltaY = event.pageY - this.origanalPosition.y;
      this.store.dispatch(
        fromSourceActions.handleResizeElement({
          payload: {
            typeResize: this.builderRuntime.runtime
              .builder_resize_rule as RESIZE_ENUM,
            deltaX,
            deltaY,
          },
        })
      );
      this.origanalPosition = {
        x: event.pageX,
        y: event.pageY,
      };
      return;
    }
    if (this.builderRuntime.runtime.currentElementType === 'group_tmp') {
      let deltaX = event.pageX - this.origanalPosition.x,
        deltaY = event.pageY - this.origanalPosition.y;
      this.store.dispatch(
        fromSourceActions.handleMoveGroupTmp({
          payload: {
            deltaY,
            deltaX,
            typeDrag: TYPE_DRAG.DRAG_ELEMENT,
          },
        })
      );

      this.origanalPosition = {
        x: event.pageX,
        y: event.pageY,
      };
    } else {
      if (
        this.builderRuntime.runtime.tmp.check_mouse_up_hold &&
        this.builderRuntime.runtime.current_element_type === 'section'
      ) {
        const width =
          event.pageX - this.builderRuntime.runtime.mouse_hold_position_x;
        const height =
          event.pageY - this.builderRuntime.runtime.mouse_hold_position_y;
        this.store.dispatch(
          fromBuilderActions.updateBuilderMouseHold({
            payload: {
              width,
              height,
            },
          })
        );
        this.store.dispatch(
          fromSourceActions.handleMouseMoveSelect({
            payload: {
              top:
                this.builderRuntime.runtime.mouse_hold_position_y +
                (this.builderRuntime.runtime.tmp.builderScrollY || 0),
              left: this.builderRuntime.runtime.mouse_hold_position_x,
              width,
              height,
            },
          })
        );
      } else if (
        this.builderRuntime.runtime.tmp.check_mouse_up_hold &&
        this.builderRuntime.runtime.current_element_type !== 'section'
      ) {
        let deltaX = event.pageX - this.origanalPosition.x,
          deltaY = event.pageY - this.origanalPosition.y;
        this.store.dispatch(
          fromSourceActions.handleDragElementMove({
            payload: {
              elementId: this.builderRuntime.runtime.current_element_id,
              deltaY,
              deltaX,
              typeDrag: TYPE_DRAG.DRAG_ELEMENT,
            },
          })
        );
        this.origanalPosition = {
          x: event.pageX,
          y: event.pageY,
        };
      }
    }
  };

  mouseResizeDown = (event: MouseEvent, target: HTMLElement) => {
    const classList = target.classList.contains('ladi-resize-display')
      ? target.parentElement?.classList
      : target.classList;
    classList?.forEach((cssClass) => {
      if (LADI_RESIZE_TYPE.includes(cssClass as RESIZE_ENUM)) {
        this.builderRuntime.runtime.builder_is_resize = true;
        this.builderRuntime.runtime.builder_resize_rule = cssClass;
      }
    });
  };

  mouseResizeUp = () => {
    if (this.builderRuntime.runtime.builder_is_resize) {
      this.builderRuntime.runtime.builder_is_resize = false;
      this.builderRuntime.runtime.builder_resize_rule = '';
    }
  };

  eventResize = () => {};

  addEventElement = () => {
    const builderEditor = document.getElementById(
      this.builderRuntime.runtime.builder_editor_id
    ) as HTMLElement;
    builderEditor.addEventListener(
      'mousedown',
      this.eventMouseDownBuilderEditor
    );
    builderEditor.addEventListener(
      'dblclick',
      this.eventMouseDbClickBuilderEditor
    );
    window.addEventListener('resize', this.eventResize);
  };

  updateHeightElementAfterInput = (id: string) => {
    if (
      this.builderRuntime.runtime.current_element_type === 'headline' &&
      id !== this.builderRuntime.runtime.current_element_id
    ) {
      const element = document.getElementById(
        this.builderRuntime.runtime.current_element_id
      );

      const headlineElement = element?.querySelectorAll('.ladi-headline');

      this.store.dispatch(
        fromSourceActions.handleUpdateHeadlineAfterEdit({
          payload: {
            elementId: this.builderRuntime.runtime.current_element_id,
            height: element?.getBoundingClientRect().height || 0,
            innerHTML: headlineElement?.length
              ? headlineElement[0].innerHTML
              : '',
          },
        })
      );
    }
  };

  removeElementPosition = (id: string) => {
    if (this.builderRuntime.runtime.position_element[DEVICE.DESKTOP][id]) {
      delete this.builderRuntime.runtime.position_element[DEVICE.DESKTOP][id];
      delete this.builderRuntime.runtime.position_element[DEVICE.MOBILE][id];
    }
  };

  removeEventElement = () => {
    const builderEditor = document.getElementById(
      this.builderRuntime.runtime.builder_editor_id
    ) as HTMLElement;
    builderEditor.removeEventListener(
      'mousedown',
      this.eventMouseDownBuilderEditor
    );
    builderEditor.removeEventListener(
      'dblclick',
      this.eventMouseDbClickBuilderEditor
    );
    window.addEventListener('resize', this.eventResize);
  };

  getEventElementId = (e: any, t: any, i: any, n?: any) => {
    // console.log('getEventElementId', e, t, i, n);

    if (this.LadiPageScript.isEmpty(e.target)) return null;
    if (e.target.classList.contains('ladi-parent-selected-label'))
      return e.target.textContent.trim();
    var o = (e: string): string => {
        var t = this.builderRuntime.runtime.current_element_id;
        if (
          (!this.LadiPageScript.isEmpty(
            this.builderRuntime.runtime.current_element_type
          ) &&
            this.LadiPageScript.isFunction(
              this.LadiPagePlugin.getPlugin(
                this.builderRuntime.runtime.current_element_type
              ).getParentIdGetCurrentElementId
            ) &&
            (t = this.LadiPagePlugin.getPlugin(
              this.builderRuntime.runtime.current_element_type
            ).getParentIdGetCurrentElementId(t)),
          e != t)
        ) {
          var i = this.getElement(e, !1);
          if (
            !this.LadiPageScript.isEmpty(i) &&
            !this.LadiPageScript.isEmpty(i.option.parent)
          ) {
            var n = this.getElement(t, !1);
            if (
              this.LadiPageScript.isEmpty(n) ||
              i.option.parent != n.option.parent
            ) {
              var r = this.getElement(i.option.parent as string, !1);
              if (r.id != t)
                if (this.builderRuntime.runtime.element_select_parent_first) {
                  if (
                    r.type !=
                    this.LadiPagePlugin.getPlugin('section').default_data.type
                  )
                    return o(r.id);
                } else if (
                  r.type !=
                  this.LadiPagePlugin.getPlugin('section').default_data.type
                )
                  return r.id;
            }
          }
        }
        return e;
      },
      r = (e: HTMLElement): string => {
        return this.LadiPageScript.isEmpty(e) ||
          this.LadiPageScript.isEmpty(e.classList)
          ? ''
          : e.classList.contains('ladi-element') &&
            !e.classList.contains('ladi-button-headline')
          ? i
            ? o(e.id)
            : e.id
          : e.classList.contains('ladi-section')
          ? e.id
          : r(e?.parentElement as HTMLElement);
      },
      s = (e: string): string => {
        console.log(e);

        return e;
        if (!this.LadiPageScript.isEmpty(e)) {
          // console.log(this.builderRuntime.runtime.tmp?.except_in_screen?.indexOf(e) !== -1);

          if (
            this.builderRuntime.runtime.tmp?.except_in_screen?.length &&
            this.builderRuntime.runtime.tmp?.except_in_screen?.indexOf(e) !== -1
          )
            return '';
          var t = this.getElement(e, !1);
          console.log(t);

          if (this.LadiPageScript.isEmpty(t)) return e;
          if (!t.option.selectable) return s(t.option.parent as string);
          var i = this.getParentIdByType(e, 'carousel', !0) as string;
          console.log(i);

          if (
            !this.LadiPageScript.isEmpty(i) &&
            this.LadiPageScript.isEmpty(
              this.builderRuntime.runtime.builder_carousel_crop[i]
            )
          ) {
            console.log('2');

            return i;
          }
        }
        return e;
      },
      l = (e: string): null | string => {
        const t = this.getElement(e, !1);
        return this.LadiPageScript.isEmpty(t)
          ? null
          : t.option.locked
          ? e
          : l(t.option.parent as string);
      },
      c = (e: string): string => {
        var t = l(e);
        return this.LadiPageScript.isEmpty(t) ? e : (t as string);
      },
      d = (e: string) => {
        var t = null;
        return (n ||
          -1 ==
            ['button'].indexOf(
              this.builderRuntime.runtime.current_element_type
            ) ||
          ((t = this.getElement(e, !1)),
          this.LadiPageScript.isEmpty(t) ||
            t.option.parent_type !=
              this.builderRuntime.runtime.current_element_type)) &&
          (n ||
            -1 ==
              ['headline', 'shape'].indexOf(
                this.builderRuntime.runtime.current_element_type
              ) ||
            ((t = this.getElement(e, !1)),
            this.LadiPageScript.isEmpty(t) ||
              'button' != t.option.parent_type)) &&
          (-1 ==
            ['tabs'].indexOf(
              this.builderRuntime.runtime.current_element_type
            ) ||
            ((t = this.getElement(e, !1)),
            this.LadiPageScript.isEmpty(t) ||
              (t.option.parent_type as string) !=
                this.builderRuntime.runtime.current_element_type))
          ? e
          : this.builderRuntime.runtime.current_element_id;
      },
      p = r(t);

    return p;
  };

  getParentIdGetCurrentElementId(id: string) {
    return '';
  }

  eventMouseDownParent = (event: MouseEvent): boolean => {
    const eve = this.getEventCursorData(event);
    if (
      (eve?.target as HTMLElement)?.classList?.contains(
        'ladi-parent-selected-label'
      )
    )
      return (
        this.selectElement(
          (eve?.target as HTMLElement)?.textContent?.trim() as string
        ),
        !0
      );

    return false;
  };

  // fake data
  getEventCursorData = (event: MouseEvent) => {
    return event;
  };
  selectElement = (e: string) => {
    return false;
  };
  mouseDownSwapElement = (event: MouseEvent): boolean | undefined => {
    return false;
  };
  eventMouseDownResize = (event: MouseEvent): boolean | undefined => {
    // console.log('eventMouseDownResize', event);

    return false;
  };

  getDimensionByList = (e: any, t: any, i: any) => {
    t = isEmpty(t) ? this.builderRuntime.data.device_screen : t;
    var n = 0,
      a = 0,
      o = 0,
      r = 0,
      s = !isEmpty(this.builderRuntime.runtime.current_popup_id),
      l = 0,
      c = 0;
    if (s) {
      var d = document.getElementById(
          this.builderRuntime.runtime.current_popup_id
        ),
        p = this.LadiPageScript.getElementBoundingClientRect(d as HTMLElement),
        u = this.getBuilderEditorScrollY();
      (l += p.y - this.builderRuntime.runtime.builder_menu_top + u),
        (c += p.x - this.builderRuntime.runtime.builder_menu_left);
    }
    var g = !0;
    return (
      e.forEach((e: string) => {
        var l = this.getElement(e, !1);
        if (!isEmpty(l)) {
          var c = (l as any)[t],
            d = s ? 0 : this.getPaddingDevice(e),
            p = this.getTopElement(e, t, i),
            u = this.getLeftElement(e, t, i) + d,
            m = parseFloatLadi(c.style.width),
            v = parseFloatLadi(c.style.height);
          g
            ? ((g = !1), (n = p), (a = u), (o = p + v), (r = u + m))
            : (n > p && (n = p),
              a > u && (a = u),
              o < p + v && (o = p + v),
              r < u + m && (r = u + m));
        }
      }),
      { top: n + l, left: a + c, width: r - a, height: o - n }
    );
  };

  isElementPositionFixed = (e: any, t?: any): boolean => {
    if (t) {
      var i = !1,
        n = !1;
      do {
        try {
          (i =
            (e = e.parentElement).id !=
            this.builderRuntime.runtime.builder_container_id) &&
            (n = this.isElementPositionFixed(e)) &&
            (i = !1);
        } catch (e) {
          break;
        }
      } while (i);
      return n;
    }
    if (!this.LadiPageScript.isEmpty(e)) {
      var a = e.style.getPropertyValue('position');
      return (
        this.LadiPageScript.isEmpty(a) && (a = getComputedStyle(e).position),
        'fixed' == a
      );
    }
    return !1;
  };

  removeBorderItemGroupTmp = () => {
    var e = document.getElementById('style_border_element_group_tmp');
    this.LadiPageScript.isEmpty(e) || e?.parentElement?.removeChild(e);
  };

  getParentIdByType = (e: string, t: string, i: any): null | string => {
    var n = this.getElement(e, !1);
    if (this.LadiPageScript.isEmpty(n)) {
      return null;
    } else {
      if (i || n.type != this.LadiPagePlugin.getPlugin(t).default_data.type) {
        return this.LadiPageScript.isEmpty(n.option.parent)
          ? null
          : this.getParentIdByType(n.option.parent as string, t, !1);
      } else {
        return e;
      }
    }
    if (i || n.type != this.LadiPagePlugin.getPlugin(t).default_data.type) {
    }
    return this.LadiPageScript.isEmpty(n)
      ? null
      : i || n.type != this.LadiPagePlugin.getPlugin(t).default_data.type
      ? this.LadiPageScript.isEmpty(n.option.parent)
        ? null
        : this.getParentIdByType(n?.option?.parent as string, t, !1)
      : e;
  };

  eventMouseUpInputNumber = (e: MouseEvent): any => {
    // console.log('eventMouseUpInputNumber', e);

    if (this.builderRuntime.runtime.builder_attribute_input_move)
      return (
        e.stopPropagation(),
        this.LadiPageScript.isEmpty(
          this.builderRuntime.runtime.builder_attribute_input_move_element
        ) ||
          (this.builderRuntime.runtime.builder_attribute_input_move_element?.setAttribute(
            'data-can-change',
            !0 + ''
          ),
          this.LadiPageScript.fireEvent(
            this.builderRuntime.runtime.builder_attribute_input_move_element,
            'change'
          ),
          this.builderRuntime.runtime.builder_attribute_input_move_element?.removeAttribute(
            'data-can-change'
          )),
        (this.builderRuntime.runtime.builder_attribute_input_move = !1),
        (this.builderRuntime.runtime.builder_attribute_input_move_element =
          null),
        (this.builderRuntime.runtime.builder_attribute_input_move_value = 0),
        (this.builderRuntime.runtime.builder_attribute_input_move_position_x = 0),
        document
          .getElementById(this.builderRuntime.runtime.builder_editor_id)
          ?.classList.remove('disabled'),
        console.log('end eventMouseUpInputNumber'),
        !0
      );
  };

  eventSelectedText = (e: MouseEvent) => {
    // console.log('eventSelectedText', e);

    (this.LadiPageScript.isEmpty(e) ||
      (this.LadiPageScript.isEmpty(
        this.LadiPageScript.findAncestor(e.target, 'builder-color-editor')
      ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-link-editor')
        ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-animated-editor')
        ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-attribute-editor')
        ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-quick-editor')
        ) &&
        this.LadiPageScript.isEmpty(
          this.LadiPageScript.findAncestor(e.target, 'builder-section-editor')
        ))) &&
      this.LadiPageScript.runTimeout((): void => {
        const textSelected = this.getSelectedText();
        if (this.LadiPageScript.isEmpty(textSelected)) {
          this.builderRuntime.runtime.current_select_text_range = null;
          this.store.dispatch(
            fromBuilderActions.updateIsSelectText({ isSelectText: false })
          );
          return;
        }
        this.builderRuntime.runtime.current_select_text_range =
          this.getSelectedRange();
        this.store.dispatch(
          fromBuilderActions.updateIsSelectText({ isSelectText: true })
        );
      }, 1);
  };

  getPaddingDevice = (e: string) => {
    var t = (this.getBuilderEditorWidth() - this.getWidth()) / 2;
    if (((t = t > 0 ? t : 0), !this.LadiPageScript.isEmpty(e))) {
      var i = document.getElementById(e);
      t = this.isElementPositionFixed(i) ? 0 : t;
    }
    return t;
  };

  getWidth = (e?: string) => {
    return (
      (e = this.LadiPageScript.isEmpty(e)
        ? this.builderRuntime.data.device_screen
        : e),
      (this.builderRuntime.data.width as any)[e as string]
    );
  };

  getElementNoParent = (e: any) => {
    var t = this,
      i: { id: string; element: any }[] = [];
    Object.keys(this.builderRuntime.data.elements).forEach((n) => {
      if (
        (e || n != this.LadiPageScript.runtime.builder_section_popup_id) &&
        n != this.LadiPageScript.runtime.builder_section_background_id
      ) {
        var a = t.getElement(n, !1);
        !this.LadiPageScript.isEmpty(a) &&
          this.LadiPageScript.isEmpty(a.option.parent) &&
          i.push({ id: n, element: a });
      }
    }),
      i.sort(function (e, i) {
        return (
          e.element[t.data.device_screen].option.index -
          i.element[t.data.device_screen].option.index
        );
      });
    var n: string[] = [];
    return (
      i.forEach(function (e) {
        n.push(e.id);
      }),
      n
    );
  };

  getTopElement = (e: any, t?: any, i?: any) => {
    if (
      ((t = this.LadiPageScript.isEmpty(t)
        ? this.builderRuntime.data.device_screen
        : t),
      !i &&
        (this.LadiPageScript.isNull(
          ((this.builderRuntime.runtime.position_element as any)[t] as any)[e]
        ) &&
          (((this.builderRuntime.runtime.position_element as any)[t] as any)[
            e
          ] = {}),
        !this.LadiPageScript.isEmpty(
          ((this.builderRuntime.runtime.position_element as any)[t] as any)[e]
            .top
        )))
    )
      return ((this.builderRuntime.runtime.position_element as any)[t] as any)[
        e
      ].top;
    var n = this.getElement(e, !1);
    if (this.LadiPageScript.isEmpty(n)) return 0;
    var a = document.getElementById(e),
      o = 0;
    if (
      !this.LadiPageScript.isEmpty(a) &&
      this.LadiPageScript.isEmpty(
        this.builderRuntime.runtime.current_popup_id
      ) &&
      this.isElementPositionFixed(a)
    ) {
      var r = this.LadiPageScript.getElementBoundingClientRect(
        a as HTMLElement
      );
      o = r.y;
    }
    if (this.LadiPageScript.isEmpty(o))
      if (
        ((o = parseFloatLadiPage((n as any)[t].style.top) || 0),
        i &&
          ((a = document.getElementById(e)),
          this.LadiPageScript.isEmpty(a) ||
            (o =
              parseFloatLadiPage(a?.style.getPropertyValue('top') || 0) || 0)),
        this.LadiPageScript.isEmpty(n.option.parent))
      ) {
        var s = this.getElementNoParent(!1),
          l = s.indexOf(e),
          c = this;
        (s = s.splice(0, l)).forEach((e) => {
          var i = c.getElement(e, !1);
          this.LadiPageScript.isEmpty(i) ||
            (o += parseFloatLadiPage((i as any)[t].style.height) || 0);
        });
      } else o += this.getTopElement(n.option.parent, t, !1);
    return (
      i ||
        (((this.builderRuntime.runtime.position_element as any)[t] as any)[
          e
        ].top = o),
      o
    );
  };

  getHeightElement = (e: any, t?: any, i?: any) => {
    if (
      ((t = this.LadiPageScript.isEmpty(t)
        ? this.builderRuntime.data.device_screen
        : t),
      i)
    ) {
      var n = document.getElementById(e);
      if (!this.LadiPageScript.isEmpty(n))
        return (
          parseFloatLadiPage(n?.style.getPropertyValue('height') || 0) || 0
        );
    }
    var a = this.getElement(e, !1);
    return parseFloatLadiPage((a as any)[t].style.height) || 0;
  };

  checkChildFix = (e: any, t: any, i: any, n: any): boolean => {
    return this.LadiPageScript.isEmpty(i) || this.LadiPageScript.isEmpty(n)
      ? this.checkChildFix(e, t, 'headline', 'button') ||
          this.checkChildFix(e, t, 'shape', 'button') ||
          this.checkChildFix(e, t, 'shape', 'video')
      : e == i && t == n;
  };

  getChildElement = (e: any, t?: any, i?: any, n?: any, a?: any, o?: any) => {
    o = this.LadiPageScript.isEmpty(o)
      ? this.builderRuntime.data.device_screen
      : o;
    // var r = this,
    let s: any[] = [];
    Object.keys(this.builderRuntime.data.elements).forEach((i) => {
      var n = this.getElement(i, !1);
      this.LadiPageScript.isEmpty(n) ||
        n.option.parent != e ||
        ((this.LadiPageScript.isEmpty(t) || t == n.type) &&
          s.push({ id: i, element: n }));
    }),
      s.sort((e, t) => {
        return i && !n
          ? this.getTopElement(e.id, o) - this.getTopElement(t.id, o)
          : n && !i
          ? this.getHeightElement(e.id, o) - this.getHeightElement(t.id, o)
          : n && i
          ? this.getTopHeightElement(e.id, o) -
            this.getTopHeightElement(t.id, o)
          : e.element[this.builderRuntime.data.device_screen].option.index -
            t.element[this.builderRuntime.data.device_screen].option.index;
      });
    var l: any[] = [];
    return (
      s.forEach((e) => {
        if (a) {
          var t = document.getElementById(e.id);
          if (this.isElementPositionFixed(t)) return;
        }
        l.push(e.id);
      }),
      l
    );
  };

  getTopHeightElement = (e: any, t: any, i?: any) => {
    return this.getTopElement(e, t, i) + this.getHeightElement(e, t, i);
  };

  getLeftElement = (e: any, t: any, i: any): any => {
    if (
      ((t = this.LadiPageScript.isEmpty(t)
        ? this.builderRuntime.data.device_screen
        : t),
      !i &&
        (this.LadiPageScript.isNull(
          ((this.builderRuntime.runtime.position_element as any)[t] as any)[e]
        ) &&
          (((this.builderRuntime.runtime.position_element as any)[t] as any)[
            e
          ] = {}),
        !this.LadiPageScript.isEmpty(
          ((this.builderRuntime.runtime.position_element as any)[t] as any)[e]
            .left
        )))
    )
      return ((this.builderRuntime.runtime.position_element as any)[t] as any)[
        e
      ].left;
    var n = this.getElement(e, !1);
    if (this.LadiPageScript.isEmpty(n)) return 0;
    var a = document.getElementById(e),
      o = null;
    !this.LadiPageScript.isEmpty(a) &&
      this.LadiPageScript.isEmpty(
        this.builderRuntime.runtime.current_popup_id
      ) &&
      this.isElementPositionFixed(a) &&
      (o = this.LadiPageScript.getElementBoundingClientRect(
        a as HTMLElement
      ).x);
    return (
      this.LadiPageScript.isEmpty(o) &&
        ((o = parseFloatLadiPage(((n as any)[t] as any).style.left) || 0),
        i &&
          ((a = document.getElementById(e)),
          this.LadiPageScript.isEmpty(a) ||
            (o =
              parseFloatLadiPage(a?.style.getPropertyValue('left') || 0) || 0)),
        this.LadiPageScript.isEmpty(n.option.parent) ||
          (o += this.getLeftElement(n.option.parent, t, !1))),
      i ||
        (((this.builderRuntime.runtime.position_element as any)[t] as any)[
          e
        ].left = o),
      o
    );
  };
}
