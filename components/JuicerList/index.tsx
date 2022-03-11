import { FC, useMemo } from "react";
import { Column } from "react-table";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import Box from "../Box";
import Container from "../Container";
import Text from "../Text";
import Heading from "../Heading";
import Table from "../Table";

interface IJuiceList {
  title?: string;
  noDataMessage?: string;
  getData: () => JuicerColumn[];
}

export interface JuicerColumn {
  rank?: number,
  juicer: string;
  juiceAmount: string;
  performanceHourly?: string
  performanceWeekly?: string
}

export const JuicerList: FC<IJuiceList> = ({
  title,
  noDataMessage,
  getData,
}) => {
  const {} = useSnapshot(state);

  const columns: Column<JuicerColumn>[] = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "rank",
        id: "rank",
        width: "5%",
        align: "center",
        Cell: ({ value, row }: { value: JuicerColumn["rank"]; row: any }) => {
          return <Text muted>{value || row.index}</Text>;
        },
      },
      {
        Header: "Juicer",
        accessor: "juicer",
        id: "juicer",
        width: "10%",
        minWidth: "40px",
        align: "left",
        Cell: ({ value }: { value: JuicerColumn["juicer"] }) => {
          return <Box as="a">{value}</Box>;
        },
      },
      {
        Header: "24H %",
        accessor: "performanceHourly",
        id: "performanceHourly",
        align: "right",

        Cell: ({ value }: { value: JuicerColumn["performanceHourly"] }) => {
          return (
            <Box
              css={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                color: value && +value > 0 ? "$green" : "$red",
              }}
            >
              {value || 0} %
            </Box>
          );
        },
      },
      {
        Header: "7D %",
        accessor: "performanceWeekly",
        id: "performanceWeekly",
        align: "right",

        Cell: ({ value }: { value: JuicerColumn["performanceWeekly"] }) => {
          return (
            <Box
              css={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                color: value && +value > 0 ? "$green" : "$red",
              }}
            >
              {value || 0} %
            </Box>
          );
        },
      },
      {
        Header: "Stake",
        accessor: "juiceAmount",
        id: "juiceAmount",
        align: "right",

        Cell: ({ value }: { value: JuicerColumn["juiceAmount"] }) => {
          return <Box>{value || "xxxx"}</Box>;
        },
      },
    ],
    []
  );

  return (
    <>
      <Container css={{ py: "$5" }}>
        <Heading
          as="h1"
          css={{
            flex: 1,
            fontSize: "$xl",
            "@md": {
              fontSize: "$3xl",
            },
            "@lg": {
              fontSize: "$4xl",
            },
          }}
        >
          {title || "Juicers"}
        </Heading>
        {getData().length === 0 ? (
          <p>{noDataMessage || "No juicers to display"}.</p>
        ) : (
          <Box
            css={{
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                height: 0,
                background: "transparent",
              },
            }}
          >
            <Table
              columns={columns}
              data={getData()}
            />
          </Box>
        )}
      </Container>
    </>
  );
};
