import React, { FC } from "react";
import Plot from "react-plotly.js";
import { Flex, Text, Spinner, Box } from "@chakra-ui/react";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";

const HorizontalBar: FC<{
  indicator: Indicator;
  processor: (data: any) => any;
}> = ({ indicator, processor }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);

  return (
    <>
      {isLoading && <Spinner />}
      {isSuccess && (
        <Plot
          data={processor(data)}
          layout={{
            autosize: true,
            showlegend: false,
            xaxis: {
              showgrid: false,
              zeroline: false,
            },
            margin: {
              pad: 0,
              r: 5,
              t: 0,
              l: 120,
              b: 20,
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
    </>
  );
};

export default HorizontalBar;
