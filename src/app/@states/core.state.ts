import { IBuilderRuntimeState } from './builder';
import { IMenuState } from './menu';
import { ISourceState } from './source';

export interface State {
  menu: IMenuState;
  source: ISourceState;
  builder: IBuilderRuntimeState;
}
