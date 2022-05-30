import { formatUnits } from "ethers/lib/utils";
import Image from "next/image";
import { CaretDown, WarningCircle } from "phosphor-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Column, Row } from "react-table";
import { useSnapshot } from "valtio";
import {
  GetAssetPairsQuery,
  useGetAssetPairsQuery,
} from "../../generated/graphql";
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
import Text from "../Text";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";

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
        align: "right",
        Cell: ({ value }) => value.split("/")[0],
      },
      {
        Header: "Price",
        id: "ATcurrentPrice",
        accessor: "currentPrice",
        align: "right",
        Cell: ({ value, row }) => {
          return (
            <Box>{valueUSD(formatUnits(value, row.original.decimals))}</Box>
          );
        },
      },
      {
        accessor: "hourlyHistory",
        id: "hourlyHistory",
        Header: "~ 24H %",
        align: "right",
        sortType: (rowA, rowB, _columnId, desc) => {
          const oldPriceA = rowA.values.hourlyHistory?.find(
            (hh: any) => Number(hh.timestamp) < Date.now() / 1000 - 60 * 60 * 25
          ).closingPrice;
          const newPriceA =
            rowA.values.hourlyHistory[rowA.values.hourlyHistory.length - 1]
              .closingPrice;
          const changeA = (newPriceA - oldPriceA) / oldPriceA;

          const oldPriceB = rowB.values.hourlyHistory?.find(
            (hh: any) => Number(hh.timestamp) < Date.now() / 1000 - 60 * 60 * 25
          ).closingPrice;
          const newPriceB =
            rowB.values.hourlyHistory[rowB.values.hourlyHistory.length - 1]
              .closingPrice;
          const changeB = (newPriceB - oldPriceB) / oldPriceB;

          return changeA - changeB;
        },
        Cell: ({
          value,
        }: {
          value: GetAssetPairsQuery["assetPairs"][number]["hourlyHistory"];
        }) => {
          const now = Date.now();
          const pricevalue = value?.find(
            (hh: any) => Number(hh.timestamp) > now / 1000 - 60 * 60 * 25
          );
          const oldPrice = pricevalue?.closingPrice;
          const newPrice = value[value.length - 1].closingPrice;
          const change = (newPrice - oldPrice) / oldPrice;
          const timeDiff =
            Date.now() / 1000 - Number(pricevalue?.timestamp || 0);
          console.log(timeDiff);
          const not24h = timeDiff > 60 * 60 * 25 || timeDiff < 60 * 60 * 23;
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
              {not24h ? (
                <Box
                  as="span"
                  css={{
                    position: "relative",
                    display: "flex",
                    mr: "$1",
                    color: "$muted",
                    alignItems: "center",
                    justifyContent: "center",
                    ".tooltip": {
                      display: "block",
                      position: "absolute",
                      left: 0,
                      background: "$background",
                    },
                    "&:hover": {},
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <WarningCircle size={24} />
                    </TooltipTrigger>
                    <TooltipContent>
                      Calculated against price from{" "}
                      {Math.round(timeDiff / 60 / 60)}h ago
                    </TooltipContent>
                  </Tooltip>
                </Box>
              ) : null}
              {Math.round(change * 10000) / 100} %{" "}
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
              css={{
                display: "inline-flex",
                height: "32px",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "$sm",
                lineHeight: "$5",
                "@md": {
                  width: "78px",
                },
              }}
              {...row.getToggleRowExpandedProps()}
            >
              <Text
                css={{
                  paddingRight: "0.35rem",
                  display: "none",
                  lineHeight: "1rem",
                  color: "$link",
                  "@md": {
                    display: "inline",
                  },
                }}
              >
                {row.isExpanded ? "Cancel" : "Stake"}
              </Text>
              <CaretDown
                style={{
                  transition: "transform .15s ease-in-out",
                  transform: row.isExpanded
                    ? "rotate(-180deg)"
                    : "rotate(0deg)",
                }}
              />
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
          Available Tokens
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
