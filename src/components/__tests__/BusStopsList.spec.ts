import { mount } from "@vue/test-utils";
import BusStopsList from "@/components/BusStopsList.vue";

describe("BusStopList", () => {
  it("renders correctly", () => {
    const wrapper = mount(BusStopsList);
    expect(wrapper.exists()).toBe(true);
  });

  it.todo("shows loading state", () => {});

  it.todo("shows error state", () => {});

  it.todo("shows all stops when search input is empty", () => {});

  it.todo(
    "shows filtered stops after inputting values into searchInput",
    () => {}
  );

  it.todo(
    "shows a message if there are no stops that match the filter",
    () => {}
  );
});
