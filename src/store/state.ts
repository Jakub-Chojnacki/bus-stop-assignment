import { TGetStopsResponse } from "@/types/api";

export type TState = {
  isLoadingStops: boolean;
  error: string | null;
  stops: TGetStopsResponse;
  selectedBusLine: number | null;
  selectedBusStop: string | null;
};

export const state: TState = {
  isLoadingStops: false,
  error: null,
  stops: [],
  selectedBusLine: null,
  selectedBusStop: null,
};
