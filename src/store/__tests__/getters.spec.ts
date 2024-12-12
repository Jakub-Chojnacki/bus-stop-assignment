import generateMockStore from "@/utils/generateMockStore";

describe("mutations", () => {
  it("GET_UNIQUE_LINES", () => {
    const store = generateMockStore({
      stops: [
        { line: 103, order: 1, stop: "Test stop", time: "13:23" },
        { line: 104, order: 1, stop: "Test stop", time: "13:23" },
        { line: 103, order: 1, stop: "Test stop", time: "13:23" },
      ],
    });

    const uniqueLines = store.getters["GET_UNIQUE_LINES"];

    expect(Array.isArray(uniqueLines)).toBe(true);
    expect(uniqueLines).toEqual([103, 104]);
  });

  it("GET_BUS_STOPS_FOR_LINE", () => {
    const firstStopName = "Test stop";
    const secondStopName = "Second stop";
    const thirdStopName = "Third stop - different line";

    const store = generateMockStore({
      stops: [
        { line: 103, order: 1, stop: firstStopName, time: "13:23" },
        { line: 103, order: 2, stop: secondStopName, time: "10:23" },
        { line: 104, order: 1, stop: thirdStopName, time: "13:55" },
      ],
    });

    const busStops = store.getters["GET_BUS_STOPS_FOR_LINE"](103, "asc");

    expect(Array.isArray(busStops)).toBe(true);
    expect(busStops).toEqual([firstStopName, secondStopName]);
  });

  it("GET_TIMES_FOR_STOP", () => {
    const firstStopName = "Test stop";
    const secondStopName = "Second stop";
    const thirdStopName = "Third stop - different line";

    const firstTime = "10:44";
    const secondTime = "13:23";

    const store = generateMockStore({
      stops: [
        { line: 103, order: 1, stop: firstStopName, time: firstTime },
        { line: 103, order: 1, stop: firstStopName, time: secondTime },
        { line: 103, order: 2, stop: secondStopName, time: "10:23" },
        { line: 104, order: 1, stop: thirdStopName, time: "13:55" },
      ],
    });

    const busTimes = store.getters["GET_TIMES_FOR_STOP"](firstStopName);

    expect(Array.isArray(busTimes)).toBe(true);
    expect(busTimes).toEqual([firstTime, secondTime]);
  });

  it("GET_FILTERED_STOPS", () => {
    const firstStopName = "Test stop";
    const secondStopName = "Second stop";
    const thirdStopName = "Third stop - different line";
    const fourthStopName = "Fourth stop - different line";
    const filter = "different";

    const store = generateMockStore({
      stops: [
        { line: 103, order: 1, stop: firstStopName, time: "10:45" },
        { line: 103, order: 1, stop: secondStopName, time: "13:22" },
        { line: 103, order: 2, stop: thirdStopName, time: "10:23" },
        { line: 104, order: 1, stop: fourthStopName, time: "13:55" },
      ],
    });

    const filteredStopsAscending = store.getters["GET_FILTERED_STOPS"](
      filter,
      "asc"
    );

    expect(Array.isArray(filteredStopsAscending)).toBe(true);
    expect(filteredStopsAscending).toEqual([fourthStopName, thirdStopName]);

    const filteredStopsDescending = store.getters["GET_FILTERED_STOPS"](
      filter,
      "dsc"
    );
    expect(Array.isArray(filteredStopsDescending)).toBe(true);
    expect(filteredStopsDescending).toEqual([thirdStopName, fourthStopName]);
  });
});
