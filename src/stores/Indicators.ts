import { Indicator } from "../interfaces";

type func = (...args: any[]) => Indicator;

export const mainDashboard: { [key: string]: func } = {
  performance: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "eXLGUbjauwc",
        parameters: {
          dx: "Tk6RjMskA93",
          parent,
          aoc,
        },
      },
      denominator: {
        sqlView: "PSJh5UBG3Nd",
        parameters: { parent, dx: "NPtjF45ruWX" },
      },
    };
  },
  subLevelPerformance: (parent, part, aoc) => {
    return {
      numerator: {
        sqlView: "yDJUeci0pSi",
        parameters: {
          dx: "Tk6RjMskA93",
          parent,
          part,
          aoc,
        },
      },
      denominator: {
        sqlView: "ev6fFZlMJu0",
        parameters: {
          dx: "NPtjF45ruWX",
          parent,
          part,
        },
      },
    };
  },
  wastage: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "nWziq9Yr0mA",
        parameters: {
          dx: "OeItYwoZ3RK",
          parent,
          aoc,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  sublevelWastage: (parent, part, aoc) => {
    return {
      numerator: {
        sqlView: "Zd4pmzH9wr3",
        parameters: {
          dx: "OeItYwoZ3RK",
          parent,
          part,
          aoc,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  posts: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "Ao09K7cUj5m",
        parameters: {
          parent,
          aoc,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  reported: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "yrs3dM9IbGx",
        parameters: { parent, aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  afpCases: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "jPQfkKWugQB", aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  aefiCases: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Wib85iEPHIF", aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  totalWorkers: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "gfIhVhuWVHr", aoc },
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
        sqlView: "PSJh5UBG3Nd",
        parameters: { parent, dx: "NPtjF45ruWX" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  vaccinated: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Tk6RjMskA93", aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  zeroDose: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "gpdvfDm3eVp", aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  coverage: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Tk6RjMskA93", aoc },
      },
      denominator: {
        sqlView: "PSJh5UBG3Nd",
        parameters: { parent, dx: "NPtjF45ruWX" },
      },
    };
  },
  issued: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Sfw4l2p8IpA", aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  returned: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "UqHuKPGmatX", aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  available: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "ZZ71Sw0pjMf", aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  discarded: (parent, aoc,dx) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx, aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  used: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Sfw4l2p8IpA", aoc },
      },
      denominator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "UqHuKPGmatX", aoc },
      },
    };
  },
  rates: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "yrs3dM9IbGx",
        parameters: {
          parent,
          aoc,
        },
      },
      denominator: {
        sqlView: "Ao09K7cUj5m",
        parameters: {
          level: "4",
          parent,
        },
      },
    };
  },
  districts: (parent, part, aoc) => {
    return {
      numerator: {
        sqlView: "zHnhTlh7Hbd",
        parameters: {
          dx: "Tk6RjMskA93",
          part,
          parent,
          aoc,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  districtCoverage: (parent, part, aoc) => {
    return {
      numerator: {
        sqlView: "zHnhTlh7Hbd",
        parameters: {
          dx: "Tk6RjMskA93",
          part,
          parent,
          aoc,
        },
      },
      denominator: {
        sqlView: "afxvxjTLBTW",
        parameters: {
          dx: "NPtjF45ruWX",
          part,
          parent,
        },
      },
    };
  },
  districtsWastage: (parent, part, aoc) => {
    return {
      numerator: {
        sqlView: "zHnhTlh7Hbd",
        parameters: {
          dx: "K3QB60hWuQI",
          part,
          parent,
          aoc,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  wastageSummary: (parent, aoc,dx) => {
    return {
      numerator: {
        sqlView: "PiiwBdbBm7Z",
        parameters: {
          dx,
          parent,
          aoc,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  realWastage: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Sfw4l2p8IpA", aoc },
      },
      denominator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "UqHuKPGmatX", aoc },
      },
      other: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Tk6RjMskA93", aoc },
      },
    };
  },
  table: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "K7bTNXbz37B",
        parameters: {
          parent,
          aoc,
        },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },

  staffTarget: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "PSJh5UBG3Nd",
        parameters: { parent, dx: "itEQ0muVdaW" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  staffReported: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "gfIhVhuWVHr", aoc },
      },
      denominator: {
        sqlView: "gffuV4VC4AC",
        parameters: { parent, dx: "gfIhVhuWVHr", aoc, coc: "biWOWFj4zxB" },
      },
    };
  },
  staffTeamTarget: (parent) => {
    return {
      numerator: {
        sqlView: "PSJh5UBG3Nd",
        parameters: { parent, dx: "VzJHUfApDOt" },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  staffTeamReported: (parent, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "gfIhVhuWVHr", aoc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  staffing: (parent, dx, aoc, coc) => {
    return {
      numerator: {
        sqlView: "gffuV4VC4AC",
        parameters: { parent, dx, aoc, coc },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  nationalTarget: (parent, dx) => {
    return {
      numerator: {
        sqlView: "o0xJEcpE83O",
        parameters: { parent, dx },
      },
      denominator: {
        sqlView: "ezh2YYPPeLN",
        parameters: {},
      },
    };
  },
  nationalCoverage: (parent, dx, aoc) => {
    return {
      numerator: {
        sqlView: "XMsx2OmhqBa",
        parameters: { parent, dx: "Tk6RjMskA93", aoc },
      },
      denominator: {
        sqlView: "o0xJEcpE83O",
        parameters: { parent, dx },
      },
    };
  },
};
