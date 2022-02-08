import { isAddress, Token } from "@vanilladefi/core-sdk";
import { getAllStakes, getJuiceStakingContract } from "@vanilladefi/stake-sdk";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Column, Row } from "react-table";
import { snapshot } from "valtio";
import { useGetAssetPairsQuery } from "../../generated/graphql";
import { state } from "../../state";
import tokens from "../../tokensV2";
import valueUSD from "../../utils/valueUSD";
import Box from "../Box";
import Button from "../Button";
import Container from "../Container";
import Flex from "../Flex";
import Heading from "../Heading";
import Link from "../Link";
import Loader from "../Loader";
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
    return (
      _data?.assetPairs.filter((t) => {
        const id = t.id.split("/")[0];
        const isEnabled = tokens.find((ot) => ot.id === id)?.enabled;
        return isEnabled;
      }) || []
    );
  }, [_data?.assetPairs]);

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
        Header: "Stake",
        accessor: "stakedAmount",
        align: "right",
        width: "15%",
        minWidth: "100px",
        Cell: ({ value = 0 }) => {
          return (
            <Box>
              {value}
              {/* {valueUSD(ethers.utils.formatUnits(value, row.original.decimals))} */}
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
      return <StakeSubRow type="edit" row={row} />;
    },
    []
  );

  const [stakes, setStakes] = useState<any[] | null>(null);
  const [stakesLoading, setStakesLoading] = useState(true);

  const getStakes = useCallback(async () => {
    const { provider, signer, walletAddress } = snapshot(state);

    if (!walletAddress) return;

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

    const res = await getAllStakes(
      walletAddress,
      _tokens,
      { signerOrProvider: signer || provider as any },
    );
    let stakes: any[] = [];

    _tokens.forEach((token, idx) => {
      if (!res[idx].amount.isZero()) {
        const stake = {
          id: token.pairId,
          stakedAmount: res[idx].amount.toString(),
          sentiment: res[idx].sentiment === true ? "long" : "short",
        };
        stakes.push(stake);
      }
    });
    setStakes(stakes);

    if (stakesLoading) setStakesLoading(false);
  }, [stakesLoading]);

  useEffect(() => {
    getStakes();
  }, [getStakes]);

  useEffect(() => {
    const {signer, provider, walletAddress} = snapshot(state);
    if (!walletAddress) return 

    const contract = getJuiceStakingContract({
      signerOrProvider: signer || provider || undefined,
      optionalAddress:
      isAddress(process.env.NEXT_PUBLIC_VANILLA_ROUTER_ADDRESS || "") || undefined,
    });
    if (!contract) return
    
    const onStakesChanged = () => {
      getStakes();
    };

    contract.on("StakeAdded", onStakesChanged);
    contract.on("StakeRemoved", onStakesChanged);
    
    return () => {
      contract.off("StakeAdded", onStakesChanged);
      contract.off("StakeRemoved", onStakesChanged);
    };
  }, [getStakes]);

  const [tableData, setTableData] = useState<ColumnType[] | null>(null);
  useEffect(() => {
    if (stakes && stakes.length) {
      let _tableData: ColumnType[] = [];
      priceData.forEach((pd, idx) => {
        const s = stakes.find((stake) => stake.id === pd.id.split("/")[0]);
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
      {stakesLoading ? (
        <Flex
          align="center"
          justify="center"
          css={{ mb: "$3", height: "92px" }}
        >
          <Loader />
        </Flex>
      ) : tableData ? (
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
            data={tableData}
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
