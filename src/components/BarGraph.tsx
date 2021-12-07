import { FC } from "react";
import Plot from "react-plotly.js";

export const BarGraph: FC<{ analytics: any }> = ({ analytics }) => {
    return (
        <Plot
            data={analytics}
            layout={{
                title: "A Fancy Plot",
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
                    // t: 0,
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
    );
};
