import {
    Box,
    Grid,
    GridItem,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";
import { BarGraph } from "./BarGraph";
import MainGraphs from "./MainGraphs";

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
        <Box>
            <Text height="48px">Polio Campaign</Text>
            <Grid
                overflow="auto"
                h={["auto", "auto", "calc(100vh - 96px)"]}
                w="100vw"
                templateColumns={templateColumns}
                gap={1}
            >
                <GridItem colSpan={[1, 1, 8]}>
                    <Grid templateRows="repeat(6, 1fr)" gap={1} h="100%">
                        <GridItem bg="grey">A</GridItem>
                        <GridItem bg="grey">B</GridItem>
                        <GridItem rowSpan={4}>
                            <MainGraphs />
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem colSpan={[1, 1, 4]}>
                    <Grid templateRows="repeat(6, 1fr)" h="100%" gap={1}>
                        <GridItem bg="grey" rowSpan={2}>
                            E
                        </GridItem>
                        <GridItem bg="grey" rowSpan={4}>
                            F
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
