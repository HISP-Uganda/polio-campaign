import { Box, HStack, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";
import { formatter } from "../utils";

export const Unusable: FC<{
  indicator: Indicator;
  processor: (data: any, ...args: any[]) => any;
}> = ({ indicator, processor }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <>
      {isLoading && "..."}
      {isSuccess && (
        <Text fontWeight="bold" color="red" fontSize="1.8vh">
          {formatter.format(processor(data))}
        </Text>
      )}
      {isError && <Box>{error.message}</Box>}
    </>
  );
};
