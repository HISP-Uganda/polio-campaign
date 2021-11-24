import { useDataEngine } from "@dhis2/app-runtime";
import { useQuery } from "react-query";

export function useLoader() {
    const engine = useDataEngine();
    const query = {
        me: {
            resource: "me.json"
        }
    };
    return useQuery<any, Error>("initial", async () => {
        const {me}:any  = await engine.query(query);
        return me
    });
}