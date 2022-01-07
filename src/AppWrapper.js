import { QueryClient, QueryClientProvider } from "react-query";
import App from "./components/App";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const MyApp = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
export default MyApp;
