import { uniq } from "lodash";
import { parseISO, format } from "date-fns";
export function processBarData(
  data: any,
  dx: { id: string; name: string }[]
): any[] {
  const x = uniq(data.numerators.map(([p]) => p).sort());
  const realX = x.map((i: any) => format(parseISO(i), "MMM dd"));
  return dx.map(({ id, name }) => {
    const y = x.map((i) => {
      const dt = data.numerators.find(([p, d]) => d === id && i === p);
      if (dt) {
        return dt[2];
      }
      return 0;
    });
    return {
      name: name,
      x: realX,
      y,
      type: "bar",
      textposition: "auto",
      texttemplate: "%{y}",
      hoverinfo: "none",
    };
  });
}

export function processSublevelData(
  data: any,
  dx: { id: string; name: string }[]
): any[] {
  const x = uniq(data.numerators.map(([p]) => p).sort());
  return dx.map(({ id, name }) => {
    const y = x.map((i) => {
      const dt = data.numerators.find(([p, d]) => d === id && i === p);
      if (dt) {
        return dt[2];
      }
      return 0;
    });
    return {
      name: name,
      x,
      y,
      type: "bar",
      textposition: "auto",
      texttemplate: "%{y}",
      hoverinfo: "none",
    };
  });
}

export function processWastageData(data: any) {
  return [
    {
      type: "bar",
      y: Object.keys(data.numerators),
      x: Object.values(data.numerators),
      orientation: "h",
      textposition: "inside",
      texttemplate: "%{x}",
      barmode: "overlay",
      showlegend: false,
      hoverinfo: "none",
      marker: {
        color: "rgb(211, 41, 61)",
      },
    },
  ];
}
