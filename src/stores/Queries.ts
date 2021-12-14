import { useDataEngine } from "@dhis2/app-runtime";
import { useQuery } from "react-query";
import { fromPairs } from "lodash";
interface AnalyticsOptions {
  filterByOu: boolean;
  filterByDx: boolean;
  filterByPe: boolean;
  series?: "ou" | "dx" | "pe";
}
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

export function useSqlView(
  sqlView: string,
  parameters: { [key: string]: string } = {}
) {
  const engine = useDataEngine();

  const key = Object.entries(parameters).flatMap((val) => {
    return val;
  });
  const conditions = Object.entries(parameters)
    .map(([col, val]) => {
      return `var=${col}:${val}`;
    })
    .join("&");
  const query = {
    analytics: {
      resource: !!conditions
        ? `sqlViews/${sqlView}/data?${conditions}&paging=false`
        : `sqlViews/${sqlView}/data?paging=false`,
    },
  };
  return useQuery<any, Error>(
    ["query", sqlView, ...key],
    async () => {
      const {
        analytics: {
          listGrid: { rows, headers },
        },
      }: any = await engine.query(query);

      if (headers.length === 2) {
        return fromPairs(rows);
      }
      return rows;
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
