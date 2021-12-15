import {
  Box, Flex, Grid,
  GridItem, useBreakpointValue
} from "@chakra-ui/react";
import { mainDashboard } from "../stores/Indicators";
import MainGraphs from "./MainGraphs";
import Map from "./MapVisualization";
import OrgUnitTreeSelect from "./OrgUnitTreeSelect";
import SingleValue from "./SingleValue";

const Dashboard = () => {
  const templateColumns = useBreakpointValue({
    base: "100%",
    lg: "repeat(12, 1fr)",
  });
  const templateRows = useBreakpointValue({
    base: "100%",
    md: "repeat(12, 1fr)",
  });

  return (
    <Box bg="gray.200">
      {/* <Text height="48px">Polio Campaign</Text> */}
      <Box p="5px" h="48px">
        <OrgUnitTreeSelect />
      </Box>
      <Grid
        overflow="auto"
        h={["auto", "auto", "calc(100vh - 96px)"]}
        w="100vw"
        templateColumns={templateColumns}
        columnGap={2}
        // rowGap={2}
      >
        <GridItem colSpan={[1, 1, 8]}>
          <Grid templateRows="repeat(6, 1fr)" gap={2} h="100%">
            <GridItem
              direction="column"
              justifyContent="center"
              bg="white"
              justifyItems="center"
            >
              <Flex
                direction="row"
                // bg="blue.300"
                justifyContent="space-between"
                justifyItems="center"
                alignItems="center"
                h="100%"
              >
                <SingleValue
                  indicator={mainDashboard.posts}
                  title="Total Posts"
                />
                <SingleValue
                  indicator={mainDashboard.reported}
                  title="Reporting Posts"
                />
                <SingleValue
                  indicator={mainDashboard.rates}
                  title="Reporting Rates"
                />
                <SingleValue
                  indicator={mainDashboard.posts}
                  title="Doses Used"
                />
                <SingleValue
                  indicator={mainDashboard.reported}
                  title="Sub-Counties reporting"
                />
              </Flex>
            </GridItem>
            <GridItem
              direction="column"
              justifyContent="center"
              bg="white"
              justifyItems="center"
            >
              <Flex
                direction="row"
                // bg="blue.300"
                justifyContent="space-between"
                justifyItems="center"
                alignItems="center"
                h="100%"
              >
                <SingleValue
                  indicator={mainDashboard.posts}
                  title="Total Posts"
                />
                <SingleValue
                  indicator={mainDashboard.reported}
                  title="Reporting Posts"
                />
                <SingleValue
                  indicator={mainDashboard.posts}
                  title="Doses Issued"
                />
                <SingleValue
                  indicator={mainDashboard.posts}
                  title="Doses Used"
                />
                <SingleValue
                  indicator={mainDashboard.reported}
                  title="Sub-Counties reporting"
                />
              </Flex>
            </GridItem>
            <GridItem rowSpan={4}>
              <MainGraphs />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem colSpan={[1, 1, 4]}>
          <Grid templateRows="repeat(6, 1fr)" h="100%" gap={2}>
            <GridItem bg="grey" rowSpan={2}>
              E
            </GridItem>
            <GridItem bg="grey" rowSpan={4}>
              <Map indicator={mainDashboard.districts} />
            </GridItem>
          </Grid>
        </GridItem>
        {/* <GridItem colSpan={[1, 1, 2]}>
          <Grid templateRows="repeat(6, 1fr)" h="100%" gap={1}>
            <GridItem bg="grey">H</GridItem>
            <GridItem bg="grey">I</GridItem>
            <GridItem bg="grey" rowSpan={2}>
              J
            </GridItem>
            <GridItem bg="grey">K</GridItem>
            <GridItem bg="grey">L</GridItem>
          </Grid>
        </GridItem> */}
      </Grid>
    </Box>
  );
};

export default Dashboard;
