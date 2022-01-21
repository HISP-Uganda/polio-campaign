import { VStack, Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";
import { formatter } from "../utils";
const SimpleSingleValue: FC<{
  indicator: Indicator;
  title: string;
  processor: (...args: any[]) => any;
  otherArgs?: any[];
}> = ({ indicator, title, processor, otherArgs = [] }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);

  return (
    <VStack w="100%">
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          <Text fontWeight="bold">{title}</Text>
          <Text color="darkgreen">
            {formatter.format(processor(data, ...otherArgs))}
          </Text>
        </>
      )}
      {isError && <Text>{error.message}</Text>}
    </VStack>
  );
};

export default SimpleSingleValue;
