export const formatNumber = (value: number | string) =>
  typeof value === "string"
    ? value
    : Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(value);
