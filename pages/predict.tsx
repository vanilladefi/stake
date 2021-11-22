import React, { useEffect, useMemo, useCallback, useState } from "react";
import Image from "next/image";
import Box from "../components/Box";
import Button from "../components/Button";
import Container from "../components/Container";
import Flex from "../components/Flex";
import Heading from "../components/Heading";
import Table from "../components/Table";
import Text from "../components/Text";

import { Column, Row } from "react-table";
import valueUSD from "../utils/valueUSD";
import { useGetAssetPairsQuery } from "../generated/graphql";
import { ethers } from "ethers";
import tokens from "../tokensV2";
import Input from "../components/Input";
import { rgba } from "polished";

type ColumnType = {
  __typename?: "AssetPair";
  id: string;
  currentPrice: any;
  decimals: number;
  roundId: any;
  hourRoundId: number;
  timestamp: any;
  hourlyHistory: Array<{
    __typename?: "HourlyPriceHistory";
    hourStamp: any;
    id: string;
    openingPrice: any;
    closingPrice: any;
    lowPrice: any;
    highPrice: any;
    timestamp: any;
  }>;
};

const Predict = () => {
  const [{ fetching, data }, executeQuery] = useGetAssetPairsQuery({});
  // refetch data every 60 seconds
  useEffect(() => {
    if (!fetching) {
      const id = setTimeout(
        () => executeQuery({ requestPolicy: "network-only" }),
        60000
      );
      return () => clearTimeout(id);
    }
  }, [fetching, executeQuery]);

  const columns: Column<ColumnType>[] = useMemo(
    () => [
      {
        Header: "Token",
        accessor: "id",
        id: "tokenIcon",
        width: "20%",
        minWidth: "320px",
        align: "left",
        Cell: ({ value, row }) => {
          return (
            <Flex css={{ alignItems: "center" }}>
              <Box
                css={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                  position: "relative",
                  overflow: "hidden",
                  padding: "3px",
                }}
              >
                {tokens.find((tt) => tt.id === row.original.id.split("/")[0])
                  ?.imageUrl ? (
                  <Image
                    width="18px"
                    height="18px"
                    layout="fixed"
                    objectFit="cover"
                    src={`/token-assets/${row.original.id.split("/")[0]}.png`}
                    alt="Token icon"
                  />
                ) : null}
              </Box>
              <Box css={{ ml: "10px" }}>
                {tokens.find((token) => token.id === value.split("/")[0])?.name}
              </Box>
            </Flex>
          );
        },
      },
      {
        Header: "Ticker",
        accessor: "id",
        align: "left",
        width: "10%",
        minWidth: "50px",
        Cell: ({ value }) => value.split("/")[0],
      },
      {
        Header: "Price",
        accessor: "currentPrice",
        align: "right",
        width: "20%",
        minWidth: "150px",
        Cell: ({ value, row }) => {
          return (
            <Box>
              {valueUSD(ethers.utils.formatUnits(value, row.original.decimals))}
            </Box>
          );
        },
      },
      {
        accessor: "hourlyHistory",
        Header: "24H %",
        align: "right",
        minWidth: "100px",
        Cell: ({ value }) => {
          const oldPrice = value[0].closingPrice;
          const newPrice = value[value.length - 1].closingPrice;
          const change = (newPrice - oldPrice) / oldPrice;
          const lineData = value.map((i) => ({
            x: Number(i.timestamp),
            y: i.closingPrice,
          }));
          return (
            <Box
              css={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                color: change < 0 ? "$red" : "$green",
              }}
            >
              {Math.round(change * 10000) / 100} %
            </Box>
          );
        },
      },
      {
        id: "expander",
        accessor: "id",
        Header: "",
        align: "right",
        width: "10%",
        minWidth: "100px",
        Cell: ({ value, row }) => {
          return (
            <Button
              ghost
              uppercase
              variant="primary"
              size="sm"
              active={row.isExpanded}
              css={{ width: "70px", borderRadius: "$sm", fontSize: "13px" }}
              {...row.getToggleRowExpandedProps()}
            >
              {row.isExpanded ? "Cancel" : "Stake"}
            </Button>
          );
        },
      },
    ],
    []
  );

  const renderRowSubComponent = useCallback(
    ({ row }: { row: Row<ColumnType> }) => {
      return <SubRow row={row} />;
    },
    []
  );

  return (
    <Container>
      <Heading as="h1">Available Tokens</Heading>
      {fetching && !data ? (
        <p>loading</p>
      ) : (
        <Box css={{ overflowX: "scroll" }}>
          <Table
            columns={columns}
            data={data?.assetPairs || []}
            renderRowSubComponent={renderRowSubComponent}
          />
        </Box>
      )}
    </Container>
  );
};

const SubRow = ({ row }: { row: Row<ColumnType> }) => {
  const [stakeAmount, setStakeAmount] = useState("100");
  const [stakePosition, setStakePosition] = useState<"long" | "short">("long");
  return (
    <Flex
      css={{
        flex: 1,
        boxShadow: "inset 0px 0px 0px 1px $colors$muted",
      }}
    >
      <Flex
        css={{
          p: "$3 $5",
          borderRight: "1px solid $colors$muted",
          alignItems: "center",
        }}
      >
        <Text css={{ color: "$muted", fontSize: "$xl" }}>Stake</Text>
        <Input
          size="lg"
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          css={{ width: "200px", textAlign: "right", mx: "$3" }}
        />{" "}
        <Image
          alt="Vanilla drop icon"
          width="20px"
          height="20px"
          src="/vanilla-drop.svg"
        />
      </Flex>
      <Box css={{ p: "$5", borderRight: "1px solid $colors$muted" }}>
        <Text css={{ color: "$muted", fontSize: "$xl", mr: "$5" }}>To</Text>
        <Button
          onClick={() => setStakePosition("long")}
          outline
          uppercase
          size="sm"
          css={{
            width: "90px",
          }}
          active={stakePosition === "long"}
        >
          Long
        </Button>
        <Button
          onClick={() => setStakePosition("short")}
          outline
          uppercase
          size="sm"
          css={{
            width: "90px",
          }}
          active={stakePosition === "short"}
        >
          Short
        </Button>
      </Box>
      <Flex
        css={{
          p: "$5",
          alignItems: "center",
          borderRight: "1px solid $colors$muted",
          flex: 1,
        }}
      >
        <Box
          css={{
            width: "24px",
            height: "24px",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            position: "relative",
            overflow: "hidden",
            padding: "3px",
          }}
        >
          {tokens.find((tt) => tt.id === row.original.id.split("/")[0])
            ?.imageUrl ? (
            <Image
              width="18px"
              height="18px"
              layout="fixed"
              objectFit="cover"
              src={`/token-assets/${row.original.id.split("/")[0]}.png`}
              alt="Token icon"
            />
          ) : null}
        </Box>
        <Box css={{ ml: "10px" }}>
          {
            tokens.find((token) => token.id === row.original.id.split("/")[0])
              ?.name
          }
        </Box>
      </Flex>
      <Flex
        css={{
          width: "110px",
          px: "$3",
          borderRight: "1px solid $colors$muted",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "$red",
          "&:hover": {
            backgroundColor: rgba(255, 255, 255, 0.1),
            cursor: "pointer",
          },
        }}
      >
        Close position
      </Flex>
      <Flex
        css={{
          width: "110px",
          px: "$3",
          borderRight: "1px solid $colors$muted",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          "&:hover": {
            backgroundColor: rgba(255, 255, 255, 0.1),
            cursor: "pointer",
          },
        }}
      >
        Short
      </Flex>
    </Flex>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const provider = new ethers.providers.JsonRpcProvider(
//     "https://polygon-mainnet.g.alchemy.com/v2/XYdYJcT9qMRjn9g3CQItb1FuMru5Zol8"
//   );
//   const priceFeed = new ethers.Contract(
//     "0x72484B12719E23115761D5DA1646945632979bB6",
//     aggregatorV3InterfaceABI,
//     provider
//   );
//   const addr = "0x2A8758b7257102461BC958279054e372C2b1bDE6";
//   const roundData = await priceFeed.latestRoundData();
//   console.log(roundData);
//   console.log("answer", roundData.answer.toString());
//   console.log("answer", roundData.roundId.toString());
//   return {
//     props: {
//       // roundData,
//     },
//   };
// };

export default Predict;
