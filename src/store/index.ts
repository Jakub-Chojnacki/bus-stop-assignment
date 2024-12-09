import axios from "axios";
import { createStore } from "vuex";

import { TGetStopsResponse } from "@/types/api";

type TState = {
  isLoadingStops: boolean;
  error: string | null;
  stops: TGetStopsResponse;
};

export default createStore<TState>({
  state: {
    isLoadingStops: false,
    error: null,
    stops: [],
  },
  getters: {
    getUniqueLines(state) {
      const lines = state.stops.map((stop) => stop.line);
      return [...new Set(lines)];
    },
  },
  mutations: {
    SET_IS_LOADING_STOPS(state, value) {
      state.isLoadingStops = value;
    },
    SET_STOPS(state, value) {
      state.stops = value;
    },
    SET_ERROR(state, value) {
      state.error = value;
    },
  },
  actions: {
    async fetchStops(context) {
      context.commit("SET_IS_LOADING_STOPS", true);
      try {
        const { data } = await axios.get<TGetStopsResponse>(
          `${process.env.VUE_APP_BASE_URL}/stops`
        );

        context.commit("SET_STOPS", data);
      } catch (err) {
        console.error(err);
        context.commit(
          "SET_ERROR",
          "An error occurred while fetching the data."
        );
      } finally {
        context.commit("SET_IS_LOADING_STOPS", false);
      }
    },
  },
  modules: {},
});
