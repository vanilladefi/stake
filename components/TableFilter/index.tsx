import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import Container from "../Container";
import Flex from "../Flex";
import Input from "../Input";

const TableFilter: React.FC<{ onChange?: (value: string) => any }> = ({
  onChange,
}) => {
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    if (onChange) {
      onChange(filterValue);
    }
  }, [filterValue, onChange]);
  return (
    <Flex
      css={{
        borderTop: "1px solid rgba(255,255,255,0.3)",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
      }}
    >
      <Container
        css={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          py: "$2",
        }}
      >
        <MagnifyingGlass size="24px" />{" "}
        <Input
          placeholder="Filter tokens by name or ticker"
          variant="ghost"
          size="lg"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          css={{
            ml: "$3",
          }}
        />
      </Container>
    </Flex>
  );
};

export default TableFilter;
