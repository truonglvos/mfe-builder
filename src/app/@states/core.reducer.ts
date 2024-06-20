import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './core.state';
import * as menuReducer from './menu/menu.reducer';
import * as sourceReducer from './source/source.reducer';
import * as builderReducer from './builder/builder.reducer';

export const reducers: ActionReducerMap<State> = {
  menu: menuReducer.reducer,
  source: sourceReducer.reducer,
  builder: builderReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
