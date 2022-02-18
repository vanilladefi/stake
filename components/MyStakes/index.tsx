import { isAddress, Token } from "@vanilladefi/core-sdk";
import { getAllStakes, getJuiceStakingContract } from "@vanilladefi/stake-sdk";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Column, Row } from "react-table";
import { useSnapshot } from "valtio";
import { useGetAssetPairsQuery } from "../../generated/graphql";
import { state, VanillaEvents } from "../../state";
import tokens from "../../tokens";
import { emitEvent, findToken, formatJuice } from "../../utils/helpers";
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

/**
 * Early rough implementation
 * Just a POC
 */
export const MyStakes = () => {
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
          return (
            <Box>
              {value}
            </Box>
          );
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
              {row.isExpanded ? "Cancel" : "Edit"}
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

  const [stakes, setStakes] = useState<any[] | null>(null);
  const [stakesLoading, setStakesLoading] = useState(true);

  const { signer, polygonProvider, walletAddress } = useSnapshot(state);

  const getStakes = useCallback(async () => {
    if (!walletAddress || !signer) return;

    const _tokens: Token[] = tokens
      .filter((t) => t.enabled && t.address)
      .map((t) => ({
        address: t.address as string,
        pairId: t.id,
        symbol: "",
        decimals: t.decimals + "",
        chainId: "",
        logoColor: "",
      }));

    const contractAddress = isAddress(
      process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
    );

    const res = await getAllStakes(walletAddress, _tokens, {
      signerOrProvider: signer || (polygonProvider as any),
      optionalAddress: contractAddress || "",
    });

    let _stakes: any[] = [];
    _tokens.forEach((token, idx) => {
      if (!res[idx].juiceStake.isZero()) {
        const stake = {
          id: token.pairId,
          juiceStake: formatJuice(res[idx].juiceStake),
          juiceValue: formatJuice(res[idx].juiceValue),
          sentiment: res[idx].sentiment === true ? "long" : "short",
        };
        _stakes.push(stake);
      }
    });
    setStakes(_stakes);

    if (stakesLoading) setStakesLoading(false);
  }, [stakesLoading, polygonProvider, signer, walletAddress]);

  useEffect(() => {
    const onStakesChange = () => {
      getStakes();
    };
    getStakes()
    window.addEventListener(VanillaEvents.stakesChanged, onStakesChange);
    return () => {
      window.removeEventListener(VanillaEvents.stakesChanged, onStakesChange);
    }
  }, [getStakes]);

  useEffect(() => {
    if (!walletAddress) return;

    const contractAddress = isAddress(
      process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || ""
    );
    const contract = getJuiceStakingContract({
      signerOrProvider: signer || polygonProvider || undefined,
      optionalAddress: contractAddress || undefined,
    });
    if (!contract) return;

    const onStakesChange = () => {
      emitEvent(VanillaEvents.stakesChanged);
    }

    contract.on("StakeAdded", onStakesChange);
    contract.on("StakeRemoved", onStakesChange);

    return () => {
      contract.off("StakeAdded", onStakesChange);
      contract.off("StakeRemoved", onStakesChange);
    };
  }, [getStakes, polygonProvider, signer, walletAddress]);

  const [tableData, setTableData] = useState<ColumnType[] | null>(null);
  const [stakedTotal, setStakedTotal] = useState(0);
  useEffect(() => {
    if (stakes && stakes.length) {
      let _tableData: ColumnType[] = [];
      let _stakedTotal = 0;
      priceData.forEach((pd, idx) => {
        const s = stakes.find((stake) => stake.id === findToken(pd.id)?.id);
        if (s) {
          _tableData.push({
            ...pd,
            ...s,
          });
        }
      });
      stakes.forEach((sd) => {
        _stakedTotal += Number(sd.juiceValue);
      });
      console.log(_stakedTotal);
      setStakedTotal(_stakedTotal);
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
          {(Number(state?.unstakedBalance) > 0 || stakedTotal > 0) && (
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
                {(Number(state?.unstakedBalance) + Number(stakedTotal)).toFixed(
                  3
                ) + " JUICE"}
              </Box>
              <Box
                css={{
                  fontSize: "$sm",
                  color: "$muted",
                  textTransform: "uppercase",
                }}
              >{`${Number(stakedTotal).toFixed(3)} Staked  /  ${Number(
                state?.unstakedBalance
              ).toFixed(3)} Unstaked`}</Box>
            </Box>
          )}
        </Box>
        {Number(state?.unstakedBalance) == 0 && stakedTotal == 0 && (
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
            {Number(state?.balances?.juice) > 0 ? (
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
