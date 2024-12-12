import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BaseErrorMessage from "@/components/BaseErrorMessage.vue";

const fakeError = "An error occurred";

describe("BaseErrorMessage.vue", () => {
  it("renders error message", () => {
    const wrapper = mount(BaseErrorMessage, {
      props: {
        error: fakeError,
      },
    });
    expect(wrapper.text()).toContain(fakeError);
  });

  it("renders retry button when handleRetry is provided", () => {
    const handleRetry = vi.fn();
    const wrapper = mount(BaseErrorMessage, {
      props: {
        error: fakeError,
        handleRetry,
      },
    });
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("does not render retry button when handleRetry is not provided", () => {
    const wrapper = mount(BaseErrorMessage, {
      props: {
        error: fakeError,
      },
    });
    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("calls handleRetry when retry button is clicked", async () => {
    const handleRetry = vi.fn();
    const wrapper = mount(BaseErrorMessage, {
      props: {
        error: fakeError,
        handleRetry,
      },
    });
    await wrapper.find("button").trigger("click");
    expect(handleRetry).toHaveBeenCalled();
  });
});
