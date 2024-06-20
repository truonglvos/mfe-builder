import { IElement } from '@models/element.model';

export type IColor = 'color' | 'background-color' | 'none';

export interface IBuilderRuntimeState {
  elementSelected: string;
  elementHovered: string;
  sectionSelected: string;
  hasElementDragging: boolean;
  elementEditable: string;
  quickEditorPosition: {
    top: number;
    left: number;
  };
  clientConfig: {
    height: number;
    width: number;
  };
  isSelectText: boolean;
  selectStart: boolean;
  elementDownEditing: boolean;
  mouseMoveSelected: boolean;
  builderMouseHold: {
    show: boolean;
    top: number;
    left: number;
    width: number;
    height: number;
  };
  elementIsDragging: boolean;
  groupTMP: {
    show: boolean;
    top: number;
    left: number;
    width: number;
    height: number;
  };
  colorEditorState: {
    colorType: IColor;
    colorDefault: string;
  };
  quickEditorState: {
    show: boolean;
    top: number;
    left: number;
  };
  fontCustomState: {
    show: boolean;
  };
  hasGroupTmp: boolean;
  idFirebase: string;
  loading: boolean;
  builderSnapVertical: {
    show: boolean;
    left: number;
    top: number;
    height: number;
  };
  builderSnapHorizontal: {
    show: boolean;
    left: number;
    top: number;
    width: number;
  };
}

export const initBuilderState: IBuilderRuntimeState = {
  elementHovered: '',
  elementSelected: '',
  sectionSelected: '',
  hasElementDragging: false,
  elementEditable: '',
  quickEditorPosition: {
    top: 0,
    left: 0,
  },
  clientConfig: {
    height: 0,
    width: 0,
  },
  isSelectText: false,
  selectStart: false,
  elementDownEditing: false,
  mouseMoveSelected: false,
  builderMouseHold: {
    show: true,
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  },
  elementIsDragging: false,
  groupTMP: {
    show: false,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  colorEditorState: {
    colorType: 'none',
    colorDefault: '',
  },
  fontCustomState: {
    show: false,
  },
  quickEditorState: {
    show: false,
    top: 0,
    left: 0,
  },
  hasGroupTmp: false,
  idFirebase: '',
  loading: false,
  builderSnapVertical: {
    show: false,
    left: 0,
    top: 0,
    height: 0,
  },
  builderSnapHorizontal: {
    show: false,
    left: 0,
    top: 0,
    width: 0,
  },
};
