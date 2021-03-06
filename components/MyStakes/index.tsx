import { BigNumber } from "ethers";
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
import { Stake, state } from "../../state";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";

export const MyStakes = () => {
  const { stakes, rawBalances, balances } = useSnapshot(state);
  // leaving `executeQuery` to AvailableStakes component
  const [{ fetching: _, data: _data }] = useGetAssetPairsQuery();

  const priceData = useMemo(() => {
    return _data?.assetPairs.filter((t) => findToken(t.id)) || [];
  }, [_data?.assetPairs]);

  const columns: Column<ColumnType>[] = useMemo(
    () => [
      {
        Header: "Token",
        accessor: (row): string | undefined =>
          findToken(row.id)?.id.split("/")[0],
        id: "token",
        width: "10%",
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
        Header: "Stake",
        accessor: (row) => row.currentStake?.juiceValue,
        id: "currentStake.juiceValue",
        align: "right",

        Cell: ({ value }: { value: string | undefined }) => {
          return <Box>{value || "xxxx"}</Box>;
        },
      },
      {
        Header: "Juiced",
        accessor: ({ currentStake }) => currentStake?.juiceChange,
        id: "currentStake.juiceDelta",
        align: "right",
        Cell: ({ row }: { row: Row<ColumnType> }) => {
          const { rawJuiceStake, juiceChange } =
            row.original.currentStake || {};

          let percentage = "0";
          if (rawJuiceStake && juiceChange) {
            let v = BigNumber.from(juiceChange)
              .mul(10 ** 4)
              .div(rawJuiceStake);

            percentage = Number(formatUnits(v, 2)).toFixed(2);
          } else {
            percentage = "0";
          }
          return (
            <Box
              css={{
                color: +percentage < 0 ? "$red" : "$green",
                whiteSpace: "nowrap",
              }}
            >
              {percentage} %
            </Box>
          );
        },
      },
      {
        Header: "Sentiment",
        accessor: (row) => row.currentStake?.sentiment,
        id: "currentStake.sentiment",
        align: "right",
        Cell: ({ value }: { value: string | undefined }) => {
          return (
            <Text css={{ textTransform: "capitalize", color: "$muted" }}>
              {value || "xxxx"}
            </Text>
          );
        },
      },
      {
        Header: "Price",
        is: "currentPrice",
        accessor: "currentPrice",
        align: "right",
        Cell: ({ value, row }) => {
          return (
            <Box>{valueUSD(formatUnits(value, row.original.decimals))}</Box>
          );
        },
      },
      {
        id: "history",
        accessor: "hourlyHistory",
        Header: "~ 24H %",
        align: "right",
        sortType: (rowA, rowB, _columnId) => {
          const now = Date.now();
          const oldPriceA =
            rowA.values.history.find(
              (hh: any) => Number(hh.timestamp) > now / 1000 - 60 * 60 * 25
            )?.closingPrice || rowA.values.history?.[0].closingPrice;
          const newPriceA =
            rowA.values.history?.[rowA.values.history.length - 1].closingPrice;
          const changeA = (newPriceA - oldPriceA) / oldPriceA;

          const oldPriceB =
            rowB.values.history.find(
              (hh: any) => Number(hh.timestamp) > now / 1000 - 60 * 60 * 25
            )?.closingPrice || rowB.values.history?.[0].closingPrice;
          const newPriceB =
            rowB.values.history?.[rowB.values.history.length - 1].closingPrice;
          const changeB = (newPriceB - oldPriceB) / oldPriceB;
          return changeA - changeB;
        },
        Cell: ({
          value,
        }: {
          value: GetAssetPairsQuery["assetPairs"][number]["hourlyHistory"];
        }) => {
          const now = Date.now();
          const pricevalue =
            value?.find(
              (hh: any) => Number(hh.timestamp) > now / 1000 - 60 * 60 * 25
            ) || value?.[0];
          const oldPrice = pricevalue?.closingPrice;
          const newPrice = value[value.length - 1].closingPrice;
          const change = (newPrice - oldPrice) / oldPrice;
          const timeDiff =
            Date.now() / 1000 - Number(pricevalue?.timestamp || 0);
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
        Cell: ({ value, row }) => {
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
                "@sm": {
                  width: "60px",
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
                  "@sm": {
                    display: "inline",
                  },
                }}
              >
                Edit
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
      return <StakeSubRow type="edit" row={row} />;
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

      priceData.forEach((pd) => {
        const currentStake: Stake | undefined = stakes.find(
          (stake) => stake.id === findToken(pd.id)?.id
        );
        if (currentStake) {
          _tableData.push({
            ...pd,
            currentStake,
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
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mb: "$3",
          mt: "$4",
          pb: "$4",
          borderBottom: "1px solid $extraMuted",
        }}
      >
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
          My Stakes
        </Heading>
        <Box css={{ textAlign: "right" }}>
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
                onClick={() => (state.walletOpen = true)}
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
            Deposit JUICE
          </Button>
        )}
      </Flex>
      {tableData || (!tableData && stakesLoading) ? (
        <Box
          css={{
            overflowX: "auto",
            mb: "$4",
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
                  p: "$4 0 0",
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
