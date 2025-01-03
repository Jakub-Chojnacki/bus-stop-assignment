import { MutationTree } from "vuex";

import { TState } from "./state";
import { TGetStopsResponse } from "@/types/api";

export enum MutationTypes {
  SET_IS_LOADING_STOPS = "SET_IS_LOADING_STOPS",
  SET_STOPS = "SET_STOPS",
  SET_ERROR = "SET_ERROR",
  SET_SELECTED_BUS_LINE = "SET_SELECTED_BUS_LINE",
  SET_SELECTED_BUS_STOP = "SET_SELECTED_BUS_STOP",
}

export type Mutations<T = TState> = {
  [MutationTypes.SET_IS_LOADING_STOPS](state: T, payload: boolean): void;
  [MutationTypes.SET_STOPS](state: T, payload: TGetStopsResponse): void;
  [MutationTypes.SET_ERROR](state: T, payload: string | null): void;
  [MutationTypes.SET_SELECTED_BUS_LINE](state: T, payload: number | null): void;
  [MutationTypes.SET_SELECTED_BUS_STOP](state: T, payload: string | null): void;
};

export const mutations: MutationTree<TState> & Mutations = {
  [MutationTypes.SET_IS_LOADING_STOPS](state, payload: boolean) {
    state.isLoadingStops = payload;
  },
  [MutationTypes.SET_STOPS](state, payload) {
    state.stops = payload;
  },
  [MutationTypes.SET_ERROR](state, payload) {
    state.error = payload;
  },
  [MutationTypes.SET_SELECTED_BUS_LINE](state, payload) {
    //Depending on the design we could also make it so that clicking the same line again would deselect it
    if (payload === state.selectedBusLine) return;

    state.selectedBusLine = payload;
    state.selectedBusStop = null;
  },
  [MutationTypes.SET_SELECTED_BUS_STOP](state, payload) {
    state.selectedBusStop = payload;
  },
};
