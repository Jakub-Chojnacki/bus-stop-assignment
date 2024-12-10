import { createStore } from "vuex";

import { type TState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

export default createStore<TState>({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
