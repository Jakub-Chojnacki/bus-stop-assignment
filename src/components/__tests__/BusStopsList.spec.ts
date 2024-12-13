import { mount } from "@vue/test-utils";

import { useStore } from "@/store";
import { MutationTypes } from "@/store/mutations";

import BusStopsList from "@/components/BusStopsList.vue";

import generateMockStore from "@/utils/generateMockStore";

import { fakeStopApiResponse } from "@/constants/test";

vi.mock("@/store", () => ({
  useStore: vi.fn(),
}));

const setupStore = () => {
  const store = generateMockStore({
    stops: fakeStopApiResponse,
    selectedBusLine: 103,
  });

  vi.mocked(useStore).mockReturnValue(store);

  return { fakeStopApiResponse, store };
};

describe("BusStopList", () => {
  it("shows loading state", () => {
    const { store } = setupStore();

    store.commit(MutationTypes.SET_IS_LOADING_STOPS, true);

    const wrapper = mount(BusStopsList, {
      plugins: [store],
    });

    expect(wrapper.vm.isLoadingStops).toBe(true);
    expect(wrapper.find('[data-test-id="spinner"]').exists()).toBe(true);
  });

  it("shows error state", () => {
    const { store } = setupStore();

    const error = "Example error message";

    store.commit(MutationTypes.SET_ERROR, error);

    const wrapper = mount(BusStopsList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('[data-test-id="spinner"]').exists()).toBe(false);
    expect(wrapper.find(".error-wrapper").exists()).toBe(true);
    expect(wrapper.text()).toContain(error);
  });

  it("shows all stops when search input is empty", () => {
    const { store, fakeStopApiResponse } = setupStore();

    const wrapper = mount(BusStopsList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find(".scroll-wrapper").text()).toContain(
      fakeStopApiResponse[0].stop
    );
    expect(wrapper.find(".scroll-wrapper").text()).toContain(
      fakeStopApiResponse[1].stop
    );
  });

  it("filters bus stops based on the searchValue", async () => {
    const { store } = setupStore();

    const wrapper = mount(BusStopsList, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.vm.busStops.length).toBe(2);

    wrapper.vm.searchValue = "Second stop";
    
    expect(wrapper.vm.busStops.length).toBe(1);
  });
});
