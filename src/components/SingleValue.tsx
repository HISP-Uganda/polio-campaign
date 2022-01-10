import {
  CircularProgress,
  CircularProgressLabel,
  Spinner,
  Text,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";

const ST: FC<{
  data: any;
  title: string;
  postfix?: string;
  hasProgress?: boolean;
  direction?: "column" | "row";
}> = ({ title, data, postfix, hasProgress, direction = "column" }) => {
  return (
    <Stack
      spacing={direction === "column" ? 0 : "10px"}
      h="100%"
      justifyContent="center"
      alignItems="center"
      justifyItems="center"
      direction={direction}
    >
      <Text
        textTransform="uppercase"
        fontWeight="medium"
        fontSize="1.2vw"
        isTruncated
      >
        {title}
      </Text>
      <Text fontSize={"2.0vw"} color="red" fontWeight="bold">
        {Number(data).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })}
        {postfix}
      </Text>
    </Stack>
  );
};

const PR: FC<{ data: any; title: string; postfix?: string }> = ({
  title,
  data,
  postfix,
}) => {
  return (
    <Stack
      spacing={0}
      h="100%"
      justifyContent="center"
      alignItems="center"
      justifyItems="center"
    >
      <Text textTransform="uppercase" fontWeight="medium" fontSize="1.2vw">
        {title}
      </Text>
      <CircularProgress value={Number(data)} size="80px">
        <CircularProgressLabel fontSize="1.0vw" fontWeight="bold">
          {Number(data).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          {postfix}
        </CircularProgressLabel>
      </CircularProgress>
    </Stack>
  );
};

const SingleValue: FC<{
  indicator: Indicator;
  title: string;
  postfix?: string;
  hasProgress?: boolean;
  direction?: "column" | "row";
}> = ({
  indicator,
  title,
  postfix = "",
  hasProgress = false,
  direction = "column",
}) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <Stack h="100%" justifyItems="center" justifyContent="center">
      {isLoading && <Spinner />}
      {isSuccess && (
        <ST
          direction={direction}
          title={title}
          data={
            Number(data.numerators) !== NaN && Number(data.denominators) !== NaN
              ? Number(data.denominators) === 0
                ? 0
                : data.numerators / data.denominators
              : 0
          }
          postfix={postfix}
          hasProgress={hasProgress}
        />
      )}
      {isError && <pre>{JSON.stringify(error)}</pre>}
    </Stack>
  );
};

export default SingleValue;
