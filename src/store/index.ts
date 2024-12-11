import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";

import { type TState, state } from "./state";
import { Mutations, mutations } from "./mutations";
import { Actions, actions } from "./actions";
import { Getters, getters } from "./getters";

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});

/* https://dev.to/3vilarthas/vuex-typescript-m4j
 * I think it is a bit too complex so it would be better to just use Pinia but this type gives good typesafety and intellisense
 */
export type TStore = Omit<
  VuexStore<TState>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export function useStore() {
  return store as TStore;
}
