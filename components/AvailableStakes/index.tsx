import { ethers } from "ethers";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Column, Row } from "react-table";
import { useSnapshot } from "valtio";
import { useGetAssetPairsQuery } from "../../generated/graphql";
import { state } from "../../state";
import { findToken } from "../../utils/helpers";
import valueUSD from "../../utils/valueUSD";
import Box from "../Box";
import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Heading from "../Heading";
import StakeSubRow, { ColumnType } from "../StakeSubRow";
import Table from "../Table";
import TableFilter from "../TableFilter";

export const AvailableStakes = () => {
  const { stakes } = useSnapshot(state);
  const [{ fetching, data: _data }, executeQuery] = useGetAssetPairsQuery();

  const getData = useCallback(() => {
    const filteredTokens =
      _data?.assetPairs.filter((t) => {
        const token = findToken(t.id);
        return (
          token?.enabled && !stakes?.find((stake) => stake.id === token?.id)
        );
      }) || [];
    return filteredTokens;
  }, [stakes, _data]);

  // refetch data every 3 seconds
  useEffect(() => {
    const id = setTimeout(() => {
      if (!fetching) {
        executeQuery({ requestPolicy: "network-only" });
      }
    }, 3000);
    return () => clearTimeout(id);
  }, [fetching, executeQuery]);

  const columns: Column<ColumnType>[] = useMemo(
    () => [
      {
        Header: "Token",
        accessor: (row): string | undefined => findToken(row.id)?.name,
        id: "tokenIcon",

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
                  overflow: "hidden",
                  p: "3px",
                  flexShrink: 0,
                }}
              >
                {findToken(row.original.id)?.imageUrl ? (
                  <Image
                    width="24px"
                    height="24px"
                    layout="fixed"
                    objectFit="cover"
                    src={`/token-assets/${
                      findToken(row.original.id)?.imageUrl
                    }`}
                    alt="Token icon"
                  />
                ) : null}
              </Box>
              <Box
                css={{
                  ml: "$3",
                  display: "none",
                  "@sm": {
                    display: "flex",
                  },
                }}
              >
                {value}
              </Box>
            </Flex>
          );
        },
      },
      {
        Header: "Ticker",
        id: "ticker",
        accessor: "id",
        align: "left",
        Cell: ({ value }) => value.split("/")[0],
      },
      {
        Header: "Price",
        id: "ATcurrentPrice",
        accessor: "currentPrice",
        align: "right",
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
        id: "hourlyHistory",
        Header: "24H %",
        align: "right",
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
        Cell: ({ row }) => {
          return (
            <Button
              ghost
              uppercase
              variant="primary"
              size="sm"
              active={row.isExpanded}
              css={{ width: "auto", fontSize: "$sm", lineHeight: "$5" }}
              {...row.getToggleRowExpandedProps()}
            >
              {row.isExpanded ? "Collapse" : "Stake"}
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
      <TableFilter onChange={setFilterValue} />
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
          Available Stakes
        </Heading>
        {getData().length === 0 ? (
          <p>You have open stakes in every available token.</p>
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
              // isLoading={fetching}
              columns={columns}
              data={getData()}
              renderRowSubComponent={renderRowSubComponent}
            />
          </Box>
        )}
      </Container>
    </>
  );
};
