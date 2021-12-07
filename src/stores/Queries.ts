import { useDataEngine } from "@dhis2/app-runtime";
import { useQuery } from "react-query";
interface AnalyticsOptions {
    filterByOu: boolean;
    filterByDx: boolean;
    filterByPe: boolean;
    series?: 'ou' | 'dx' | 'pe';
}
export function useLoader() {
    const engine = useDataEngine();
    const query = {
        me: {
            resource: "me.json"
        }
    };
    return useQuery<any, Error>("initial", async () => {
        const { me }: any = await engine.query(query);
        return me
    });
}

export function useAnalytics(dx: string, pe: string, ou: string, filterByDx: boolean = false, filterByOu: boolean = true, filterByPe: boolean = true) {
    const engine = useDataEngine();
    const dimensions = [];
    const filters = [];
    if (filterByDx) {
        filters.push(`dx:${dx}`)
    } else {
        dimensions.push(`dx:${dx}`)
    }
    if (filterByOu) {
        filters.push(`ou:${ou}`)
    } else {
        dimensions.push(`ou:${ou}`)
    }
    if (filterByPe) {
        filters.push(`pe:${pe}`)
    } else {
        dimensions.push(`pe:${pe}`)
    }

    let params: any = {
        dimension: dimensions.join(',')
    }

    if (filters.length > 0) {
        params = {
            ...params,
            filter: filters.join(',')
        }
    }
    const query = {
        analytics: {
            resource: "analytics.json",
            params
        }
    };
    return useQuery<any, Error>("initial", async () => {
        const { analytics }: any = await engine.query(query);
        return analytics
    });
}