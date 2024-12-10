import { GetterTree } from "vuex";
import { TState } from "./state";

export type Getters = {
  getUniqueLines(state: TState): number[];
};

export const getters: GetterTree<TState, TState> & Getters = {
  getUniqueLines(state): number[] {
    const lines = state.stops.map((stop) => stop.line).sort(); //TODO: Use reduce to avoid looping twice
    return [...new Set(lines)];
  },
};
