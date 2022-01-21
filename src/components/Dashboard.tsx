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
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Marquee from "react-marquee-slider";
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
  computeVaccinationTarget,
  computeWastage,
  nationalCoverageProcessor,
  processCoverageValue,
  processMapCoverage,
  processMapSingleValue,
  processSingleValue,
  processStaffingValue,
  processStaffReported,
  processWastageData,
  targetProcessor,
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
import Map from "./Map";
import { findColor, findWastageColor } from "../utils";
import { NationalCoverage } from "./NationalCoverage";
import { Unusable } from "./Unusable";

type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

const Dashboard = () => {
  const [index, setIndex] = useState<number>(0);
  const store = useStore($store);
  const days = useStore($days);
  const realDays = useStore($realDays);

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
  const maps = [
    <MotionBox
      key="coverage"
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
        indicator={mainDashboard.districtCoverage(
          store.selectedUnits,
          store.currentLevel + 1,
          days
        )}
        processor={processMapCoverage}
        otherArgs={[realDays]}
        title="Vaccination Coverage"
      />
    </MotionBox>,
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
        processor={processMapSingleValue}
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
        processor={processMapSingleValue}
        title="Wastage summary"
      />
    </MotionBox>,
  ];

  const incrementMaps = () => setIndex((s: number) => (s + 1) % maps.length);
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
          <Spacer />
          {handle.active ? (
            <Button onClick={handle.exit}>Exit fullscreen</Button>
          ) : (
            <Button onClick={handle.enter}>Enter fullscreen</Button>
          )}
          <Box w="530px" bg="white">
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
                  value: "LnW4HiRwsGV",
                },
                {
                  label: "Day 2",
                  value: "vMnKiXj54yp",
                },
                {
                  label: "Day 3",
                  value: "GyRRnHvTiD7",
                },
                {
                  label: "Day 4 (Mop up day)",
                  value: "u6Bex2ohisH",
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
              <GridItem colSpan={1} bg={bg} h="100%">
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
                          National Targets
                        </Text>
                      </Flex>
                      <VStack
                        justifyItems="space-around"
                        justifyContent="space-around"
                        w="100%"
                        h="100%"
                        flex={1}
                        spacing={0}
                      >
                        <SingleValue
                          hasLabel={false}
                          processor={targetProcessor}
                          indicator={mainDashboard.nationalTarget(
                            store.selectedUnits,
                            "Y8gfKtQJ9LV"
                          )}
                          title="Target"
                          color="black"
                        />
                        <NationalCoverage
                          indicator={mainDashboard.nationalCoverage(
                            store.selectedUnits,
                            "Y8gfKtQJ9LV",
                            days
                          )}
                          processor={nationalCoverageProcessor}
                        />
                      </VStack>
                    </Stack>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem bg={bg} colSpan={3} h="100%">
                <Stack direction="column" spacing={0} h="100%">
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
                      color="black"
                    />
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.reported(
                        store.selectedUnits,
                        days
                      )}
                      color="darkgreen"
                      title="Reported"
                    />
                    <SingleValue
                      processor={calculateReportingRates}
                      indicator={mainDashboard.rates(store.selectedUnits, days)}
                      title="Rates"
                      postfix="%"
                      otherColor={findColor}
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
                      processor={computeVaccinationTarget}
                      indicator={mainDashboard.target(store.selectedUnits)}
                      title="District Target"
                      color="black"
                      otherArgs={[realDays]}
                    />
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.vaccinated(
                        store.selectedUnits,
                        days
                      )}
                      color="darkgreen"
                      title="Vaccinated"
                    />
                    <SingleValue
                      processor={processSingleValue}
                      indicator={mainDashboard.zeroDose(
                        store.selectedUnits,
                        days
                      )}
                      color="orange.300"
                      title="Zero Dose"
                    />
                    <SingleValue
                      processor={processCoverageValue}
                      indicator={mainDashboard.coverage(
                        store.selectedUnits,
                        days
                      )}
                      postfix="%"
                      title="Coverage"
                      otherColor={findColor}
                      otherArgs={[realDays]}
                    />
                    <Box w="350px">
                      <Speed
                        processor={processCoverageValue}
                        indicator={mainDashboard.coverage(
                          store.selectedUnits,
                          days
                        )}
                        title="Vaccination Coverage"
                        otherArgs={[realDays]}
                      />
                    </Box>
                    <SingleValue
                      processor={computeWastage}
                      indicator={mainDashboard.realWastage(
                        store.selectedUnits,
                        days
                      )}
                      postfix="%"
                      title="Wastage"
                      otherColor={findWastageColor}
                      otherArgs={[realDays]}
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
                      color="black"
                    />
                    <SingleValue
                      processor={processStaffReported}
                      indicator={mainDashboard.staffReported(
                        store.selectedUnits,
                        days
                      )}
                      title="Staff Available"
                      color="darkgreen"
                      otherArgs={[realDays]}
                    />
                    <HStack w="100%" alignContent="space-around">
                      <SimpleSingleValue
                        processor={processStaffingValue}
                        indicator={mainDashboard.staffing(
                          store.selectedUnits,
                          "gfIhVhuWVHr",
                          days,
                          "aEo8TC2ZwD3"
                        )}
                        title="H/Ws"
                        otherArgs={[realDays]}
                      />
                      <SimpleSingleValue
                        processor={processStaffingValue}
                        indicator={mainDashboard.staffing(
                          store.selectedUnits,
                          "gfIhVhuWVHr",
                          days,
                          "x2B5r3OQCdA"
                        )}
                        title="Mobilizers"
                        otherArgs={[realDays]}
                      />
                      <SimpleSingleValue
                        processor={processStaffingValue}
                        indicator={mainDashboard.staffing(
                          store.selectedUnits,
                          "gfIhVhuWVHr",
                          days,
                          "CXvPyuoP80i"
                        )}
                        title="VHTs"
                        otherArgs={[realDays]}
                      />
                      <SimpleSingleValue
                        processor={processStaffingValue}
                        indicator={mainDashboard.staffing(
                          store.selectedUnits,
                          "gfIhVhuWVHr",
                          days,
                          "biWOWFj4zxB"
                        )}
                        title="PS"
                        otherArgs={[realDays]}
                      />
                    </HStack>
                    <SingleValue
                      processor={computeStaffTarget}
                      indicator={mainDashboard.staffTeamTarget(
                        store.selectedUnits
                      )}
                      title="Target Teams"
                      otherArgs={[realDays]}
                      color="black"
                    />
                    <SingleValue
                      processor={processStaffingValue}
                      indicator={mainDashboard.staffing(
                        store.selectedUnits,
                        "gfIhVhuWVHr",
                        days,
                        "aEo8TC2ZwD3"
                      )}
                      title="Reported Teams"
                      color="darkgreen"
                      otherArgs={[realDays]}
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
                            processor={processSingleValue}
                            indicator={mainDashboard.nationalTarget(
                              store.selectedUnits,
                              "PsUDvInU6eG"
                            )}
                            color="black"
                            title="Allocated"
                          />
                          <SingleValue
                            processor={calculateStockIndicators}
                            indicator={mainDashboard.issued(
                              store.selectedUnits,
                              days
                            )}
                            color="orange.300"
                            title="Received"
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
                            indicator={mainDashboard.returned(
                              store.selectedUnits,
                              days
                            )}
                            title="Returned"
                            color="darkgreen"
                          />
                          <SingleValue
                            processor={calculateStockIndicators}
                            indicator={mainDashboard.available(
                              store.selectedUnits,
                              days
                            )}
                            tooltip="Physical Balance"
                            title="Available"
                            color="black"
                          />
                          {/* <SingleValue
                            processor={calculateStockIndicators}
                            indicator={mainDashboard.discarded(
                              store.selectedUnits,
                              days
                            )}
                            title="Unusable"
                          /> */}
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
                        <HStack
                          pl="25px"
                          w="100"
                          h="20px"
                          textTransform="uppercase"
                          fontWeight="bold"
                          fontSize="0.8vw"
                          color="gray.500"
                          isTruncated
                        >
                          <Text>Unusable Vials</Text>
                          <Unusable
                            processor={calculateStockIndicators}
                            indicator={mainDashboard.discarded(
                              store.selectedUnits,
                              days
                            )}
                          />
                        </HStack>
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
              <HStack flex={1} spacing="10px">
                <Marquee
                  velocity={36}
                  direction="rtl"
                  onFinish={() => {
                    console.log("Finished");
                  }}
                  onInit={() => console.log("Initialized")}
                  resetAfterTries={200}
                  scatterRandomly={false}
                >
                  {[
                    {
                      processor: processSingleValue,
                      title: "Empty Vials",
                      indicator: mainDashboard.staffing(
                        store.selectedUnits,
                        "K3QB60hWuQI",
                        days,
                        "XRisIwF1Lk3"
                      ),
                    },
                    {
                      processor: processSingleValue,
                      title: "Partial Use",
                      indicator: mainDashboard.staffing(
                        store.selectedUnits,
                        "K3QB60hWuQI",
                        days,
                        "OevThMNdV8u"
                      ),
                    },
                    {
                      processor: processSingleValue,
                      title: "Contamination",
                      indicator: mainDashboard.staffing(
                        store.selectedUnits,
                        "K3QB60hWuQI",
                        days,
                        "WC7dEdnHjfn"
                      ),
                    },
                    {
                      processor: calculateReportingRates,
                      title: "VVM Color Change",
                      indicator: mainDashboard.staffing(
                        store.selectedUnits,
                        "K3QB60hWuQI",
                        days,
                        "uDHd6MAn9Ck"
                      ),
                    },
                    {
                      processor: calculateReportingRates,
                      title: "Others Specify",
                      indicator: mainDashboard.staffing(
                        store.selectedUnits,
                        "K3QB60hWuQI",
                        days,
                        "q9Dmtmon8oX"
                      ),
                    },
                    {
                      processor: processSingleValue,
                      title: "Health Workers",
                      indicator: mainDashboard.staffing(
                        store.selectedUnits,
                        "gfIhVhuWVHr",
                        days,
                        "aEo8TC2ZwD3"
                      ),
                    },
                    {
                      processor: processSingleValue,
                      indicator: mainDashboard.staffing(
                        store.selectedUnits,
                        "gfIhVhuWVHr",
                        days,
                        "x2B5r3OQCdA"
                      ),
                      title: "Mobilizers",
                    },
                    {
                      processor: processSingleValue,
                      indicator: mainDashboard.staffing(
                        store.selectedUnits,
                        "gfIhVhuWVHr",
                        days,
                        "CXvPyuoP80i"
                      ),
                      title: "Village Health Teams",
                    },
                    {
                      processor: processSingleValue,
                      indicator: mainDashboard.staffing(
                        store.selectedUnits,
                        "gfIhVhuWVHr",
                        days,
                        "biWOWFj4zxB"
                      ),
                      title: "Parish Supervisors	",
                    },
                  ].map(({ processor, title, indicator }) => (
                    <HStack minW="100px" mx="20px" key={title}>
                      <SingleValue
                        processor={processor}
                        direction="row"
                        indicator={indicator}
                        title={title}
                      />
                    </HStack>
                  ))}
                </Marquee>
              </HStack>
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
