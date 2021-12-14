import { Box, Stack, Text } from "@chakra-ui/react";
import { useMaps } from "../stores/Queries";
import Map from "./Map";
const MapVisualization = () => {
  const { isLoading, isError, isSuccess, error, data } = useMaps();
  return (
    <>
      {isLoading && <Box>Loading...</Box>}
      {isSuccess && (
        <Stack h="100%" bg="white" minH="480px">
          <Text fontSize="2xl" textAlign="center">
            Map showing vaccination results
          </Text>
          <Map metadata={data} />
        </Stack>
      )}
      {isError && <Box>{error.message}</Box>}
    </>
  );
};

export default MapVisualization;
