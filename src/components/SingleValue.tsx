import { Spinner, Stack, Text, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";
import { formatter } from "../utils";

type func = (value: number) => string;

const ST: FC<{
  data: any;
  title: string;
  postfix?: string;
  direction?: "column" | "row";
  tooltip: string;
  color?: string;
  otherColor?: func;
}> = ({
  title,
  data,
  postfix,
  direction = "column",
  tooltip = "",
  color,
  otherColor,
}) => {
  return (
    <Stack
      spacing={direction === "column" ? 0 : "10px"}
      h="100%"
      justifyContent="center"
      alignItems="center"
      justifyItems="center"
      direction={direction}
    >
      <Tooltip label={`${tooltip} ${Number(data)}`} hasArrow placement="top">
        <Text
          textTransform="uppercase"
          fontWeight="medium"
          fontSize="2.0vh"
          isTruncated
        >
          {title}
        </Text>
      </Tooltip>

      <Text
        fontSize={"2.5vh"}
        color={
          otherColor !== undefined
            ? otherColor(Number(data))
            : !!color
            ? color
            : "red"
        }
        fontWeight="bold"
      >
        {formatter.format(Number(data))}
        {postfix}
      </Text>
    </Stack>
  );
};

const SingleValue: FC<{
  indicator: Indicator;
  title: string;
  postfix?: string;
  direction?: "column" | "row";
  processor: (...data: any[]) => any;
  tooltip?: string;
  otherArgs?: any[];
  color?: string;
  otherColor?: func;
}> = ({
  indicator,
  title,
  postfix = "",
  direction = "column",
  tooltip = "",
  processor,
  color,
  otherArgs = [],
  otherColor
}) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <Stack h="100%" justifyItems="center" justifyContent="center">
      {isLoading && <Spinner />}
      {isSuccess && (
        <ST
          color={color}
          otherColor={otherColor}
          tooltip={tooltip}
          direction={direction}
          title={title}
          data={processor(data, ...otherArgs)}
          postfix={postfix}
        />
      )}
      {isError && <pre>{error.message}</pre>}
    </Stack>
  );
};

export default SingleValue;
