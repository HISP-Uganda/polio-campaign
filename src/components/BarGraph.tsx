import { FC } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import Plot from "react-plotly.js";
import { useSqlView } from "../stores/Queries";
import { Indicator } from "../interfaces";

export const BarGraph: FC<{
  indicator: Indicator;
  others: any;
  processor: (data: any, others: any) => any;
}> = ({ indicator, processor, others }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <Stack h="100%">
      <Text textAlign="center" fontSize="2xl">
        A Fancy Plot
      </Text>
      {isLoading && <Box>Loading...</Box>}
      {isSuccess && (
        <Plot
          data={processor(data, others)}
          layout={{
            // title: "A Fancy Plot",
            barmode: "group",
            autosize: true,
            legend: {
              orientation: "h",
              yanchor: "bottom",
              y: -0.15,
              xanchor: "right",
              x: 0.6,
            },
            margin: {
              pad: 0,
              // r: 0,
              t: 0,
              // l: 0,
              // b: 20,
            },
            yaxis: {
              showgrid: true,
              zeroline: true,
              gridcolor: "lightgray",
              zerolinecolor: "lightgray",
            },
          }}
          style={{ width: "100%", height: "100%" }}
          config={{ displayModeBar: false, responsive: true }}
        />
      )}
      {isError && <Box>{error.message}</Box>}
    </Stack>
  );
};
