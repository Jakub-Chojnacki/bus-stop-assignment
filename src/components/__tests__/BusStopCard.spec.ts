import { mount } from "@vue/test-utils";
import BusStopCard from "@/components/BusStopCard.vue";
import generateMockStore from "@/utils/generateMockStore";
import { useStore } from "@/store";

vi.mock("@/store", () => ({
  useStore: vi.fn(),
}));

const setupStoreAndWrapper = () => {
  const fakeData = [
    {
      line: 103,
      order: 1,
      stop: "Test stop",
      time: "13:23",
    },
    {
      line: 103,
      order: 2,
      stop: "Second stop",
      time: "13:33",
    },
  ];
  const store = generateMockStore({
    stops: fakeData,
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

  return { fakeData, store, wrapper };
};

describe("BusStopCard", () => {
  it("shows selected bus line title", () => {
    const { wrapper } = setupStoreAndWrapper();

    expect(wrapper.text()).toContain("Bus Line: 103");
  });

  it("can select a bus stop", () => {
    const { fakeData, store, wrapper } = setupStoreAndWrapper();

    expect(store.state.selectedBusStop).toBe(null);
    const singleBusStopButton = wrapper.find(".single-bus-stop-wrapper");

    expect(singleBusStopButton.exists()).toBe(true);

    singleBusStopButton.trigger("click");

    expect(store.state.selectedBusStop).toBe(fakeData[0].stop);
  });

  it("shows a list of bus stops for the line", () => {
    const { fakeData, store, wrapper } = setupStoreAndWrapper();

    expect(store.state.selectedBusStop).toBe(null);
    const singleBusStopButton = wrapper.find(".single-bus-stop-wrapper");
    expect(singleBusStopButton.text()).toContain(fakeData[0].stop);
  });

  it("can change sorting", async () => {
    const { wrapper } = setupStoreAndWrapper();

    expect(wrapper.vm.sort).toBe("asc");
    const sortingButton = wrapper.find(".bus-sort");
    await sortingButton.trigger("click");
    expect(wrapper.vm.sort).toBe("dsc");
  });
});
