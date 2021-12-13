import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
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
            analytics={[
              {
                x: [
                  "Day 1",
                  "Day 2",
                  "Day 3",
                  "Day 4",
                  "Day 5",
                  "Day 6",
                  "Day 7",
                ],
                y: [20, 14, 23, 36, 13, 83, 36],
                name: "Vaccinated during the period",
                type: "bar",
                // width: 0.2,
              },
              {
                x: [
                  "Day 1",
                  "Day 2",
                  "Day 3",
                  "Day 4",
                  "Day 5",
                  "Day 6",
                  "Day 7",
                ],
                y: [20, 17, 23, 42, 13, 72, 21],
                name: "Target without knowing",
                type: "bar",
                // width: 0.2,
              },
            ]}
          />
        </TabPanel>
        <TabPanel h="100%" p={0} m={0}>
          <BarGraph
            analytics={[
              {
                x: [
                  "District 1",
                  "District 2",
                  "District 3",
                  "District 4",
                  "District 5",
                  "District 6",
                  "District 7",
                ],
                y: [20, 14, 23, 36, 13, 83, 36],
                name: "Vaccinated during the period",
                type: "bar",
                // width: 0.2,
              },
              {
                x: [
                  "District 1",
                  "District 2",
                  "District 3",
                  "District 4",
                  "District 5",
                  "District 6",
                  "District 7",
                ],
                y: [20, 17, 23, 42, 13, 72, 21],
                name: "Target without knowing",
                type: "bar",
                // width: 0.2,
              },
            ]}
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
