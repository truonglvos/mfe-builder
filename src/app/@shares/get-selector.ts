import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export type StoreState<TStore> = TStore extends ComponentStore<infer TSate>
  ? TSate
  : {};

export type StoreSelectors<TStore, TStoreState = StoreState<TStore>> = {
  [TSelectorKey in keyof TStoreState &
    string as `${TSelectorKey}$`]: Observable<TStoreState[TSelectorKey]>;
};

export function getSelectors<TStore extends ComponentStore<any>>(
  store: TStore,
): StoreSelectors<TStore> {
  return new Proxy<StoreSelectors<TStore>>({} as StoreSelectors<TStore>, {
    get(target, p, receiver) {
      const prop = p as string;
      if (
        !prop.endsWith('$') ||
        target[prop as keyof StoreSelectors<TStore>] != null
      ) {
        return Reflect.get(target, p, receiver);
      }

      const stateProp = prop.slice(0, -1);
      return ((target[prop as keyof StoreSelectors<TStore>] as unknown) =
        store.select((s) => s[stateProp]));
    },
  });
}
