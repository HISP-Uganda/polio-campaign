import {
  Box, Spinner,
  Stack
} from "@chakra-ui/react";
import { FC } from "react";
import Plot from "react-plotly.js";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";

export const BarGraph: FC<{
  indicator: Indicator;
  bg: string;
  yColor: string;
  args: any[];
  title: string;
  processor: (data: any, ...args: any[]) => any;
}> = ({ indicator, processor, args, bg, yColor, title }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <Stack h="100%" w="100%">
      {isLoading && <Spinner />}
      {isSuccess && (
        <Plot
          data={processor(data, ...args)}
          layout={{
            barmode: "group",
            plot_bgcolor: bg,
            paper_bgcolor: bg,
            autosize: true,
            showlegend: true,
            legend: {
              orientation: "h",
              x: 0,
              y: 1.05,
              traceorder: "normal",
              // yanchor: "top",
              // y: -0.15,
              // xanchor: "left",
              // x: 0.6,
              // bgcolor: "yellow",
              font: {
                color: yColor,
              },
            },
            margin: {
              pad: 5,
              r: 5,
              t: 20,
              l: 40,
              b: 20,
            },
            yaxis: {
              showgrid: true,
              color: yColor,
              zeroline: true,
              gridcolor: "lightgray",
              zerolinecolor: "lightgray",
            },
            xaxis: {
              color: yColor,
              automargin: true,
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
