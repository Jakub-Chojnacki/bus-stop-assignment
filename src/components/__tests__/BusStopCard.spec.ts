import { mount } from "@vue/test-utils";

import { useStore } from "@/store";

import BusStopCard from "@/components/BusStopCard.vue";

import generateMockStore from "@/utils/generateMockStore";

import { fakeStopApiResponse } from "@/constants/test";

vi.mock("@/store", () => ({
  useStore: vi.fn(),
}));

const setupStoreAndWrapper = () => {
  const store = generateMockStore({
    stops: fakeStopApiResponse,
    selectedBusLine: 103,
  });

  vi.mocked(useStore).mockReturnValue(store);

  const wrapper = mount(BusStopCard, {
    global: {
      plugins: [store],
      provide: {
        handleChangeSort: vi.fn(),
      },
    },
    props: {
      line: 103,
    },
  });

  return { fakeStopApiResponse, store, wrapper };
};

describe("BusStopCard", () => {
  it("shows selected bus line title", () => {
    const { wrapper } = setupStoreAndWrapper();

    expect(wrapper.text()).toContain("Bus Line: 103");
  });

  it("can select a bus stop", () => {
    const { fakeStopApiResponse, store, wrapper } = setupStoreAndWrapper();

    expect(store.state.selectedBusStop).toBe(null);
    const singleBusStopButton = wrapper.find(".single-bus-stop-wrapper");

    expect(singleBusStopButton.exists()).toBe(true);

    singleBusStopButton.trigger("click");

    expect(store.state.selectedBusStop).toBe(fakeStopApiResponse[0].stop);
  });

  it("shows a list of bus stops for the line", () => {
    const { fakeStopApiResponse, store, wrapper } = setupStoreAndWrapper();

    expect(store.state.selectedBusStop).toBe(null);
    const singleBusStopButton = wrapper.find(".single-bus-stop-wrapper");
    expect(singleBusStopButton.text()).toContain(fakeStopApiResponse[0].stop);
  });

  it("can change sorting", async () => {
    const { wrapper } = setupStoreAndWrapper();

    expect(wrapper.vm.sort).toBe("asc");

    const sortingButton = wrapper.find(".bus-sort");

    await sortingButton.trigger("click");
    
    expect(wrapper.vm.sort).toBe("dsc");
  });
});
