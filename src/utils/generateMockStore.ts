import { createStore } from "vuex";

import { TState } from "@/store/state";
import { TStore } from "@/store";
import { getters } from "@/store/getters";
import { mutations } from "@/store/mutations";
import { actions } from "@/store/actions";

import generateMockState from "./generateMockState";

const generateMockStore = (overwrittenState?: Partial<TState>): TStore =>
  createStore({
    state: generateMockState(overwrittenState),
    getters,
    mutations,
    actions,
  });

export default generateMockStore;
