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
        width: "15%",
        minWidth: "250px",
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
        minWidth: "100px",
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
        minWidth: "100px",
        Cell: ({ value = "xxxx" }) => value,
      },
      {
        Header: "Price",
        accessor: "currentPrice",
        align: "right",
        width: "15%",
        minWidth: "100px",
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
          "@md": {
            flexDirection: "row",
            alignItems: "center",
          },
        }}
      >
        <Heading as="h1">My Stakes</Heading>
        <Button variant="primary" onClick={() => (state.walletOpen = true)}>
          Manage funds
        </Button>
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
            renderRowSubComponent={renderRowSubComponent}
          />
        </Box>
      ) : (
        <Container>
          <Flex column align="center" css={{ mb: "$8" }}>
            <Text muted>
              Start by adding JUICE and then making your first stake.
            </Text>
            <Link
              href="/faq"
              as="a"
              css={{
                color: "$primary",
                // fontSize: "$lg",
                p: "$2 0",
                "@md": {
                  // fontSize: "$xl",
                },
              }}
            >
              View FAQ for more info
            </Link>
          </Flex>
        </Container>
      )}
    </>
  );
};
