import {
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  GridItem,
  HStack,
  HTMLChakraProps,
  Image,
  Spacer,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import { HTMLMotionProps, motion } from "framer-motion";
import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useInterval from "react-useinterval";
import { processWastageData } from "../stores/DataProcessors";
import { mainDashboard } from "../stores/Indicators";
import { $store } from "../stores/Store";
import HorizontalBar from "./HorizontalBar";
import MainGraphs from "./MainGraphs";
import MapVisualization from "./MapVisualization";
import OrgUnitTreeSelect from "./OrgUnitTreeSelect";
import SingleValue from "./SingleValue";
import Speed from "./Speed";

type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

const Dashboard = () => {
  const [current, setCurrent] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const store = useStore($store);

  const slides = [
    <MotionBox
      key={1}
      initial={{
        opacity: 0,
        translateY: -50,
        translateX: -50,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        translateX: 0,
      }}
      transition={{ duration: 0.4 }}
    >
      <HStack spacing="20px">
        <SingleValue
          direction="row"
          indicator={mainDashboard.posts(store.selectedUnits)}
          title="Sub-counties"
        />
        <SingleValue
          direction="row"
          indicator={mainDashboard.reported(store.selectedUnits)}
          title="Reported"
        />
        <SingleValue
          direction="row"
          indicator={mainDashboard.rates(store.selectedUnits)}
          title="Reporting Rates"
          hasProgress
          postfix="%"
        />
        <SingleValue
          direction="row"
          indicator={mainDashboard.totalWorkers(store.selectedUnits)}
          title="Total Workers"
        />
      </HStack>
    </MotionBox>,
    <MotionBox
      key={2}
      initial={{
        opacity: 0,
        translateY: -50,
        translateX: -50,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        translateX: 0,
      }}
      transition={{ duration: 0.4 }}
    >
      <HStack spacing="20px">
        <SingleValue
          direction="row"
          indicator={mainDashboard.posts(store.selectedUnits)}
          title="Sub-counties"
        />
        <SingleValue
          direction="row"
          indicator={mainDashboard.reported(store.selectedUnits)}
          title="Reported"
        />
        <SingleValue
          direction="row"
          indicator={mainDashboard.rates(store.selectedUnits)}
          title="Reporting Rates"
          hasProgress
          postfix="%"
        />
        <SingleValue
          direction="row"
          indicator={mainDashboard.totalWorkers(store.selectedUnits)}
          title="Total Workers"
        />
      </HStack>
    </MotionBox>,
  ];

  const { colorMode, toggleColorMode } = useColorMode();
  const handle = useFullScreenHandle();
  const templateColumns = useBreakpointValue({
    base: "100%",
    lg: "repeat(12, 1fr)",
  });
  const templateRows = useBreakpointValue({
    base: "100%",
    md: "repeat(16, 1fr)",
  });
  const bg = useColorModeValue("white", "#2D3748");
  const realBg = useColorModeValue("gray.300", "gray.900");
  const yColor = useColorModeValue("black", "white");
  const increment = () => setCurrent((s: number) => (s + 1) % slides.length);
  const maps = [
    <MotionBox
      key="performance"
      h="100%"
      initial={{
        opacity: 0,
        // translateY: -50,
        // translateX: -50,
      }}
      animate={{
        opacity: 1,
        // translateY: 0,
        // translateX: 0,
      }}
      transition={{ duration: 1 }}
    >
      <MapVisualization
        indicator={mainDashboard.districts(
          store.selectedUnits,
          store.currentLevel + 1
        )}
        title="Total vaccinated"
      />
    </MotionBox>,
    <MotionBox
      key="wastage"
      h="100%"
      initial={{
        opacity: 0,
        // translateY: -50,
        // translateX: -50,
      }}
      animate={{
        opacity: 1,
        // translateY: 0,
        // translateX: 0,
      }}
      transition={{ duration: 1 }}
    >
      <MapVisualization
        indicator={mainDashboard.districtsWastage(
          store.selectedUnits,
          store.currentLevel + 1
        )}
        title="Wastage summary"
      />
    </MotionBox>,
  ];

  const incrementMaps = () => setIndex((s: number) => (s + 1) % maps.length);
  useInterval(increment, 1000 * 10);
  useInterval(incrementMaps, 1000 * 30);
  return (
    <FullScreen handle={handle}>
      <Box bg={realBg} p="5px">
        <HStack h="60px">
          <Image
            src="https://raw.githubusercontent.com/HISP-Uganda/covid-dashboard/master/src/images/Coat_of_arms_of_Uganda.svg"
            alt="Ministry of Health"
            boxSize="48px"
          />
          <Button>OPV Campaign</Button>
          <Button>Routine Immunization</Button>

          <Spacer />
          <Button onClick={toggleColorMode} ml="400px">
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <Button onClick={handle.enter}>Enter fullscreen</Button>
          <OrgUnitTreeSelect />
        </HStack>
        <Grid
          overflow="auto"
          h={[
            "auto",
            "auto",
            `calc(100vh - ${handle.active ? "70px" : "118px"})`,
          ]}
          w="calc(100vw - 10px)"
          templateColumns={templateColumns}
          templateRows={templateRows}
          gap={1}
        >
          <GridItem colSpan={[1, 1, 8]} rowSpan={15}>
            <Grid
              templateRows="repeat(6, 1fr)"
              templateColumns="repeat(6, 1fr)"
              gap={1}
              h="100%"
            >
              <GridItem
                direction="column"
                bg={bg}
                colSpan={4}
                justifyContent="center"
                justifyItems="center"
              >
                <Flex
                  direction="row"
                  justifyContent="space-around"
                  justifyItems="center"
                  alignItems="center"
                  h="100%"
                >
                  <SingleValue
                    indicator={mainDashboard.posts(store.selectedUnits)}
                    title="Sub-counties"
                  />
                  <SingleValue
                    indicator={mainDashboard.reported(store.selectedUnits)}
                    title="Reported"
                  />
                  <SingleValue
                    indicator={mainDashboard.rates(store.selectedUnits)}
                    title="Reporting Rates"
                    hasProgress
                    postfix="%"
                  />
                  <SingleValue
                    indicator={mainDashboard.totalWorkers(store.selectedUnits)}
                    title="Total Workers"
                  />
                </Flex>
              </GridItem>
              <GridItem rowSpan={2} colSpan={2} bg={bg}>
                <Grid h="100%" bg={bg}>
                  <GridItem>
                    <VStack
                      justifyItems="space-between"
                      justifyContent="space-between"
                      w="100%"
                      h="100%"
                    >
                      <Flex
                        direction="row"
                        justifyContent="space-around"
                        justifyItems="center"
                        alignItems="center"
                        w="100%"
                        h="100%"
                      >
                        <SingleValue
                          indicator={mainDashboard.aefiCases(
                            store.selectedUnits
                          )}
                          title="AEFI Cases"
                        />
                        <SingleValue
                          indicator={mainDashboard.afpCases(
                            store.selectedUnits
                          )}
                          title="AFP Cases"
                        />
                      </Flex>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <Speed
                      indicator={mainDashboard.coverage(store.selectedUnits)}
                      title="Vaccination Coverage"
                    />
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem
                direction="column"
                justifyContent="center"
                colSpan={4}
                bg={bg}
                justifyItems="center"
              >
                <Flex
                  direction="row"
                  justifyContent="space-around"
                  justifyItems="center"
                  alignItems="center"
                  h="100%"
                >
                  <SingleValue
                    indicator={mainDashboard.target(store.selectedUnits)}
                    title="Target"
                  />
                  <SingleValue
                    indicator={mainDashboard.vaccinated(store.selectedUnits)}
                    title="Vaccinated"
                  />
                  <SingleValue
                    indicator={mainDashboard.zeroDose(store.selectedUnits)}
                    title="Zero Dose"
                  />
                  <SingleValue
                    indicator={mainDashboard.coverage(store.selectedUnits)}
                    postfix="%"
                    title="Coverage"
                  />
                  {/* <SingleValue
                    indicator={mainDashboard.posts(store.selectedUnits)}
                    title="Workload"
                  /> */}
                </Flex>
              </GridItem>
              <GridItem rowSpan={4} colSpan={6} bg={bg}>
                <MainGraphs yColor={yColor} bg={bg} />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={[1, 1, 4]} rowSpan={15}>
            <Grid templateRows="repeat(6, 1fr)" h="100%" gap={1}>
              <GridItem rowSpan={2}>
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  templateRows="repeat(2, 1fr)"
                  gap={1}
                  h="100%"
                >
                  <GridItem rowSpan={2} h="100%" bg={bg}>
                    <Flex
                      direction="column"
                      h="100%"
                      alignItems="center"
                      justifyContent="space-around"
                      justifyItems="center"
                    >
                      <Flex
                        w="100%"
                        // bg="yellow"
                        justifyContent="space-around"
                        alignItems="center"
                        justifyItems="center"
                      >
                        <SingleValue
                          indicator={mainDashboard.issued(store.selectedUnits)}
                          title="Issued"
                        />
                        <SingleValue
                          indicator={mainDashboard.used(store.selectedUnits)}
                          title="Used"
                        />
                      </Flex>
                      <Flex
                        w="100%"
                        justifyContent="space-around"
                        alignItems="center"
                        justifyItems="center"
                      >
                        <SingleValue
                          indicator={mainDashboard.discarded(
                            store.selectedUnits
                          )}
                          title="Unusable"
                        />
                        <SingleValue
                          indicator={mainDashboard.balance(store.selectedUnits)}
                          title="Usable"
                        />
                      </Flex>
                    </Flex>
                  </GridItem>
                  <GridItem rowSpan={2} bg={bg}>
                    <HorizontalBar
                      processor={processWastageData}
                      indicator={mainDashboard.wastageSummary(
                        store.selectedUnits
                      )}
                    />
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem rowSpan={4} bg={bg}>
                {maps[index]}
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={12} bg={bg}>
            <HStack>
              <Box>
                <Image
                  src="https://raw.githubusercontent.com/HISP-Uganda/covid-dashboard/master/src/images/h-logo-blue.svg"
                  alt="Ministry of Health"
                  w="100%"
                  maxWidth="160px"
                  h="auto"
                />
              </Box>
              <Flex
                flex={1}
                w="100%"
                h="100%"
                alignItems="center"
                justifyContent="center"
              >
                {slides[current]}
              </Flex>
              <Box>
                <Image
                  src="https://raw.githubusercontent.com/HISP-Uganda/covid-dashboard/master/src/images/logo.png"
                  alt="Ministry of Health"
                  w="100%"
                  maxWidth="110px"
                  h="auto"
                />
              </Box>
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </FullScreen>
  );
};

export default Dashboard;
