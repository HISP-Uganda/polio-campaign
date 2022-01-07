import { Text, useColorModeValue, Stack, Spinner } from "@chakra-ui/react";
import { FC } from "react";
import Plot from "react-plotly.js";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";

const Speed: FC<{
  indicator: Indicator;
  title: string;
}> = ({ indicator, title }) => {
  const bg = useColorModeValue("white", "#2D3748");
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <Stack w="100%" spacing="0px">
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          <Text pl="15px">
            {title}
            &nbsp; (
            {Number(data.numerators) !== NaN &&
            Number(data.denominators) !== NaN
              ? Number(data.denominators) === 0
                ? 0
                : data.numerators / data.denominators
              : 0}
            %)
          </Text>
          <Plot
            data={[
              {
                domain: { x: [0, 1], y: [0, 1] },
                value:
                  Number(data.numerators) !== NaN &&
                  Number(data.denominators) !== NaN
                    ? Number(data.denominators) === 0
                      ? 0
                      : data.numerators / data.denominators
                    : 0,
                type: "indicator",
                mode: "gauge",
                gauge: {
                  shape: "bullet",
                  axis: { range: [null, 100] },
                  bar: { color: "darkblue", thickness: 0.4 },
                  steps: [
                    { range: [0, 50], color: "red" },
                    { range: [50, 80], color: "yellow" },
                    { range: [80, 90], color: "limegreen" },
                    { range: [90, 100], color: "darkgreen" },
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
              margin: { t: 5, b: 21, l: 15, r: 15 },
            }}
            style={{ width: "100%", height: "100%" }}
            config={{ displayModeBar: false, responsive: true }}
          />
        </>
      )}

      {isError && <pre>{JSON.stringify(error)}</pre>}
    </Stack>
  );
};

export default Speed;
