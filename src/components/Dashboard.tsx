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
  Stack,
  Text,
  useBreakpointValue, useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useStore } from "effector-react";
import { HTMLMotionProps, motion } from "framer-motion";
import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useInterval from "react-useinterval";
import {
  calculateReportingRates,
  calculateStockIndicators,
  computeStaffTarget,
  computeWastage, processCoverageValue, processSingleValue,
  processWastageData
} from "../stores/DataProcessors";
import { setDays } from "../stores/Events";
import { mainDashboard } from "../stores/Indicators";
import { $days, $realDays, $store } from "../stores/Store";
import MainGraphs from "./MainGraphs";
import MapVisualization from "./MapVisualization";
import OrgUnitTreeSelect from "./OrgUnitTreeSelect";
import PieChart from "./PieChart";
import SimpleSingleValue from "./SimpleSingleValue";
import SingleValue from "./SingleValue";
import Speed from "./Speed";

type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

const Dashboard = () => {
  const [current, setCurrent] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const store = useStore($store);
  const days = useStore($days);
  const realDays = useStore($realDays);

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
      <HStack h="100%" w="100%">
        <Text
          fontSize={"1.4vw"}
          fontWeight="bold"
          textTransform="uppercase"
          bg="black"
          color="white"
        >
          Reason for unusable
        </Text>
        <SingleValue
          processor={processSingleValue}
          direction="row"
          indicator={mainDashboard.staffing(
            store.selectedUnits,
            "K3QB60hWuQI",
            days,
            "XRisIwF1Lk3"
          )}
          title="Empty Vials"
        />
        <SingleValue
          processor={processSingleValue}
          direction="row"
          indicator={mainDashboard.staffing(
            store.selectedUnits,
            "K3QB60hWuQI",
            days,
            "OevThMNdV8u"
          )}
          title="Partial Use"
        />
        <SingleValue
          processor={processSingleValue}
          direction="row"
          indicator={mainDashboard.staffing(
            store.selectedUnits,
            "K3QB60hWuQI",
            days,
            "WC7dEdnHjfn"
          )}
          title="Contamination"
        />
        <SingleValue
          processor={calculateReportingRates}
          direction="row"
          indicator={mainDashboard.staffing(
            store.selectedUnits,
            "K3QB60hWuQI",
            days,
            "uDHd6MAn9Ck"
          )}
          title="VVM Color Change"
        />
        <SingleValue
          processor={calculateReportingRates}
          direction="row"
          indicator={mainDashboard.staffing(
            store.selectedUnits,
            "K3QB60hWuQI",
            days,
            "q9Dmtmon8oX"
          )}
          title="Others Specify"
        />
      </HStack>
    </MotionBox>,
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
      <HStack h="100%" w="100%">
        <Text
          fontSize={"1.4vw"}
          fontWeight="bold"
          textTransform="uppercase"
          bg="black"
          color="white"
        >
          Staff Breakdown
        </Text>
        <SingleValue
          processor={processSingleValue}
          indicator={mainDashboard.staffing(
            store.selectedUnits,
            "gfIhVhuWVHr",
            days,
            "aEo8TC2ZwD3"
          )}
          direction="row"
          title="H/Ws"
        />
        <SingleValue
          processor={processSingleValue}
          indicator={mainDashboard.staffing(
            store.selectedUnits,
            "gfIhVhuWVHr",
            days,
            "x2B5r3OQCdA"
          )}
          direction="row"
          title="Mobilizers"
        />
        <SingleValue
          processor={processSingleValue}
          indicator={mainDashboard.staffing(
            store.selectedUnits,
            "gfIhVhuWVHr",
            days,
            "CXvPyuoP80i"
          )}
          direction="row"
          title="VHTs"
        />
        <SingleValue
          processor={processSingleValue}
          indicator={mainDashboard.staffing(
            store.selectedUnits,
            "gfIhVhuWVHr",
            days,
            "biWOWFj4zxB"
          )}
          direction="row"
          title="PS"
        />
      </HStack>
    </MotionBox>,
  ];

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
      }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 1 }}
    >
      <MapVisualization
        indicator={mainDashboard.districts(
          store.selectedUnits,
          store.currentLevel + 1,
          days
        )}
        title="Total vaccinated"
      />
    </MotionBox>,
    <MotionBox
      key="wastage"
      h="100%"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 1 }}
    >
      <MapVisualization
        indicator={mainDashboard.districtsWastage(
          store.selectedUnits,
          store.currentLevel + 1,
          days
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
          {/* <Button>Routine Immunization</Button> */}
          <Spacer />
          {/* <Button onClick={toggleColorMode} ml="400px">
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button> */}
          {handle.active ? (
            <Button onClick={handle.exit}>Exit fullscreen</Button>
          ) : (
            <Button onClick={handle.enter}>Enter fullscreen</Button>
          )}
          <Box w="370px" bg="white">
            <Select
              value={store.days}
              hideSelectedOptions={false}
              selectedOptionStyle="check"
              onChange={(value: any, actions: any) => {
                console.log(actions);
                setDays(value);
              }}
              isMulti
              options={[
                {
                  label: "Day 1",
                  value: "10144",
                },
                {
                  label: "Day 2",
                  value: "10145",
                },
                {
                  label: "Day 3",
                  value: "10146",
                },
              ]}
            />
          </Box>
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
              <GridItem bg={bg} colSpan={4}>
                <Stack direction="column" spacing={0}>
                  <Flex
                    alignItems="center"
                    bg="gray.200"
                    h="30px"
                    alignContent="center"
                    justifyItems="center"
                  >
                    <Text
                      pl="25px"
                      h="20px"
                      textTransform="uppercase"
                      fontWeight="bold"
                      fontSize="0.8vw"
                      color="gray.500"
                      isTruncated
                    >
                      Reporting Rates
                    </Text>
                  </Flex>
                  <HStack
                    flex={1}
                    justifyItems="space-around"
                    justifyContent="space-around"
                    h="100%"
                    w="100%"
                  >
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.posts(store.selectedUnits, days)}
                      title="Sub-counties"
                    />
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.reported(
                        store.selectedUnits,
                        days
                      )}
                      title="Reported"
                    />
                    <SingleValue
                      processor={calculateReportingRates}
                      indicator={mainDashboard.rates(store.selectedUnits, days)}
                      title="Reporting Rates"
                      postfix="%"
                    />
                  </HStack>
                </Stack>
              </GridItem>
              <GridItem colSpan={2} bg={bg} h="100%">
                <Grid h="100%" bg={bg}>
                  <GridItem>
                    <Stack spacing={0} h="100%" w="100%">
                      <Flex
                        alignItems="center"
                        bg="gray.200"
                        h="30px"
                        alignContent="center"
                        justifyItems="center"
                      >
                        <Text
                          pl="25px"
                          h="20px"
                          textTransform="uppercase"
                          fontWeight="bold"
                          fontSize="0.8vw"
                          color="gray.500"
                          isTruncated
                        >
                          Surveillance
                        </Text>
                      </Flex>
                      <HStack
                        justifyItems="space-around"
                        justifyContent="space-around"
                        w="100%"
                        h="100%"
                        flex={1}
                      >
                        <SingleValue
                          processor={processSingleValue}
                          indicator={mainDashboard.aefiCases(
                            store.selectedUnits,
                            days
                          )}
                          title="AEFI Cases"
                        />
                        <SingleValue
                          processor={processSingleValue}
                          indicator={mainDashboard.afpCases(
                            store.selectedUnits,
                            days
                          )}
                          title="AFP Cases"
                        />
                      </HStack>
                    </Stack>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem
                direction="column"
                justifyContent="center"
                colSpan={6}
                bg={bg}
                justifyItems="center"
              >
                <Stack spacing={0} h="100%">
                  <Flex
                    alignItems="center"
                    bg="gray.200"
                    h="30px"
                    alignContent="center"
                    justifyItems="center"
                  >
                    <Text
                      pl="25px"
                      h="20px"
                      textTransform="uppercase"
                      fontWeight="bold"
                      fontSize="0.8vw"
                      color="gray.500"
                      isTruncated
                    >
                      Performance & Progress
                    </Text>
                  </Flex>
                  <Flex
                    direction="row"
                    justifyContent="space-around"
                    justifyItems="center"
                    alignItems="center"
                    h="100%"
                    flex={1}
                  >
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.target(store.selectedUnits)}
                      title="Target"
                    />
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.vaccinated(
                        store.selectedUnits,
                        days
                      )}
                      title="Vaccinated"
                    />
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.zeroDose(
                        store.selectedUnits,
                        days
                      )}
                      title="Zero Dose"
                    />
                    <SingleValue
                      processor={processCoverageValue}
                      indicator={mainDashboard.coverage(
                        store.selectedUnits,
                        days
                      )}
                      postfix="%"
                      hasProgress
                      title="Coverage"
                    />
                    <Box w="350px">
                      <Speed
                        processor={processCoverageValue}
                        indicator={mainDashboard.coverage(
                          store.selectedUnits,
                          days
                        )}
                        title="Vaccination Coverage"
                      />
                    </Box>
                    <SingleValue
                      processor={computeWastage}
                      indicator={mainDashboard.realWastage(
                        store.selectedUnits,
                        days
                      )}
                      postfix="%"
                      hasProgress
                      title="Wastage"
                    />
                  </Flex>
                </Stack>
              </GridItem>
              <GridItem rowSpan={4} colSpan={5} bg={bg} h="100%" w="100%">
                <Stack spacing={0} h="100%">
                  <Flex
                    alignItems="center"
                    bg="gray.200"
                    h="30px"
                    alignContent="center"
                    justifyItems="center"
                  >
                    <Text
                      pl="25px"
                      h="20px"
                      textTransform="uppercase"
                      fontWeight="bold"
                      fontSize="0.8vw"
                      color="gray.500"
                      isTruncated
                    >
                      Overall Performance
                    </Text>
                  </Flex>
                  <MainGraphs yColor={yColor} bg={bg} />
                </Stack>
              </GridItem>
              <GridItem rowSpan={4} bg={bg} h="100%" w="100%">
                <Stack h="100%" spacing={0}>
                  <Flex
                    alignItems="center"
                    bg="gray.200"
                    h="30px"
                    alignContent="center"
                    justifyItems="center"
                  >
                    <Text
                      pl="25px"
                      h="20px"
                      textTransform="uppercase"
                      fontWeight="bold"
                      fontSize="0.8vw"
                      color="gray.500"
                      isTruncated
                    >
                      Workers & Teams
                    </Text>
                  </Flex>

                  <VStack
                    h="100%"
                    flex={1}
                    alignItems="space-around"
                    justifyItems="space-around"
                    justifyContent="space-around"
                    alignContent="space-around"
                  >
                    <SingleValue
                      processor={computeStaffTarget}
                      otherArgs={[realDays]}
                      indicator={mainDashboard.staffTarget(store.selectedUnits)}
                      title="Staff Planned"
                    />
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.staffReported(
                        store.selectedUnits,
                        days
                      )}
                      title="Staff Available"
                    />
                    <HStack w="100%" alignContent="space-around">
                      <SimpleSingleValue
                        processor={processSingleValue}
                        indicator={mainDashboard.staffing(
                          store.selectedUnits,
                          "gfIhVhuWVHr",
                          days,
                          "aEo8TC2ZwD3"
                        )}
                        title="H/Ws"
                      />
                      <SimpleSingleValue
                        processor={processSingleValue}
                        indicator={mainDashboard.staffing(
                          store.selectedUnits,
                          "gfIhVhuWVHr",
                          days,
                          "x2B5r3OQCdA"
                        )}
                        title="Mobilizers"
                      />
                      <SimpleSingleValue
                        processor={processSingleValue}
                        indicator={mainDashboard.staffing(
                          store.selectedUnits,
                          "gfIhVhuWVHr",
                          days,
                          "CXvPyuoP80i"
                        )}
                        title="VHTs"
                      />
                      <SimpleSingleValue
                        processor={processSingleValue}
                        indicator={mainDashboard.staffing(
                          store.selectedUnits,
                          "gfIhVhuWVHr",
                          days,
                          "biWOWFj4zxB"
                        )}
                        title="PS"
                      />
                    </HStack>
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.staffTeamTarget(
                        store.selectedUnits
                      )}
                      title="Target Teams"
                      otherArgs={[realDays]}
                    />
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.staffing(
                        store.selectedUnits,
                        days,
                        "aEo8TC2ZwD3"
                      )}
                      title="Reported Teams"
                    />
                  </VStack>
                </Stack>
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
                    <Stack h="100%" spacing={0}>
                      <Flex
                        alignItems="center"
                        bg="gray.200"
                        h="30px"
                        alignContent="center"
                        justifyItems="center"
                      >
                        <Text
                          pl="25px"
                          h="20px"
                          textTransform="uppercase"
                          fontWeight="bold"
                          fontSize="0.8vw"
                          color="gray.500"
                          isTruncated
                        >
                          Stock Status (Doses)
                        </Text>
                      </Flex>
                      <VStack
                        flex={1}
                        h="100%"
                        w="100%"
                        alignItems="space-around"
                        justifyItems="space-around"
                        justifyContent="space-around"
                        alignContent="space-around"
                      >
                        <HStack
                          w="100%"
                          // bg="yellow"
                          justifyContent="space-around"
                          alignItems="center"
                          justifyItems="center"
                        >
                          <SingleValue
                            processor={calculateStockIndicators}
                            indicator={mainDashboard.issued(
                              store.selectedUnits,
                              days
                            )}
                            title="Received"
                          />
                          <SingleValue
                            processor={calculateStockIndicators}
                            indicator={mainDashboard.returned(
                              store.selectedUnits,
                              days
                            )}
                            title="Returned"
                          />
                        </HStack>
                        <HStack
                          w="100%"
                          justifyContent="space-around"
                          alignItems="center"
                          justifyItems="center"
                        >
                          <SingleValue
                            processor={calculateStockIndicators}
                            indicator={mainDashboard.available(
                              store.selectedUnits,
                              days
                            )}
                            tooltip="Physical Balance"
                            title="Available"
                          />
                          <SingleValue
                            processor={calculateStockIndicators}
                            indicator={mainDashboard.discarded(
                              store.selectedUnits,
                              days
                            )}
                            title="Unusable"
                          />
                        </HStack>
                      </VStack>
                    </Stack>
                  </GridItem>
                  <GridItem rowSpan={2} bg={bg}>
                    <Stack w="100%" h="100%" spacing={0}>
                      <Flex
                        alignItems="center"
                        bg="gray.200"
                        h="30px"
                        alignContent="center"
                        justifyItems="center"
                      >
                        <Text
                          pl="25px"
                          h="20px"
                          textTransform="uppercase"
                          fontWeight="bold"
                          fontSize="0.8vw"
                          color="gray.500"
                          isTruncated
                        >
                          Unusable Vials
                        </Text>
                      </Flex>
                      <PieChart
                        processor={processWastageData}
                        indicator={mainDashboard.wastageSummary(
                          store.selectedUnits,
                          days
                        )}
                      />
                    </Stack>
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
