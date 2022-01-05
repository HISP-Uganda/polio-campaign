import { Spinner, Stack, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { FC } from "react";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";

const SingleValue: FC<{ indicator: Indicator; title: string }> = ({
  indicator,
  title,
}) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <Stack>
      {isLoading && <Spinner />}
      {isSuccess && (
        <Stat px={{ base: 2, md: 4 }} py={"5"} textAlign="center">
          <StatLabel
            textTransform="uppercase"
            fontWeight="medium"
            fontSize="2xl"
            isTruncated
          >
            {title}
          </StatLabel>
          <StatNumber fontSize={"3xl"} color="red" fontWeight={"medium"}>
            {Number(data.numerators).toLocaleString(undefined, {
              minimumFractionDigits: 0,
            })}
          </StatNumber>
        </Stat>
      )}
      {isError && <pre>{JSON.stringify(error)}</pre>}
    </Stack>
  );
};

export default SingleValue;
