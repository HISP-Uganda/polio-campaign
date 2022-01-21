import { Box, Spinner } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { FC } from "react";
import { Indicator } from "../interfaces";
import { useMaps } from "../stores/Queries";
import { $store } from "../stores/Store";
import Map from "./Map";
const MapVisualization: FC<{
  indicator: Indicator;
  title: string;
  processor: (...data: any[]) => any;
  otherArgs?: any[]
}> = ({ indicator, title, processor,otherArgs }) => {
  const store = useStore($store);
  const { isLoading, isError, isSuccess, error, data } = useMaps(
    store.currentLevel,
    store.selectedUnits
  );
  return (
    <>
      {isLoading && <Spinner />}
      {isSuccess && (
        <Map
          metadata={data}
          indicator={indicator}
          center={data.mapCenter}
          processor={processor}
          title={title}
          otherArgs={otherArgs}
        />
      )}
      {isError && <Box>{error.message}</Box>}
    </>
  );
};

export default MapVisualization;
