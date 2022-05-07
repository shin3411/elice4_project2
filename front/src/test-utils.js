import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const customRender = (ui, options) => {
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>, {
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
