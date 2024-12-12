import { mount } from "@vue/test-utils";

import { useStore } from "@/store";

import BusTimeCard from "@/components/BusTimeCard.vue";

import generateMockStore from "@/utils/generateMockStore";

import { fakeStopApiResponse } from "@/constants/test";

vi.mock("@/store", () => ({
  useStore: vi.fn(),
}));

const setupStore = () => {
  const store = generateMockStore({
    stops: fakeStopApiResponse,
    selectedBusLine: 103,
    selectedBusStop: fakeStopApiResponse[0].stop,
  });

  vi.mocked(useStore).mockReturnValue(store);

  return { fakeStopApiResponse, store };
};

describe("BusTimeCard", () => {
  it("shows selected bus stop title", () => {
    const { store } = setupStore();

    const wrapper = mount(BusTimeCard, {
      plugins: [store],
    });

    expect(wrapper.find(".bus-card-heading").text()).toContain(
      `Bus Stop: ${store.state.selectedBusStop}`
    );
  });

  it("shows a list of bus times for the bus stop", () => {
    const { store } = setupStore();

    const wrapper = mount(BusTimeCard, {
      plugins: [store],
    });

    const allBusTimes = wrapper.findAll(".single-bus-wrapper");

    expect(allBusTimes[0].text()).toContain(store.state.stops[0].time);
    expect(allBusTimes[1].text()).toContain(store.state.stops[1].time);
  });
});
