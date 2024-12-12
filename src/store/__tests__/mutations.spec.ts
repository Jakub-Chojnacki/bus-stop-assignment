import { mutations } from "@/store/mutations";
import { TGetStopsResponse } from "@/types/api";
import generateMockState from "@/utils/generateMockState";

const {
  SET_ERROR,
  SET_IS_LOADING_STOPS,
  SET_SELECTED_BUS_LINE,
  SET_SELECTED_BUS_STOP,
  SET_STOPS,
} = mutations;

describe("mutations", () => {
  it("SET_ERROR", () => {
    const state = generateMockState();

    const error = "Example error";

    SET_ERROR(state, error);

    expect(state.error).toBe(error);
  });

  it("SET_IS_LOADING_STOPS", () => {
    const state = generateMockState();

    SET_IS_LOADING_STOPS(state, true);

    expect(state.isLoadingStops).toBe(true);

    SET_IS_LOADING_STOPS(state, false);

    expect(state.isLoadingStops).toBe(false);
  });

  it("SET_SELECTED_BUS_LINE", () => {
    const state = generateMockState();

    const busLine = 103;

    SET_SELECTED_BUS_LINE(state, busLine);

    expect(state.selectedBusLine).toBe(busLine);
  });

  it("SET_SELECTED_BUS_STOP", () => {
    const state = generateMockState();

    const busStop = "Test stop";

    SET_SELECTED_BUS_STOP(state, busStop);

    expect(state.selectedBusStop).toBe(busStop);
  });

  it("SET_STOPS", () => {
    const state = generateMockState();

    const fakeStops: TGetStopsResponse = [
      { line: 103, order: 1, stop: "Test stop", time: "13:23" },
      { line: 103, order: 2, stop: "Another stop", time: "16:22" },
    ];

    SET_STOPS(state, fakeStops);

    expect(state.stops).toBe(fakeStops);
  });
});
