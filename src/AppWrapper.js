import { ChakraProvider } from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
const queryClient = new QueryClient();

import App from "./components/App";
const MyApp = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </QueryClientProvider>
);

export default MyApp;
