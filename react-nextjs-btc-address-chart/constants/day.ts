export const LABELS = {
  Time: "time",
  "BTC / Addr Cnt of Bal ≥ $1K": ">1k",
  "BTC / Val in Addrs w/ Bal ≥ $10K USD": ">10k",
  "BTC / Val in Addrs w/ Bal ≥ $100K USD": ">100k",
  "BTC / Val in Addrs w/ Bal ≥ $1M USD": ">1m",
  "BTC / Val in Addrs w/ Bal ≥ $10M USD": ">10m",
} as const;

export type Day = Record<typeof LABELS[keyof typeof LABELS], number>;
