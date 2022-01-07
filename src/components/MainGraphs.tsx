import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { processBarData, processSublevelData } from "../stores/DataProcessors";
import { mainDashboard } from "../stores/Indicators";
import { $store } from "../stores/Store";
import { BarGraph } from "./BarGraph";
const MainGraphs: FC<{ yColor: string; bg: string }> = ({ yColor, bg }) => {
  const store = useStore($store);
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <Tabs
      onChange={(index) => setTabIndex(index)}
      h={["auto", "auto", "100%"]}
      w="100%"
      display="flex"
      flexDirection="column"
    >
      <TabList flexDirection={["column", "column", "row"]}>
        <Tab fontSize="xl">Performance(Daily)</Tab>
        <Tab fontSize="xl">Performance(Sub-level)</Tab>
        <Tab fontSize="xl">Wastage(Daily)</Tab>
        <Tab fontSize="xl">Wastage(Sub-level)</Tab>
        <Tab fontSize="xl">Performance Table</Tab>
      </TabList>
      <TabPanels h="100%" flex={1}>
        <TabPanel p={0} m={0} h="100%">
          <BarGraph
            title="Daily performance"
            bg={bg}
            yColor={yColor}
            indicator={mainDashboard.performance(store.selectedUnits)}
            processor={processBarData}
            others={[
              { id: "rkPK3fYEJzh", name: "Target" },
              { id: "Tk6RjMskA93", name: "Vaccinated" },
            ]}
          />
        </TabPanel>
        <TabPanel h="100%" p={0} m={0}>
          <BarGraph
            title="Sublevel Daily performance"
            bg={bg}
            yColor={yColor}
            indicator={mainDashboard.subLevelPerformance(
              store.selectedUnits,
              store.sublevel
            )}
            processor={processSublevelData}
            others={[
              { id: "gfIhVhuWVHr", name: "Target" },
              { id: "rkPK3fYEJzh", name: "Vaccinated" },
            ]}
          />
        </TabPanel>
        <TabPanel h="100%" p={0} m={0}>
          <BarGraph
            title="Daily Unusable vials"
            bg={bg}
            yColor={yColor}
            indicator={mainDashboard.wastage(store.selectedUnits)}
            processor={processBarData}
            others={[
              { id: "XRisIwF1Lk3", name: "Empty Vials" },
              { id: "WC7dEdnHjfn", name: "Contamination" },
              { id: "OevThMNdV8u", name: "Partial Use" },
              { id: "uDHd6MAn9Ck", name: "VVM Color Change" },
              { id: "q9Dmtmon8oX", name: "Other (Specify)" },
            ]}
          />
        </TabPanel>
        <TabPanel h="100%" p={0} m={0}>
          <BarGraph
            title="Sublevel Unusable vials"
            bg={bg}
            yColor={yColor}
            indicator={mainDashboard.sublevelWastage(
              store.selectedUnits,
              store.sublevel
            )}
            processor={processSublevelData}
            others={[
              { id: "WC7dEdnHjfn", name: "Contamination" },
              { id: "OevThMNdV8u", name: "Partial use" },
              { id: "uDHd6MAn9Ck", name: "VVM Color Change" },
              { id: "q9Dmtmon8oX", name: "Other (Specify)" },
            ]}
          />
        </TabPanel>
        <TabPanel h="100%" p={0} m={0}>
          <p>Under implementation</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MainGraphs;
