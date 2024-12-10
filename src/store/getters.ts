import { GetterTree } from "vuex";
import { TState } from "./state";
import { TSingleStop } from "@/types/api";
import { TSortDirection } from "@/types/app";

export enum GetterTypes {
  GET_UNIQUE_LINES = "GET_UNIQUE_LINES",
  GET_BUS_STOPS_FOR_LINE = "GET_BUS_STOPS_FOR_LINE",
  GET_TIMES_FOR_STOP = "GET_TIMES_FOR_STOP",
}

export type Getters = {
  [GetterTypes.GET_UNIQUE_LINES](state: TState): number[];
  [GetterTypes.GET_BUS_STOPS_FOR_LINE](
    state: TState
  ): (line: number, sort: TSortDirection) => TSingleStop["stop"][];
  [GetterTypes.GET_TIMES_FOR_STOP](
    state: TState
  ): (stop: string) => TSingleStop["time"][];
};

export const getters: GetterTree<TState, TState> & Getters = {
  [GetterTypes.GET_UNIQUE_LINES](state): number[] {
    const lines = state.stops.map((stop) => stop.line).sort(); //TODO: Use reduce to avoid looping twice
    return [...new Set(lines)];
  },
  [GetterTypes.GET_BUS_STOPS_FOR_LINE]:
    (state) =>
    (line: number, sort = "asc") => {
      const stops = state.stops.reduce((acc: string[], stop) => {
        if (stop.line === line) {
          acc.push(stop.stop);
        }
        return acc;
      }, []);

      const uniqueSortedStops = [...new Set(stops)].sort((a, b) => {
        if (sort === "asc") return a.localeCompare(b);
        return b.localeCompare(a);
      });
      return uniqueSortedStops;
    },
  [GetterTypes.GET_TIMES_FOR_STOP]: (state) => (selectedStop: string) => {
    const times = state.stops.reduce((acc: string[], stop) => {
      if (stop.stop === selectedStop) {
        acc.push(stop.time);
      }
      return acc;
    }, []);

    const uniqueSortedTimes = [...new Set(times)].sort((a, b) => {
      const [hourA, minuteA] = a.split(":").map(Number);
      const [hourB, minuteB] = b.split(":").map(Number);

      if (hourA !== hourB) {
        return hourA - hourB;
      }

      return minuteA - minuteB;
    });

    return uniqueSortedTimes;
  },
};
