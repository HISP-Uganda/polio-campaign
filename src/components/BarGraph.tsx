import {
  Box,
  Flex,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import Plot from "react-plotly.js";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";

export const BarGraph: FC<{
  indicator: Indicator;
  bg: string;
  yColor: string;
  others: any;
  title: string;
  processor: (data: any, others: any) => any;
}> = ({ indicator, processor, others, bg, yColor, title }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <Stack
      h="100%"
      w="100%"
    >
      {isLoading && <Spinner />}
      {isSuccess && (
        <Plot
          data={processor(data, others)}
          layout={{
            barmode: "group",
            plot_bgcolor: bg,
            paper_bgcolor: bg,
            autosize: true,
            legend: {
              orientation: "h",
              yanchor: "bottom",
              y: -0.15,
              xanchor: "right",
              x: 0.6,
              font: {
                color: yColor,
              },
            },
            margin: {
              pad: 5,
              r: 5,
              t: 0,
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
