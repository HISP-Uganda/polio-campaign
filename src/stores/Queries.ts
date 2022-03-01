import { useDataEngine } from "@dhis2/app-runtime";
import { useQuery } from "react-query";
import { fromPairs, isEmpty } from "lodash";
import { Indicator } from "../interfaces";
import { setSelectedUnits, setSublevels, setUserUnits } from "./Events";
import { center } from "@turf/turf";

export function useLoader() {
  const engine = useDataEngine();
  const query = {
    me: {
      resource: "me.json",
      params: {
        fields: "organisationUnits[id,level,name,leaf]",
      },
    },
    regions: {
      resource: "organisationUnits.json",
      params: {
        fields: "id,name",
        level: 2,
        order: "shortName:desc",
      },
    },
  };
  return useQuery<any, Error>("initial", async () => {
    const {
      me: { organisationUnits },
      regions: { organisationUnits: units },
    }: any = await engine.query(query);
    const processedUnits = organisationUnits.map((unit: any) => {
      return {
        id: unit.id,
        pId: unit.pId || "",
        value: unit.id,
        title: unit.name,
        isLeaf: unit.leaf,
        level: unit.level,
      };
    });
    setUserUnits(processedUnits);
    setSelectedUnits(processedUnits[0].id);
    setSublevels(units);
    return true;
  });
}

export function useSqlView(indicator: Indicator) {
  const engine = useDataEngine();
  const numeratorKeys = Object.entries(indicator.numerator.parameters).flatMap(
    (val) => {
      return val;
    }
  );
  const denominatorKeys = Object.entries(
    indicator.denominator.parameters
  ).flatMap((val) => {
    return val;
  });

  const others = indicator.other ? indicator.other.parameters : {};

  const otherKeys = Object.entries(others).flatMap((val) => {
    return val;
  });

  const numeratorConditions = Object.entries(indicator.numerator.parameters)
    .map(([col, val]) => {
      return `var=${col}:${val}`;
    })
    .join("&");

  const denominatorConditions = Object.entries(indicator.denominator.parameters)
    .map(([col, val]) => {
      return `var=${col}:${val}`;
    })
    .join("&");

  const otherConditions = Object.entries(others)
    .map(([col, val]) => {
      return `var=${col}:${val}`;
    })
    .join("&");

  let query: any = {
    numerator: {
      resource: !!numeratorConditions
        ? `sqlViews/${indicator.numerator.sqlView}/data?${numeratorConditions}&paging=false`
        : `sqlViews/${indicator.numerator.sqlView}/data?paging=false`,
    },
  };
  if (!isEmpty(indicator.denominator)) {
    query = {
      ...query,
      denominator: {
        resource: !!denominatorConditions
          ? `sqlViews/${indicator.denominator.sqlView}/data?${denominatorConditions}&paging=false`
          : `sqlViews/${indicator.denominator.sqlView}/data?paging=false`,
      },
    };
  }
  if (!isEmpty(indicator.other)) {
    query = {
      ...query,
      other: {
        resource: !!otherConditions
          ? `sqlViews/${indicator.other.sqlView}/data?${otherConditions}&paging=false`
          : `sqlViews/${indicator.other.sqlView}/data?paging=false`,
      },
    };
  }

  return useQuery<any, Error>(
    [
      "query",
      indicator.numerator.sqlView,
      indicator.denominator.sqlView,
      ...numeratorKeys,
      ...denominatorKeys,
      ...otherKeys,
    ],
    async () => {
      const {
        numerator: {
          listGrid: { rows: numRows, headers: numHeaders },
        },
        denominator: {
          listGrid: { rows: denRows, headers: denHeaders },
        },
        ...other
      }: any = await engine.query(query);
      let numerators: any = numRows;
      let denominators: any = denRows;
      let others: any = {};
      if (numHeaders.length === 2) {
        numerators = fromPairs(numRows);
      } else if (numHeaders.length === 1) {
        numerators = numRows[0]?.[0];
      }
      if (denHeaders.length === 2) {
        denominators = fromPairs(denRows);
      } else if (numHeaders.length === 1) {
        denominators = denRows[0]?.[0];
      }
      if (other.other) {
        const {
          listGrid: { rows: otherRows, headers: otherHeaders },
        } = other.other;
        if (otherHeaders.length === 1) {
          others = { ...others, other: otherRows[0][0] };
        } else if (otherHeaders.length === 2) {
          others = { ...others, other: fromPairs(otherRows) };
        } else {
          others = { ...others, otherHeaders, other: otherRows };
        }
      }
      return {
        numerators,
        numHeaders,
        denHeaders,
        denominators,
        ...others,
      };
    },
    {
      refetchInterval: 1000 * 10,
    }
  );
}

export const useMaps = (level: number, parent: string) => {
  const engine = useDataEngine();
  const query = {
    geojson: {
      resource: "organisationUnits.geojson",
      params: {
        level,
        parent,
      },
    },
    locations: {
      resource: "organisationUnits.json",
      params: {
        level,
        fields: "id,name",
        paging: false,
      },
    },
  };

  return useQuery<any, Error>(["maps", level, parent], async () => {
    const {
      geojson,
      locations: { organisationUnits },
    }: any = await engine.query(query);
    const mapCenter = center(geojson).geometry.coordinates;
    return {
      geojson,
      mapCenter,
      organisationUnits,
    };
  });
};

export function useUserOrgUnit() {
  const engine = useDataEngine();
  const query = {
    response: {
      resource: "organisationUnits.json",
      params: {
        level: 1,
        fields: "id,name,leaf",
      },
    },
  };
  return useQuery<any, Error>("userOrganisations", async () => {
    const {
      response: { organisationUnits },
    }: any = await engine.query(query);
    return organisationUnits.map((unit: any) => {
      return {
        id: unit.id,
        pId: unit.pId || "",
        value: unit.id,
        title: unit.name,
        isLeaf: unit.leaf,
      };
    });
  });
}
