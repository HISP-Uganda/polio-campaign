import {
  Spinner,
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { FC } from "react";
import { Indicator } from "../interfaces";
import { useSqlView } from "../stores/Queries";

const TableVisualization: FC<{
  indicator: Indicator;
}> = ({ indicator }) => {
  const { isLoading, isError, isSuccess, error, data } = useSqlView(indicator);
  return (
    <Flex
      h="100%"
      w="100%"
    >
      {isLoading && <Spinner />}
      {isSuccess && (
        <Box overflow="auto">
          <Table>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                {data.numHeaders.map((header: any) => (
                  <Th key={header.name}>{header.column}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.numerators.map((row: string[], index: number) => (
                <Tr key={index}>
                  {row.map((r: string, i: number) => (
                    <Td key={`${index}${i}`}>{r}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      {isError && <Box>{error.message}</Box>}
    </Flex>
  );
};

export default TableVisualization;
