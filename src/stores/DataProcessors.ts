export function processBarData(data: any, dx: string[]): any[] {
  const days = [
    "2021-11-28",
    "2021-12-01",
    "2021-12-11",
    "2021-12-12",
    "2021-12-13",
  ];
  const x = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  return dx.map((dataElement) => {
    const filtered = data.numerators.filter(([p, d, v]) => d === dataElement);
    const y = days.map((day) => {
      const search = filtered.find(([p, d, v]) => p === day);
      if (search) {
        return search[2];
      }
      return 0;
    });
    return {
      name: dataElement,
      x,
      y,
      type: "bar",
    };
  });
}
