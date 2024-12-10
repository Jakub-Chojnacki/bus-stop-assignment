import { GetterTree } from "vuex";
import { TState } from "./state";
import { TSingleStop } from "@/types/api";
import { TSortDirection } from "@/types/app";

export enum GetterTypes {
  GET_UNIQUE_LINES = "GET_UNIQUE_LINES",
  GET_BUS_STOPS_FOR_LINE = "GET_BUS_STOPS_FOR_LINE",
  GET_TIMES_FOR_STOP = "GET_TIMES_FOR_STOP",
  GET_FILTERED_STOPS = "GET_FILTERED_STOPS",
}

export type Getters = {
  [GetterTypes.GET_UNIQUE_LINES](state: TState): number[];
  [GetterTypes.GET_BUS_STOPS_FOR_LINE](
    state: TState
  ): (line: number, sort: TSortDirection) => TSingleStop["stop"][];
  [GetterTypes.GET_TIMES_FOR_STOP](
    state: TState
  ): (stop: string) => TSingleStop["time"][];
  [GetterTypes.GET_FILTERED_STOPS](
    state: TState
  ): (filter: string, sort: TSortDirection) => TSingleStop["stop"][];
};

export const getters: GetterTree<TState, TState> & Getters = {
  [GetterTypes.GET_UNIQUE_LINES](state): number[] {
    const lines = [...new Set(state.stops.map((stop) => stop.line))];
    return lines.sort();
  },
  [GetterTypes.GET_BUS_STOPS_FOR_LINE]:
    (state) =>
    (line, sort = "asc") => {
      const stops = state.stops.reduce((acc: TSingleStop[], stop) => {
        if (stop.line === line && !acc.find((obj) => obj.stop === stop.stop)) {
          acc.push(stop);
        }
        return acc;
      }, []);

      const uniqueSortedStops = stops.sort((a, b) => {
        if (sort === "asc") return a.order - b.order;
        return b.order - a.order;
      });

      return uniqueSortedStops.map((stop) => stop.stop);
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
  [GetterTypes.GET_FILTERED_STOPS]:
    (state) =>
    (filter, sort = "asc") => {
      const uniqueStops = [...new Set(state.stops.map((stop) => stop.stop))];

      uniqueStops.sort();

      const filteredStops = uniqueStops.filter((stop) =>
        stop.toLowerCase().includes(filter.toLowerCase())
      );

      const sortedFilteredStops = filteredStops.sort((a, b) => {
        if (sort === "asc") return a.localeCompare(b);
        return b.localeCompare(a);
      });

      return sortedFilteredStops;
    },
};
