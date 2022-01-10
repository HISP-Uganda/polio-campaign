import Plot from "react-plotly.js";
import { Box, Spinner, Flex, Text } from "@chakra-ui/react";
import { useSqlView } from "../stores/Queries";
import { Indicator } from "../interfaces";
import { FC } from "react";
import { Position } from "@turf/turf";
import { $store } from "../stores/Store";
import { useStore } from "effector-react";
const Map: FC<{
  metadata: any;
  indicator: Indicator;
  center: Position;
  title:string;
}> = ({ metadata, indicator, center,title }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  const store = useStore($store);
  return (
    <Flex
      h="100%"
      w="100%"
      flex={1}
      direction="column"
      alignItems="center"
      justifyItems="center"
      justifyContent="center"
    >
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          <Text fontSize="md">
            {title}
          </Text>
          <Plot
            data={[
              {
                type: "choroplethmapbox",
                locations: metadata.organisationUnits.map(
                  (ou: { id: string; name: string }) => ou.name
                ),
                z: metadata.organisationUnits.map(
                  ({ id }) => data.numerators[id] || 0
                ),
                featureidkey: "properties.name",
                geojson: metadata.geojson,
              } as any,
            ]}
            layout={{
              mapbox: {
                style: "open-street-map",
                center: { lon: center[0], lat: center[1] },
                zoom: store.zoom,
              },
              autosize: true,
              margin: {
                pad: 0,
                r: 0,
                t: 0,
                l: 0,
                b: 0,
              },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            config={{ displayModeBar: false, responsive: true }}
          />
        </>
      )}
      {isError && <Box>{error.message}</Box>}
    </Flex>
  );
};

export default Map;
