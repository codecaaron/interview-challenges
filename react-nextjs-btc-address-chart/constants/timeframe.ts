import { format, startOfYear, sub } from "date-fns/fp";

export const TIME_FRAMES = {
  all: { start: null, format: format("yyyy") },
  YTD: {
    start: startOfYear,
    format: format("M/d"),
  },
  "12m": {
    start: sub({ months: 12 }),
    format: format("MMM yy"),
  },
  "3m": {
    start: sub({ months: 3 }),
    format: format("M/d"),
  },
  "1m": {
    start: sub({ months: 1 }),
    format: format("M/d"),
  },
};

export type TimeFrames = keyof typeof TIME_FRAMES;
