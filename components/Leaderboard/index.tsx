import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import Box from "../Box";
import Container from "../Container";
import Text from "../Text";
import Heading from "../Heading";
import Table from "../Table";
import Flex from "../Flex";
import SegmentControl from "../SegmentControl";

export type LeaderboardRange = "all-time" | "daily" | "weekly";
export interface JuicerColumn {
  rank?: number;
  juicer: string;
  juiceAmount: string;
  performanceHourly?: string;
  performanceWeekly?: string;
}

export interface ILeaderboard {
  allTimeData?: JuicerColumn[];
  weeklyData?: JuicerColumn[];
  dailyData?: JuicerColumn[];
}

const Leaderboard: FC<ILeaderboard> = ({
  allTimeData,
  weeklyData,
  dailyData,
}) => {
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
        Header: "Juice Delta",
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

  const [dataRange, setDataRange] = useState<LeaderboardRange>("all-time");

  const getData = useCallback(() => {
    if (dataRange === "all-time") {
      return allTimeData;
    } else if (dataRange === "daily") {
      return dailyData;
    } else if (dataRange === "weekly") {
      return weeklyData;
    }
  }, [allTimeData, dailyData, dataRange, weeklyData]);

  const [data, setData] = useState<JuicerColumn[] | null>(getData() || null);

  useEffect(() => {
    const _data = getData();
    setData(_data || []);
  }, [getData]);

  const segmentData: { label: string; key: LeaderboardRange }[] = [];

  if (!(allTimeData && dailyData && weeklyData)) return null;

  if (allTimeData) {
    segmentData.push({
      label: "All time",
      key: "all-time",
    });
  }
  if (dailyData) {
    segmentData.push({
      label: "Weekly",
      key: "weekly",
    });
  }
  if (weeklyData) {
    segmentData.push({
      label: "Daily",
      key: "daily",
    });
  }

  return (
    <>
      <Container css={{ py: "$5", borderTop: "1px solid $extraMuted" }}>
        <Flex row wrap justify="end">
          <Heading
            as="h1"
            css={{
              display: "inline-block",
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
          <SegmentControl
            data={segmentData}
            onChanged={(option) => setDataRange(option.key as any)}
          />
        </Flex>
        {data && data.length === 0 ? (
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
            <Table columns={columns} data={data || []} isLoading={!data} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default Leaderboard;
