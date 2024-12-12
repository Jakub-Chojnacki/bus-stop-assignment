import { mount } from "@vue/test-utils";
import BusTimeCard from "@/components/BusTimeCard.vue";

describe("BusTimeCard", () => {
  it("renders correctly", () => {
    const wrapper = mount(BusTimeCard);
    expect(wrapper.exists()).toBe(true);
  });

  it.todo("shows selected bus stop title", () => {});

  it.todo("shows a list of bus times for the bus stop", () => {});
});
