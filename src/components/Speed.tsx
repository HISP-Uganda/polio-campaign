import { Text, useColorModeValue, Stack, Spinner } from "@chakra-ui/react";
import { FC } from "react";
import Plot from "react-plotly.js";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";
import { formatter } from "../utils";

const Speed: FC<{
  indicator: Indicator;
  title: string;
  otherArgs?: any[];
  processor: (...data: any[]) => any;
}> = ({ indicator, title, processor, otherArgs }) => {
  const bg = useColorModeValue("white", "#2D3748");
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <Stack w="100%" spacing="0px">
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          <Text pl="15px">
            {title}
            &nbsp; ({formatter.format(processor(data, ...otherArgs))}
            %)
          </Text>
          <Plot
            data={[
              {
                domain: { x: [0, 1], y: [0, 1] },
                value: processor(data, ...otherArgs),
                type: "indicator",
                mode: "gauge",
                gauge: {
                  shape: "bullet",
                  axis: { range: [null, 100] },
                  bar: { color: "#ffffbf", thickness: 0.4 },
                  steps: [
                    { range: [0, 50], color: "#d7191c" },
                    { range: [50, 80], color: "#fdae61" },
                    { range: [80, 90], color: "#a6d96a" },
                    { range: [90, 100], color: "#1a9641" },
                  ],
                  // threshold: {
                  //   line: { color: "red", width: 4 },
                  //   thickness: 0.75,
                  //   value: 70,
                  // },
                },
              },
            ]}
            layout={{
              plot_bgcolor: bg,
              paper_bgcolor: bg,
              autosize: true,
              height: 60,
              margin: { t: 5, b: 21, l: 15, r: 20 },
            }}
            style={{ width: "100%", height: "100%" }}
            config={{ displayModeBar: false, responsive: true }}
          />
        </>
      )}

      {isError && <pre>{error.message}</pre>}
    </Stack>
  );
};

export default Speed;
