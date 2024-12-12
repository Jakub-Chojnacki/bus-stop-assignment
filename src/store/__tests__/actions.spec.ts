/* eslint-disable @typescript-eslint/ban-types */
//We have to assert as Function because of the way TypeScript handles the actions object.
import { actions, ActionTypes } from "@/store/actions";
import { MutationTypes } from "@/store/mutations";
import axios from "axios";
import { Mock } from "vitest";

describe("actions", () => {
  const fakeData = [
    {
      line: 103,
      order: 1,
      stop: "Test stop",
      time: "13:23",
    },
  ];

  vi.mock("axios", () => {
    return {
      default: {
        get: vi.fn(),
      },
    };
  });

  it(ActionTypes.FETCH_STOPS, async () => {
    const commit = vi.fn();

    (axios.get as Mock).mockImplementation(() =>
      Promise.resolve({ data: fakeData })
    );
    await (actions.FETCH_STOPS as Function)({ commit });

    expect(commit).toHaveBeenCalledWith(
      MutationTypes.SET_IS_LOADING_STOPS,
      true
    );

    expect(commit).toHaveBeenCalledWith(MutationTypes.SET_ERROR, null);
    expect(commit).toHaveBeenCalledWith(MutationTypes.SET_STOPS, fakeData);
    expect(commit).toHaveBeenCalledWith(
      MutationTypes.SET_IS_LOADING_STOPS,
      false
    );
  });

  it("Sets fetch error if it failed", async () => {
    const commit = vi.fn();

    (axios.get as Mock).mockImplementation(() => Promise.reject());
    await (actions.FETCH_STOPS as Function)({ commit });

    expect(commit).toHaveBeenCalledWith(
      MutationTypes.SET_IS_LOADING_STOPS,
      true
    );

    expect(commit).toHaveBeenCalledWith(
      MutationTypes.SET_ERROR,
      "An error occurred while fetching the data."
    );
    expect(commit).toHaveBeenCalledWith(
      MutationTypes.SET_IS_LOADING_STOPS,
      false
    );
  });

  it(ActionTypes.SET_SELECTED_BUS_LINE, async () => {
    const commit = vi.fn();

    (actions.SET_SELECTED_BUS_LINE as Function)({ commit }, 104);

    expect(commit).toHaveBeenCalledWith(
      MutationTypes.SET_SELECTED_BUS_LINE,
      104
    );
  });

  it(ActionTypes.SET_SELECTED_BUS_STOP, () => {
    const commit = vi.fn();

    const busStop = "Test stop";

    (actions.SET_SELECTED_BUS_STOP as Function)({ commit }, busStop);

    expect(commit).toHaveBeenCalledWith(
      MutationTypes.SET_SELECTED_BUS_STOP,
      busStop
    );
  });
});
