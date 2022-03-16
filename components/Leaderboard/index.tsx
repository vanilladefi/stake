import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import Box from "../Box";
import Container from "../Container";
import Text from "../Text";
import Heading from "../Heading";
import Table from "../Table";
import { getLeaderboard } from "@vanilladefi/stake-sdk";
import { epoch, isAddress } from "@vanilladefi/core-sdk";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import { formatJuice, getBlockByTimestamp } from "../../utils/helpers";
import { BigNumber } from "ethers";
import Flex from "../Flex";
import SegmentControl, { ISegmentControl } from "../SegmentControl";

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

  const [data, setData] = useState<JuicerColumn[] | null>(null);
  const [dataRange, setDataRange] = useState<"all-time" | "daily" | "weekly">(
    "all-time"
  );

  // Kinda like cache, so we don't have to show loaders on switching data type every time
  const [allTimeData, setAllTimeData] = useState<JuicerColumn[]>();
  const [dialyData, setDialyData] = useState<JuicerColumn[]>();
  const [weeklyData, setWeeklyData] = useState<JuicerColumn[]>();

  useEffect(() => {
    if (dataRange === "all-time") {
      setData(allTimeData || null);
    } else if (dataRange === "daily") {
      setData(dialyData || null);
    } else if (dataRange === "weekly") {
      setData(weeklyData || null);
    }
  }, [allTimeData, dataRange, dialyData, weeklyData]);

  const { signer, polygonProvider } = useSnapshot(state);

  const updateLeaderboard = useCallback(async () => {
    try {
      const optionalAddress =
        isAddress(process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || "") || "";

      type LeaderBoard = [
        [string, BigNumber] | { user: string; delta: BigNumber }
      ]; // TODO fix in sdk

      const provider = signer?.provider || polygonProvider || window.ethereum;
      const before7D = await getBlockByTimestamp(
        Date.now() - 7 * 24 * 60 * 60,
        provider
      );

      const before1D = await getBlockByTimestamp(
        Date.now() - 24 * 60 * 60,
        provider
      );

      const from =
        dataRange === "weekly"
          ? before7D
          : dataRange === "daily"
          ? before1D
          : epoch;

      const leaderboard = (await getLeaderboard(from, "latest", 10, {
        signerOrProvider: signer || polygonProvider || undefined,
        optionalAddress,
      })) as unknown as LeaderBoard;

      const _data: JuicerColumn[] = leaderboard.map((val) => {
        let user: string;
        let delta: BigNumber;
        if (val instanceof Array) {
          [user, delta] = val;
        } else {
          ({ user, delta } = val);
        }

        return {
          juicer: user,
          juiceAmount: formatJuice(delta),
        };
      });

      if (dataRange === "weekly") {
        setWeeklyData(_data);
      } else if (dataRange === "daily") {
        setDialyData(_data);
      } else {
        setAllTimeData(_data);
      }
    } catch (error) {
      console.warn(error)
    }
  }, [dataRange, polygonProvider, signer]);
  useEffect(() => {
    updateLeaderboard();
  }, [updateLeaderboard]);

  useEffect(() => {
    const DURATION = 10_000;
    const interval = setInterval(updateLeaderboard, DURATION);
    return () => {
      clearInterval(interval);
    };
  }, [updateLeaderboard]);

  const segmentData: ISegmentControl["data"] = [
    {
      label: "All time",
      key: "all-time",
    },
    {
      label: "Weekly",
      key: "weekly",
    },
    {
      label: "Daily",
      key: "daily",
    },
  ];

  return (
    <>
      <Container css={{ py: "$5" }}>
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
