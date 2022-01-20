import React, { useState } from "react";
import { Row } from "react-table";
import Image from "next/image";

import tokens from "../../tokensV2";
import Box from "../Box";
import Button from "../Button";
import Flex from "../Flex";
import Input from "../Input";
import Text from "../Text";

export type ColumnType = {
  __typename?: "AssetPair";
  id: string;
  currentPrice: any;
  stakedAmount?: any;
  sentiment?: "long" | "short";
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

const StakeSubRow = ({
  row,
  type = "make",
}: {
  row: Row<ColumnType>;
  type?: "edit" | "make";
}) => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakePosition, setStakePosition] = useState<"long" | "short">("long");
  return (
    <Flex
      css={{
        flex: 1,
        boxShadow: "inset 0px 0px 0px 1px $colors$extraMuted",
        background: "$background",
      }}
    >
      <Flex
        css={{
          p: "0px $5",
          borderRight: "1px solid $colors$extraMuted",
          alignItems: "center",
        }}
      >
        <Text css={{ color: "$muted", fontSize: "$xl", mr: "$2" }}>Stake</Text>
        <Input
          size="lg"
          type="number"
          placeholder="100"
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
      <Box css={{ p: "$5" }}>
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
          borderRight: "1px solid $colors$extraMuted",
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
      {type === "edit" ? (
        <>
          <Button
            ghost
            variant="primary"
            css={{
              color: "$red",
              width: "120px",
              marginRight: "1px",
              height: "auto",
              px: "0",
              fontSize: "15px",
              fontWeight: 300,
              textAlign: "center",
              borderRight: '1px solid $extraMuted',
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Close partition
          </Button>
          <Button
            ghost
            variant="primary"
            css={{
              width: "100px",
              marginRight: "1px",
              height: "auto",
              px: "0",
              fontSize: "15px",
              fontWeight: 300,
              textAlign: "center",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Save
          </Button>
        </>
      ) : (
        <Button
          ghost
          variant="primary"
          css={{
            width: "140px",
            marginRight: "1px",
            height: "auto",
            px: "0",
            fontSize: "18px",
            fontWeight: 300,
            textAlign: "center",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Make stake
        </Button>
      )}
    </Flex>
  );
};

export default StakeSubRow;
