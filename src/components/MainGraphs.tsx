import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { FC, useState } from "react";
import useInterval from "react-useinterval";

import {
  processBarData,
  processSublevelWastageData,
  processSublevelPerformance,
  processWastageBarData,
} from "../stores/DataProcessors";
import { mainDashboard } from "../stores/Indicators";
import { $days, $store } from "../stores/Store";
import { BarGraph } from "./BarGraph";
const MainGraphs: FC<{ yColor: string; bg: string }> = ({ yColor, bg }) => {
  const store = useStore($store);
  const days = useStore($days);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const increment = () => setTabIndex((s: number) => (s + 1) % 4);
  useInterval(increment, 1000 * 60 * 2);

  return (
    <Tabs
      flex={1}
      index={tabIndex}
      onChange={(index) => setTabIndex(index)}
      h={["auto", "auto", "100%"]}
      w="100%"
      display="flex"
      flexDirection="column"
    >
      <TabList flexDirection={["column", "column", "row"]}>
        <Tab fontSize="lg">Performance(Daily)</Tab>
        <Tab fontSize="lg">Performance(Sub-level)</Tab>
        <Tab fontSize="lg">Wastage(Daily)</Tab>
        <Tab fontSize="lg">Wastage(Sub-level)</Tab>
      </TabList>
      <TabPanels h="100%" w="100%" flex={1}>
        <TabPanel p={0} m={0} h="100%" w="100%">
          <BarGraph
            title="Daily performance"
            bg={bg}
            yColor={yColor}
            indicator={mainDashboard.performance(store.selectedUnits, days)}
            processor={processBarData}
            args={[store.days]}
          />
        </TabPanel>
        <TabPanel h="100%" w="100%" p={0} m={0}>
          <BarGraph
            title="Sublevel Daily performance"
            bg={bg}
            yColor={yColor}
            indicator={mainDashboard.subLevelPerformance(
              store.selectedUnits,
              store.sublevel,
              days
            )}
            processor={processSublevelPerformance}
            args={[store.sublevels, store.days.length]}
          />
        </TabPanel>
        <TabPanel h="100%" w="100%" p={0} m={0}>
          <BarGraph
            title="Daily Unusable vials"
            bg={bg}
            yColor={yColor}
            indicator={mainDashboard.wastage(store.selectedUnits, days)}
            processor={processWastageBarData}
            args={[
              store.days,
              [
                { id: "XRisIwF1Lk3", name: "Empty Vials" },
                { id: "WC7dEdnHjfn", name: "Contamination" },
                { id: "OevThMNdV8u", name: "Partial Use" },
                { id: "uDHd6MAn9Ck", name: "VVM Color Change" },
                { id: "q9Dmtmon8oX", name: "Other (Specify)" },
              ],
            ]}
          />
        </TabPanel>
        <TabPanel h="100%" w="100%" p={0} m={0}>
          <BarGraph
            title="Sublevel Unusable vials"
            bg={bg}
            yColor={yColor}
            indicator={mainDashboard.sublevelWastage(
              store.selectedUnits,
              store.sublevel,
              days
            )}
            processor={processSublevelWastageData}
            args={[
              store.sublevels,
              [
                { id: "WC7dEdnHjfn", name: "Contamination" },
                { id: "OevThMNdV8u", name: "Partial use" },
                { id: "uDHd6MAn9Ck", name: "VVM Color Change" },
                { id: "q9Dmtmon8oX", name: "Other (Specify)" },
              ],
            ]}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MainGraphs;
