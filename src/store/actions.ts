import axios from "axios";
import { ActionContext, ActionTree } from "vuex";

import { TState } from "./state";
import { TGetStopsResponse } from "@/types/api";
import { Mutations, MutationTypes } from "./mutations";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<TState, TState>, "commit">;

export enum ActionTypes {
  FETCH_STOPS = "FETCH_STOPS",
  SET_SELECTED_BUS_LINE = "SET_SELECTED_BUS_LINE",
  SET_SELECTED_BUS_STOP = "SET_SELECTED_BUS_STOP",
}

export interface Actions {
  [ActionTypes.FETCH_STOPS]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.SET_SELECTED_BUS_LINE](
    { commit }: AugmentedActionContext,
    value: TState["selectedBusLine"]
  ): void;
  [ActionTypes.SET_SELECTED_BUS_STOP](
    { commit }: AugmentedActionContext,
    value: TState["selectedBusStop"]
  ): void;
}

export const actions: ActionTree<TState, TState> = {
  async [ActionTypes.FETCH_STOPS](context) {
    context.commit(MutationTypes.SET_IS_LOADING_STOPS, true);
    context.commit(MutationTypes.SET_ERROR, null);
    try {
      const { data } = await axios.get<TGetStopsResponse>(
        `${process.env.VUE_APP_BASE_URL}/stops`
      );

      context.commit(MutationTypes.SET_STOPS, data);
    } catch (err) {
      context.commit(
        MutationTypes.SET_ERROR,
        "An error occurred while fetching the data."
      );
    } finally {
      context.commit(MutationTypes.SET_IS_LOADING_STOPS, false);
    }
  },
  SET_SELECTED_BUS_LINE(
    context,
    value: TState["selectedBusLine"]
  ) {
    context.commit(MutationTypes.SET_SELECTED_BUS_LINE, value);
  },
  [ActionTypes.SET_SELECTED_BUS_STOP](
    context,
    value: TState["selectedBusStop"]
  ) {
    context.commit(MutationTypes.SET_SELECTED_BUS_STOP, value);
  },
};
