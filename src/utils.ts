export const formatter = Intl.NumberFormat("en", {
  notation: "standard",
  // maximumSignificantDigits: 3,
  maximumFractionDigits: 2,
  // minimumSignificantDigits: 3,
  // minimumIntegerDigits:2
});

export const UNIT_DIS = {
  1: 3,
  2: 3,
  3: 4,
  4: 4,
};
export const ZOOMS = {
  1: 6.0,
  2: 7.5,
  3: 9.0,
  4: 9.0,
};

export const findColor = (value: number) => {
  if (value <= 50) {
    return "#d7191c";
  }
  if (value <= 80) {
    return "#fdae61";
  }
  if (value <= 90) {
    return "#a6d96a";
  }
  return "#1a9641";
};

export const findWastageColor = (value: number) => {
  if (value <= 5) {
    return "#1a9641";
  }
  return "#d7191c";
};
