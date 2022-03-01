import { Box, HStack, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";
import { formatter } from "../utils";

export const NationalCoverage: FC<{
  indicator: Indicator;
  processor: (data: any, ...args: any[]) => any;
}> = ({ indicator, processor }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <HStack>
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          <Text textTransform="uppercase">Coverage</Text>
          <Text fontWeight="bold" color="green" fontSize="2.2vh">
            {formatter.format(processor(data))}%
          </Text>
        </>
      )}
      {isError && <Box>{error.message}</Box>}
    </HStack>
  );
};
