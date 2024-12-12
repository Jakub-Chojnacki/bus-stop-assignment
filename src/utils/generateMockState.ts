import { TState } from "@/store/state";

const generateMockState = (overwrittenState?: Partial<TState>): TState => ({
  isLoadingStops: false,
  error: null,
  stops: [],
  selectedBusLine: null,
  selectedBusStop: null,
  ...overwrittenState,
});

export default generateMockState;
