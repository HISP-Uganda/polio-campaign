import { Box } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
const App = () => {
  // const store = useStore($store);
  // const { isLoading, isError, isSuccess, error, data } = useAnalytics('K3QB60hWuQI', 'THIS_MONTH', 'akV6429SUqu', false, false, true);
  return (
    <Box w="100vw" h="calc(100vh - 48px)">
      {/* {isLoading && <Box>Loading...</Box>}
            {isSuccess && <Box>
                <BarGraph analytics={data} />
            </Box>}
            {isError && <Box>{error.message}</Box>} */}
      <Dashboard />
    </Box>
  );
};

export default App;
