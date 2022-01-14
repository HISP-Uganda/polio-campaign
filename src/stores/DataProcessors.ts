export function processBarData(data: any, dx: any[]): any[] {
  const x = dx.map((d: any) => {
    return d.label;
  });

  const vaccinated = {
    name: "Vaccinated",
    x,
    y: dx.map(({ value }: any) => data.numerators[value] || 0),
    type: "bar",
    textposition: "auto",
    texttemplate: "%{y}",
    // hoverinfo: "none",
  };

  const target = {
    name: "Target",
    x,
    y: dx.map(() => data.denominators / 3),
    type: "bar",
    textposition: "auto",
    texttemplate: "%{y}",
    // hoverinfo: "none",
  };
  return [vaccinated, target];
}
export function processWastageBarData(
  data: any,
  dx: any[],
  others: any[]
): any[] {
  const x = dx.map((d: any) => {
    return d.label;
  });
  return others.map(({ id, name }) => {
    return {
      name,
      x,
      y: dx.map(({ value }: any) => {
        const filtered = data.numerators.find(([p, d, v]) => {
          return d === id && String(value) === String(p);
        });
        if (filtered) {
          return filtered[2];
        }
        return 0;
      }),
      type: "bar",
      textposition: "auto",
      texttemplate: "%{y}",
      // hoverinfo: "none",
    };
  });
}

export const processSingleValue = (data: any) => {
  if (
    Number(data.numerators) !== NaN &&
    Number(data.denominators) !== NaN &&
    Number(data.denominators) !== 0
  ) {
    return Number(data.numerators) / Number(data.denominators);
  }
  return 0;
};
export const processCoverageValue = (data: any) => {
  if (
    Number(data.numerators) !== NaN &&
    Number(data.denominators) !== NaN &&
    Number(data.denominators) !== 0
  ) {
    return (Number(data.numerators) * 100) / Number(data.denominators);
  }
  return 0;
};

export const calculateStockIndicators = (data: any) => {
  if (
    Number(data.numerators) !== NaN &&
    Number(data.denominators) !== NaN &&
    Number(data.denominators) !== 0
  ) {
    return (Number(data.numerators) / Number(data.denominators)) * 50;
  }
};

export const computeWastage = (data: any) => {
  if (
    Number(data.numerators) !== NaN &&
    Number(data.denominators) !== NaN &&
    Number(data.denominators) !== 0
  ) {
    return (Number(data.numerators) * 50 * 100) / Number(data.denominators);
  }
  return 0;
};

export const computeTeamsTarget = (data: any, days: number) => {
  if (
    Number(data.numerators) !== NaN &&
    Number(data.denominators) !== NaN &&
    Number(data.denominators) !== 0
  ) {
    return (
      (Number(data.numerators) * days) / (Number(data.denominators) * 3 * 3)
    );
  }
  return 0;
};

export const computeTeamsReported = (data: any) => {
  if (
    Number(data.numerators) !== NaN &&
    Number(data.denominators) !== NaN &&
    Number(data.denominators) !== 0
  ) {
    return Number(data.numerators) / (Number(data.denominators) * 3);
  }
  return 0;
};

export const computeStaffTarget = (data: any, days: number) => {
  if (
    Number(data.numerators) !== NaN &&
    Number(data.denominators) !== NaN &&
    Number(data.denominators) !== 0
  ) {
    return (Number(data.numerators) * days) / (Number(data.denominators) * 3);
  }
  return 0;
};

export const calculateReportingRates = (data: any) => {
  if (
    Number(data.numerators) !== NaN &&
    Number(data.denominators) !== NaN &&
    Number(data.denominators) !== 0
  ) {
    return (Number(data.numerators) / Number(data.denominators)) * 100;
  }
  return 0;
};

export function processSublevelPerformance(
  data: any,
  sublevels: { id: string; name: string }[],
  days: number
): any[] {
  const x = sublevels.map(({ name }) => name);

  const target = {
    name: "Target",
    x,
    y: sublevels.map(({ id }) =>
      data.denominators[id] !== undefined
        ? (data.denominators[id] * days) / 3
        : 0
    ),
    type: "bar",
    textposition: "auto",
    texttemplate: "%{y}",
    // hoverinfo: "none",
  };
  const performance = {
    name: "Vaccinated",
    x,
    y: sublevels.map(({ id }) => data.numerators[id] || 0),
    type: "bar",
    textposition: "auto",
    texttemplate: "%{y}",
    // hoverinfo: "none",
  };
  return [target, performance];
}

export function processSublevelWastageData(
  data: any,
  sublevels: { id: string; name: string }[],
  others: any[]
): any[] {
  const x = sublevels.map(({ name }) => name);
  return others.map(({ id: currentDe, name }) => {
    const y = sublevels.map(({ id }) => {
      const dt = data.numerators.find(([p, d]) => d === currentDe && id === p);
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
      // hoverinfo: "none",
    };
  });
}

export function processWastageData(data: any) {
  return [
    {
      values: Object.values(data.numerators),
      labels: Object.keys(data.numerators),
      type: "pie",
      textinfo: "label+percent+name",
      hoverinfo: "label+percent+name",
      textposition: "inside",
      hole: 0.4,
    },
  ];
}
