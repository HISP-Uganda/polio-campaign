import { useDataEngine } from "@dhis2/app-runtime";
import { useQuery } from "react-query";
import { fromPairs, isEmpty } from "lodash";
import { Indicator } from "../interfaces";

export function useLoader() {
  const engine = useDataEngine();
  const query = {
    me: {
      resource: "me.json",
    },
  };
  return useQuery<any, Error>("initial", async () => {
    const { me }: any = await engine.query(query);
    return me;
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

  return useQuery<any, Error>(
    [
      "query",
      indicator.numerator.sqlView,
      indicator.denominator?.sqlView,
      ...numeratorKeys,
      ...denominatorKeys,
    ],
    async () => {
      const {
        numerator: {
          listGrid: { rows: numRows, headers: numHeaders },
        },
        denominator: {
          listGrid: { rows: denRows, headers: denHeaders },
        },
      }: any = await engine.query(query);
      let numerators: any = numRows;
      let denominators: any = denRows;
      if (numHeaders.length === 2) {
        numerators = fromPairs(numRows);
      } else if (numHeaders.length === 1) {
        numerators = numRows[0][0];
      }
      if (denHeaders.length === 2) {
        denominators = fromPairs(denRows);
      } else if (numHeaders.length === 1) {
        denominators = denRows[0][0];
      }
      return {
        numerators,
        denominators,
      };
    },
    {
      refetchInterval: 1000 * 5,
    }
  );
}

export const useMaps = (level = 3) => {
  const engine = useDataEngine();
  const query = {
    geojson: {
      resource: "organisationUnits.geojson",
      params: {
        level,
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

  return useQuery<any, Error>("initial", async () => {
    const {
      geojson,
      locations: { organisationUnits },
    }: any = await engine.query(query);
    return {
      geojson,
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