import { GetterTree } from "vuex";
import { TState } from "./state";

export enum GetterTypes {
  GET_UNIQUE_LINES = "GET_UNIQUE_LINES",
  GET_BUS_STOPS_FOR_LINE = "GET_BUS_STOPS_FOR_LINE",
}

export type Getters = {
  [GetterTypes.GET_UNIQUE_LINES](state: TState): number[];
  [GetterTypes.GET_BUS_STOPS_FOR_LINE](
    state: TState,
    line: number
  ): TState["stops"];
};

export const getters: GetterTree<TState, TState> & Getters = {
  [GetterTypes.GET_UNIQUE_LINES](state): number[] {
    const lines = state.stops.map((stop) => stop.line).sort(); //TODO: Use reduce to avoid looping twice
    return [...new Set(lines)];
  },
  [GetterTypes.GET_BUS_STOPS_FOR_LINE]: (state, line: number) => {
    return state.stops.filter((stop) => stop.line === line);
  },
};
