import { FC, useState } from "react";
import Box from "../Box";
import Button from "../Button";
import Flex from "../Flex";

type Option = {
  label: string;
  key: string;
};

export interface ISegmentControl {
  data: Option[];
  onChanged?: (option: Option) => any;
  isDisabled?: boolean;
}

const SegmentControl: FC<ISegmentControl> = ({
  data,
  onChanged,
  isDisabled,
}) => {
  const [active, setActive] = useState(0);
  return (
    <Box
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "280px",
      }}
    >
      {data.map((itm, idx) => {
        return (
          <Flex
            key={itm.key}
            css={{
              padding: "$1 $2",
              whiteSpace: "nowrap",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: idx === active ? "$text" : "$tableZebra",
            }}
          >
            <Button
              onClick={() => {
                setActive(idx);
                onChanged?.(itm);
              }}
              outline
              disabled={isDisabled}
              uppercase
              size="sm"
              active={idx === active}
              css={{
                color: idx === active ? "$background" : "$muted",
                boxShadow: "none",
                border: 0,
                width: "50%",
              }}
            >
              {itm.label}
            </Button>
          </Flex>
        );
      })}
    </Box>
  );
};

export default SegmentControl;
