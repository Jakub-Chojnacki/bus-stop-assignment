import { mount } from "@vue/test-utils";
import { useStore } from "@/store";

import BusLineSelect from "@/components/BusLineSelect.vue";
import { MutationTypes } from "@/store/mutations";
import generateMockStore from "@/utils/generateMockStore";

vi.mock("@/store", () => ({
  useStore: vi.fn(),
}));

const setupStore = () => {
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

  return { fakeData, store };
};

describe("BusLineSelect", () => {
  it("shows loader while fetching", async () => {
    const { store } = setupStore();

    store.commit(MutationTypes.SET_IS_LOADING_STOPS, true);

    const wrapper = mount(BusLineSelect, {
      global: {
        plugins: [store],
      },
      props: {
        line: 103,
      },
    });

    expect(wrapper.text()).toContain("Select Bus Line");

    expect(wrapper.find('[data-test-id="spinner"]').exists()).toBe(true);
  });

  it("shows error message", () => {
    const { store } = setupStore();
    const error = "Example error message";
    store.commit(MutationTypes.SET_ERROR, error);

    const wrapper = mount(BusLineSelect, {
      global: {
        provide: {
          store,
        },
      },
    });

    expect(wrapper.find('[data-test-id="spinner"]').exists()).toBe(false);
    expect(wrapper.find(".error-wrapper").exists()).toBe(true);
    expect(wrapper.text()).toContain(error);
  });

  it("shows a list of SingleBusLine", async () => {
    const { store } = setupStore();
    const fakeData = [
      {
        line: 103,
        order: 1,
        stop: "Test stop",
        time: "13:23",
      },
    ];

    store.commit(MutationTypes.SET_STOPS, fakeData);

    const wrapper = mount(BusLineSelect, {
      global: {
        provide: {
          store,
        },
      },
    });

    expect(wrapper.find('[data-test-id="spinner"]').exists()).toBe(false);
    expect(wrapper.find(".error-wrapper").exists()).toBe(false);
    expect(wrapper.find(".bus-line-wrapper").text()).toContain(
      fakeData[0].line
    );

    const busLineButton = wrapper.find(".bus-line-wrapper");
    await busLineButton.trigger("click");

    expect(store.state.selectedBusLine).toBe(fakeData[0].line);
  });
});
