import React, { useEffect, useMemo, useCallback, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { GetStaticProps } from "next";
import { Column, Row } from "react-table";

import Box from "../components/Box";
import Button from "../components/Button";
import Container from "../components/Container";
import Flex from "../components/Flex";
import Heading from "../components/Heading";
import Stack from "../components/Stack";
import Table from "../components/Table";
import Text from "../components/Text";

import valueUSD from "../utils/valueUSD";
import {
  GetAssetPairsDocument,
  useGetAssetPairsQuery,
} from "../generated/graphql";
import tokens from "../tokensV2";
import client, { ssrCache } from "../urql";
import StakeSubRow, { ColumnType } from "../components/StakeSubRow";
import { ArrowRight } from "phosphor-react";
import TableFilter from "../components/TableFilter";

const Predict = () => {
  const [{ fetching, data }, executeQuery] = useGetAssetPairsQuery();
  const [filterValue, setFilterValue] = useState("");
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
        accessor: (row) => {
          const name = tokens.find(
            (token) => token.id === row.id.split("/")[0]
          )?.name;
          return name;
        },
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
              <Box css={{ ml: "10px" }}>{value}</Box>
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
      return <StakeSubRow row={row} />;
    },
    []
  );

  return (
    <>
      <Flex
        css={{
          backgroundColor: "rgba(255, 201, 170, 0.02)",
          py: "$16",
        }}
      >
        <Container>
          <Stack
            css={{
              flexDirection: "column-reverse",
              flex: 1,
              "@md": {
                flexDirection: "row",
              },
            }}
          >
            <Stack
              css={{
                width: "70%",
                flexDirection: "column",
                gap: "$8",
              }}
            >
              <Heading css={{ fontSize: "$6xl", maxWidth: "300px" }}>
                Start
                <br /> Staking
              </Heading>
              <Text
                css={{
                  fontWeight: 300,
                  fontSize: "$2xl",
                  color: "$offWhite85",
                }}
              >
                Create an investment portfolio by staking $JUICE. Earn rewards.
              </Text>
              <Stack
                css={{
                  flexDirection: "column",
                  gap: "$3",
                  mt: "$3",
                  alignItems: "flex-start",
                }}
              >
                <Flex
                  css={{
                    color: "$primary",
                    alignItems: "center",
                    gap: "$3",
                    fontSize: "$2xl",
                    lineHeight: 1,
                    fontWeight: 300,
                    cursor: "pointer",
                    borderColor: "$primary",
                    "&:hover": {
                      color: "$primaryDark",
                      borderColor: "$primaryDark",
                    },
                  }}
                >
                  <ArrowRight />{" "}
                  <Box as="span" css={{ borderBottom: "1px solid" }}>
                    Connect wallet
                  </Box>
                </Flex>
                <Flex
                  css={{
                    color: "$primary",
                    alignItems: "center",
                    gap: "$3",
                    fontSize: "$2xl",
                    fontWeight: 300,
                    cursor: "pointer",
                    "&:hover": {
                      color: "$primaryDark",
                    },
                  }}
                >
                  <ArrowRight />{" "}
                  <Box as="span" css={{ borderBottom: "1px solid" }}>
                    Learn more
                  </Box>
                </Flex>
              </Stack>
            </Stack>
            <Flex
              css={{
                width: "30%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                css={{
                  position: "relative",
                  width: "153px",
                  height: "199px",
                }}
              >
                <Image
                  src="/juicing.svg"
                  alt="Juicing Icon"
                  width="153px"
                  height="199px"
                  objectFit="contain"
                />
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Flex>
      <TableFilter onChange={(value) => setFilterValue(value)} />
      <Container css={{ py: "$5" }}>
        <Heading as="h1">Available Stakes</Heading>
        {!data ? (
          <p>loading</p>
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
              filter={filterValue}
              columns={columns}
              data={data?.assetPairs || []}
              renderRowSubComponent={renderRowSubComponent}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    await client.query(GetAssetPairsDocument).toPromise();
    return {
      props: {
        // urql uses this to rehydrate cache
        urqlState: ssrCache.extractData(),
      },
      revalidate: 60,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
      revalidate: 60,
    };
  }
};

export default Predict;
