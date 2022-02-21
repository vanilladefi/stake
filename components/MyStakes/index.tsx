import { ethers } from "ethers";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Column, Row } from "react-table";
import { useSnapshot } from "valtio";
import { useGetAssetPairsQuery } from "../../generated/graphql";
import { state } from "../../state";
import { fetchStakes } from "../../state/actions/stakes";
import { findToken } from "../../utils/helpers";
import valueUSD from "../../utils/valueUSD";
import Box from "../Box";
import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Heading from "../Heading";
import Link from "../Link";
import StakeSubRow, { ColumnType } from "../StakeSubRow";
import Table from "../Table";
import Text from "../Text";

export const MyStakes = () => {
  const { stakes, rawBalances, balances } = useSnapshot(state);

  // leaving `executeQuery` to AvailableStakes component
  const [{ fetching: _, data: _data }] = useGetAssetPairsQuery();

  const priceData = useMemo(() => {
    return _data?.assetPairs.filter((t) => findToken(t.id)?.enabled) || [];
  }, [_data?.assetPairs]);

  const columns: Column<ColumnType>[] = useMemo(
    () => [
      {
        Header: "Token",
        accessor: (row): string | undefined => findToken(row.id)?.name,
        id: "tokenIcon",
        width: "25%",
        minWidth: "40px",
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
        Header: "Stake",
        accessor: "juiceValue",
        align: "right",
        width: "15%",
        minWidth: "80px",
        Cell: ({ value = 0 }) => {
          return <Box>{value}</Box>;
        },
      },
      {
        Header: "Sentiment",
        accessor: "sentiment",
        align: "right",
        width: "15%",
        minWidth: "80px",
        Cell: ({ value = "xxxx" }) => {
          return (
            <Text css={{ textTransform: "capitalize", color: "$muted" }}>
              {value}
            </Text>
          );
        },
      },
      {
        Header: "Price",
        accessor: "currentPrice",
        align: "right",
        width: "15%",
        minWidth: "80px",
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
        Header: "7D%",
        align: "right",
        minWidth: "75px",
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
        minWidth: "50px",
        Cell: ({ value, row }) => {
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
              {row.isExpanded ? "Collapse" : "Edit"}
            </Button>
          );
        },
      },
    ],
    []
  );

  const renderRowSubComponent = useCallback(
    ({ row }: { row: Row<ColumnType> }) => {
      return (
        <StakeSubRow
          type="edit"
          row={row}
          defaultStake={{
            amount: row.original.juiceValue,
            position: row.original.sentiment,
          }}
        />
      );
    },
    []
  );
  const [stakesLoading, setStakesLoading] = useState(true);

  // fetch stakes on component mount, global listeners are set in __app.tsx
  useEffect(() => {
    fetchStakes().then(() => {
      if (stakesLoading) setStakesLoading(false);
    });
  }, [stakesLoading]);

  const [tableData, setTableData] = useState<ColumnType[] | null>(null);
  useEffect(() => {
    if (stakes && stakes.length) {
      let _tableData: ColumnType[] = [];

      priceData.forEach((pd, idx) => {
        const s = stakes.find((stake) => stake.id === findToken(pd.id)?.id);
        if (s) {
          _tableData.push({
            ...pd,
            ...s,
          });
        }
      });

      setTableData(_tableData);
    } else {
      setTableData(null);
    }
  }, [priceData, stakes]);

  return (
    <>
      <Flex
        column
        align="start"
        justify="space-between"
        css={{
          mb: "$5",
          mt: "$2",
          pb: "$2",
          borderBottom: "1px solid $extraMuted",
          "@md": {
            flexDirection: "row",
            alignItems: "center",
          },
        }}
      >
        <Heading as="h1">My Stakes</Heading>
        <Box
          css={{ textAlign: "right" }}
          onClick={() => (state.walletOpen = true)}
        >
          {(rawBalances.unstakedJuice?.gt(0) ||
            rawBalances.stakedJuice?.gt(0)) && (
            <Box>
              <Box
                as="a"
                css={{
                  fontSize: "$lg",
                  cursor: "pointer",
                  color: "$link",
                  display: "inline-block",
                  mb: "$1",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {balances.totalJuice + " JUICE"}
              </Box>
              <Box
                css={{
                  fontSize: "$sm",
                  color: "$muted",
                  textTransform: "uppercase",
                }}
              >{`${balances.stakedJuice} Staked  /  ${balances.unstakedJuice} Unstaked`}</Box>
            </Box>
          )}
        </Box>
        {!rawBalances.unstakedJuice?.gt(0) && !rawBalances.stakedJuice?.gt(0) && (
          <Button variant="primary" onClick={() => (state.walletOpen = true)}>
            Manage funds
          </Button>
        )}
      </Flex>
      {tableData || (!tableData && stakesLoading) ? (
        <Box
          css={{
            overflowX: "auto",
            mb: "$10",
            "&::-webkit-scrollbar": {
              height: 0,
              background: "transparent",
            },
          }}
        >
          <Table
            columns={columns}
            isLoading={stakesLoading}
            data={tableData || []}
            myStakes
            renderRowSubComponent={renderRowSubComponent}
          />
        </Box>
      ) : (
        <Container>
          <Flex column align="center" css={{ mb: "$8" }}>
            {rawBalances.unstakedJuice?.gt(0) ? (
              <Text
                css={{
                  fontSize: "$xl",
                  p: "$2 0",
                }}
                muted
              >
                You have no active stakes yet.
              </Text>
            ) : (
              <Text
                css={{
                  fontSize: "$xl",
                  p: "$2 0",
                }}
                muted
              >
                To start staking,{" "}
                <Link
                  onClick={() => (state.walletOpen = true)}
                  as="a"
                  css={{
                    color: "$primary",
                    display: "inline",
                    cursor: "pointer",
                    textDecoration: "underline",

                    "@md": {
                      // fontSize: "$xl",
                    },
                  }}
                >
                  deposit $JUICE to your staking balance
                </Link>
              </Text>
            )}
          </Flex>
        </Container>
      )}
    </>
  );
};
