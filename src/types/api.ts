// GET /stops
export type TSingleStop = {
  line: number;
  stop: string;
  order: number;
  time: string;
};

export type TGetStopsResponse = TSingleStop[];
