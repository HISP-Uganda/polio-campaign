import { Indicator } from "../interfaces";

type func = (...args: any[]) => Indicator;

export const mainDashboard: { [key: string]: func } = {
  performance: (parent) => {
    return {
      numerator: {
        sqlView: "eXLGUbjauwc",
        parameters: {
          dx: "rkPK3fYEJzh",
          dx1: "Tk6RjMskA93",
          parent,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  subLevelPerformance: (parent, part) => {
    return {
      numerator: {
        sqlView: "yDJUeci0pSi",
        parameters: {
          dx: "gfIhVhuWVHr",
          dx1: "rkPK3fYEJzh",
          parent,
          part,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  wastage: (parent) => {
    return {
      numerator: {
        sqlView: "nWziq9Yr0mA",
        parameters: {
          dx: "K3QB60hWuQI",
          parent,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  sublevelWastage: (parent, part) => {
    return {
      numerator: {
        sqlView: "Zd4pmzH9wr3",
        parameters: {
          dx: "K3QB60hWuQI",
          parent,
          part,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  posts: (parent) => {
    return {
      numerator: {
        sqlView: "Ao09K7cUj5m",
        parameters: {
          level: "4",
          parent,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  reported: (parent) => {
    return {
      numerator: {
        sqlView: "yrs3dM9IbGx",
        parameters: { parent },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  afpCases: (parent) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "jPQfkKWugQB" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  aefiCases: (parent) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Wib85iEPHIF" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  totalWorkers: (parent) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "gfIhVhuWVHr" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  target: (parent) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "NPtjF45ruWX" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  vaccinated: (parent) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "rkPK3fYEJzh" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  coverage: (parent) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "rkPK3fYEJzh" },
      },
      denominator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "NPtjF45ruWX" },
      },
    };
  },
  issued: (parent) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Sfw4l2p8IpA" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  balance: (parent) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "ZZ71Sw0pjMf" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  discarded: (parent) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "K3QB60hWuQI" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  used: (parent) => {
    return {
      numerator: {
        sqlView: "BTv5W2gZAA8",
        parameters: { parent, dx1: "Sfw4l2p8IpA", dx2: "UqHuKPGmatX" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  rates: (parent) => {
    return {
      numerator: {
        sqlView: "nhTTbZ0iijU",
        parameters: {
          parent,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  districts: (parent, part) => {
    return {
      numerator: {
        sqlView: "zHnhTlh7Hbd",
        parameters: {
          dx: "K3QB60hWuQI",
          part,
          parent,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  wastageSummary: (parent) => {
    return {
      numerator: {
        sqlView: "PiiwBdbBm7Z",
        parameters: {
          dx: "K3QB60hWuQI",
          parent,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
};
