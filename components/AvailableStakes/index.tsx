import React, { useEffect, useMemo, useCallback, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { Column, Row } from "react-table";

import Box from "../Box";
import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Heading from "../Heading";
import Table from "../Table";

import valueUSD from "../../utils/valueUSD";
import { useGetAssetPairsQuery } from "../../generated/graphql";
import tokens from "../../tokensV2";
import StakeSubRow, { ColumnType } from "../StakeSubRow";
import TableFilter from "../TableFilter";

export const AvailableStakes = () => {
  const [{ fetching, data }, executeQuery] = useGetAssetPairsQuery();
  // refetch data every 60 seconds
  useEffect(() => {
    const id = setTimeout(() => {
      if (!fetching) {
        executeQuery({ requestPolicy: "network-only" });
      }
    }, 2000);
    return () => clearTimeout(id);
  }, [fetching, executeQuery]);

  const columns: Column<ColumnType>[] = useMemo(
    () => [
      {
        Header: "Token",
        accessor: (row): string | undefined => {
          const name = tokens.find(
            (token) => token.id === row.id.split("/")[0]
          )?.name;
          return name;
        },
        id: "tokenIcon",
        width: "20%",
        minWidth: "320px",
        align: "left",
        Cell: ({
          value,
          row,
        }: {
          value: string | undefined;
          row: Row<ColumnType>;
        }) => {
          return (
            <Flex css={{ alignItems: "center" }}>
              <Box
                css={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "rgba(255,255,255,1)",
                  borderRadius: "5px",
                  position: "relative",
                  overflow: "hidden",
                  p: "3px",
                }}
              >
                {tokens.find((tt) => tt.id === row.original.id.split("/")[0])
                  ?.imageUrl ? (
                  <Image
                    width="24px"
                    height="24px"
                    layout="fixed"
                    objectFit="cover"
                    src={`/token-assets/${row.original.id.split("/")[0]}.png`}
                    alt="Token icon"
                  />
                ) : null}
              </Box>
              <Box css={{ ml: "15px" }}>{value}</Box>
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

  const [filterValue, setFilterValue] = useState("");

  return (
    <>
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
