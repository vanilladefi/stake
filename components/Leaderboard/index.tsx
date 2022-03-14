import { FC, useMemo } from "react";
import { Column } from "react-table";
import Box from "../Box";
import Container from "../Container";
import Text from "../Text";
import Heading from "../Heading";
import Table from "../Table";

export interface JuicerColumn {
  rank?: number;
  juicer: string;
  juiceAmount: string;
  performanceHourly?: string;
  performanceWeekly?: string;
}

const Leaderboard: FC = () => {
  const columns: Column<JuicerColumn>[] = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "rank",
        id: "rank",
        width: "5%",
        align: "center",
        Cell: ({ value, row }: { value: JuicerColumn["rank"]; row: any }) => {
          return <Text muted>{value || row.index + 1}</Text>;
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
          return <Text>{value}</Text>;
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

  const data = useMemo(() => {
    return [
      {
        juicer: "mama's boy",
        juiceAmount: "12345.5",
        performanceHourly: "5.5",
        performanceWeekly: "-6.8",
      },
      {
        juicer: "Someoneelse.eth",
        juiceAmount: "12345.5",
        performanceHourly: "22.56",
        performanceWeekly: "-5.33",
      },
      {
        juicer: "mama's boy",
        juiceAmount: "12345.5",
        performanceHourly: "5.5",
        performanceWeekly: "-6.8",
      },
      {
        juicer: "Someoneelse.eth",
        juiceAmount: "12345.5",
        performanceHourly: "22.56",
        performanceWeekly: "-5.33",
      },
      {
        juicer: "mama's boy",
        juiceAmount: "12345.5",
        performanceHourly: "5.5",
        performanceWeekly: "-6.8",
      }
    ];
  }, []);

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
          {"Leaderboard"}
        </Heading>
        {data.length === 0 ? (
          <p>{"No juicers to display"}.</p>
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
            <Table columns={columns} data={data} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Leaderboard