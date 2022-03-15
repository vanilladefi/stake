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
import { formatJuice } from "../../utils/helpers";
import { BigNumber } from "ethers";

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
        Header: "Delta",
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

  const { signer, polygonProvider } = useSnapshot(state);

  const updateLeaderboard = useCallback(async () => {
    const optionalAddress =
      isAddress(process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || "") || "";

    type LeaderBoard = [[string, BigNumber]]; // TODO fix in sdk

    /*
    const provider = signer?.provider || polygonProvider || window.ethereum;
    const before7D = await getBlockByTimestamp(
      Date.now() - 7 * 24 * 60 * 60,
      provider
    );

    const before1D = await getBlockByTimestamp(
      Date.now() - 24 * 60 * 60,
      provider
    );
    */

    const leaderboard = (await getLeaderboard(epoch, "latest", 10, {
      signerOrProvider: signer || polygonProvider || undefined,
      optionalAddress,
    })) as unknown as LeaderBoard;

    const _data = leaderboard.map(([user, delta]) => ({
      juicer: user,
      juiceAmount: formatJuice(delta),
    }));

    setData(_data);
  }, [polygonProvider, signer]);

  useEffect(() => {
    updateLeaderboard();
  }, [updateLeaderboard]);

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
