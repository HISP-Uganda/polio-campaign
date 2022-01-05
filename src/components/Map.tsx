import Plot from "react-plotly.js";
import { Box } from "@chakra-ui/react";
import { useSqlView } from "../stores/Queries";
import { Indicator } from "../interfaces";
import { FC } from "react";
const Map: FC<{ metadata: any; indicator: Indicator }> = ({
  metadata,
  indicator,
}) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <>
      {isLoading && <Box>Loading</Box>}
      {isSuccess && (
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
            title: {
              text: "Test title",
              font: {
                // color: "yellow",
              },
            },
            mapbox: {
              style: "open-street-map",
              center: { lon: 32.3, lat: 1.5 },
              zoom: 6.1,
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
      )}
      {isError && <Box>{error.message}</Box>}
    </>
  );
};

export default Map;
