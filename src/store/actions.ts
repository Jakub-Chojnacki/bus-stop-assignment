import axios from "axios";
import { ActionTree } from "vuex";

import { TState } from "./state";
import { TGetStopsResponse } from "@/types/api";

export enum ActionTypes {
  FETCH_STOPS = "FETCH_STOPS",
  SET_SELECTED_BUS_LINE = "SET_SELECTED_BUS_LINE",
  SET_SELECTED_BUS_STOP = "SET_SELECTED_BUS_STOP",
}

export const actions: ActionTree<TState, TState> = {
  async [ActionTypes.FETCH_STOPS](context) {
    context.commit("SET_IS_LOADING_STOPS", true);
    try {
      const { data } = await axios.get<TGetStopsResponse>(
        `${process.env.VUE_APP_BASE_URL}/stops`
      );

      context.commit("SET_STOPS", data);
    } catch (err) {
      console.error(err);
      context.commit("SET_ERROR", "An error occurred while fetching the data.");
    } finally {
      context.commit("SET_IS_LOADING_STOPS", false);
    }
  },
  [ActionTypes.SET_SELECTED_BUS_LINE](
    context,
    value: TState["selectedBusLine"]
  ) {
    context.commit("SET_SELECTED_BUS_LINE", value);
  },
  [ActionTypes.SET_SELECTED_BUS_STOP](
    context,
    value: TState["selectedBusStop"]
  ) {
    context.commit("SET_SELECTED_BUS_STOP", value);
  },
};
