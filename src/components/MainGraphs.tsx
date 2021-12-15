import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { processBarData } from "../stores/DataProcessors";
import { mainDashboard } from "../stores/Indicators";
import { BarGraph } from "./BarGraph";
const MainGraphs = () => {
  return (
    <Tabs
      h={["auto", "auto", "100%"]}
      w="100%"
      display="flex"
      flexDirection="column"
      bg="white"
    >
      <TabList flexDirection={["column", "column", "row"]}>
        <Tab fontSize="2xl">Performance(Daily)</Tab>
        <Tab fontSize="2xl">Performance(Sub-level)</Tab>
        <Tab fontSize="2xl">Wastage(Daily)</Tab>
        <Tab fontSize="2xl">Wastage(Sub-level)</Tab>
        {/* <Tab>Performance Table</Tab> */}
      </TabList>
      <TabPanels flex={1}>
        <TabPanel p={0} m={0} h={["700px", "700px", "100%"]}>
          <BarGraph
            indicator={mainDashboard["FExZQGMUB38"]}
            processor={processBarData}
            others={["rkPK3fYEJzh", "Tk6RjMskA93"]}
          />
        </TabPanel>
        <TabPanel h="100%" p={0} m={0}>
          <BarGraph
            indicator={mainDashboard["dM3IJRupgEI"]}
            processor={processBarData}
            others={["gfIhVhuWVHr", "rkPK3fYEJzh"]}
          />
        </TabPanel>
        <TabPanel>
          <p>3!</p>
        </TabPanel>
        <TabPanel>
          <p>4!</p>
        </TabPanel>
        <TabPanel>
          <p>5!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MainGraphs;
