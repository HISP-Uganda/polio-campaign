import { Box, Grid, GridItem } from "@chakra-ui/layout"

const Dashboard = () => {
  return (
    <Grid
      h="calc(100vh - 48px)"
      templateRows="repeat(13, 1fr)"
      templateColumns="repeat(12, 1fr)"
      gap={2}
    >
      <GridItem colSpan={12} bg="tomato"></GridItem>
      <GridItem colSpan={[1, 2, 4]} rowSpan={2} bg="yellow"></GridItem>
      <GridItem colSpan={5} rowSpan={2} bg="papayawhip"></GridItem>
      <GridItem colSpan={3} rowSpan={2} bg="papayawhip"></GridItem>
      <GridItem colSpan={5} bg="papayawhip" rowSpan={9}></GridItem>
      <GridItem colSpan={5} bg="papayawhip" rowSpan={9}></GridItem>
      <GridItem colSpan={2} bg="papayawhip" rowSpan={2}></GridItem>
      <GridItem colSpan={2} bg="papayawhip" rowSpan={2}></GridItem>
      <GridItem colSpan={2} bg="papayawhip" rowSpan={2}></GridItem>
      <GridItem colSpan={2} bg="papayawhip" rowSpan={3}></GridItem>
      <GridItem colSpan={12} bg="papayawhip" rowSpan={2}></GridItem>
    </Grid>
  )
}

export default Dashboard
