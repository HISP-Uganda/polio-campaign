import { FC } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import Plot from "react-plotly.js";
import { useSqlView } from "../stores/Queries";

export function processBarData(data: any, dx: string[]): any[] {
  const days = ["2021-11-28", "2021-12-01", "2021-12-11", "2021-12-12", "2021-12-13"];
  const x = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  console.log(data);
  return dx.map((dataElement) => {
    const filtered = data.filter(([p, d, v]) => d === dataElement);
    const y = days.map((day) => {
      const search = filtered.find(([p, d, v]) => p === day);
      if (search) {
        return search[2];
      }
      return 0;
    });
    return {
      name: dataElement,
      x,
      y,
      type: "bar",
    };
  });
}

export const BarGraph: FC<{ analytics: any }> = ({ analytics }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(
    "eXLGUbjauwc",
    {
      dx: "K3QB60hWuQI",
      dx1: "Tk6RjMskA93",
    }
  );
  return (
    <Stack h="100%">
      <Text textAlign="center" fontSize="2xl">
        A Fancy Plot
      </Text>
      {isLoading && <Box>Loading...</Box>}
      {isSuccess && (
        <Plot
          data={processBarData(data, ["K3QB60hWuQI", "Tk6RjMskA93"])}
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
