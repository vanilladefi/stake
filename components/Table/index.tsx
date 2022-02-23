/* eslint-disable react/jsx-key */
import { matchSorter } from "match-sorter";
import { ArrowDown, ArrowUp } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Column,
  IdType,
  Row,
  useExpanded,
  useGlobalFilter,
  useSortBy,
  useTable,
} from "react-table";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "../../stitches.config";
import Box from "../Box";
import Flex from "../Flex";
import Loader from "../Loader";

/**
 * There's some boilter plate here
 * Important part is our globalFilter function
 * where we specify which columns to
 * filter
 * */

const TableContainer = styled(Box, {
  py: "$3",
  color: "$muted",
  input: {
    border: "0px",
    padding: "0.4rem",
  },
  table: {
    borderSpacing: 0,
    border: "0px solid black",
    tr: {
      "&:nth-child(odd)": {
        "& td": {
          backgroundColor: "$tableZebra",
        },
      },
      "&:last-child": {
        "& td": {
          borderBottom: "0px",
        },
      },
    },
    "& th": {
      textTransform: "uppercase",
      fontWeight: 200,
      fontSize: "$lg",
      color: "$muted",
    },
    "& th,td": {
      margin: 0,
      padding: "0.5rem",
      borderBottom: "0px solid black",
      borderRight: "0px solid black",
      py: "$3",
      px: "$4",
      "&:last-child": {
        borderRight: 0,
      },
    },
  },
});

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  filters?: string[]; // columns names to filter
  filter?: string; // Filter text
  renderRowSubComponent?: (props: { row: Row<T> }) => any;
  isLoading?: boolean;
  myStakes?: boolean; // For changing animation behaviour
}

/**
 * We have an Input in App.tsx which
 * passes the filter text
 */

function Table<T extends object>({
  columns,
  data,
  filters,
  filter,
  renderRowSubComponent,
  isLoading,
  myStakes,
}: TableProps<T>): React.ReactElement {
  const [isLoaded, setLoaded] = useState(false);

  /**
   * Custom Filter Function ----
   * Only filter by: code * name
   */
  const ourGlobalFilterFunction = useCallback(
    (rows: Row<T>[], ids: IdType<T>[], query: string) => {
      if (!filters || !filters.length || filters.length === 0) {
        return matchSorter(rows, query, {
          keys: Object.keys(rows?.[0].values).map((item) => `values.${item}`),
        });
      }
      return matchSorter(rows, query, {
        keys: filters?.map((columnName) => `values.${columnName}`),
      });
    },
    [filters]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    visibleColumns,
  } = useTable<T>(
    {
      columns,
      data,
      // Use our custom function
      globalFilter: ourGlobalFilterFunction,
      // keep sort state when data updates
      autoResetSortBy: false,
      // keep expanded state when data updates
      autoResetExpanded: false,
      autoResetGlobalFilter: false,
      getRowId: (row, relativeIndex, parent) => {
        const origId = parent
          ? [parent.id, relativeIndex].join(".")
          : relativeIndex;
        
        return (row as any)?.id || origId;
      },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded
  );

  useEffect(() => {
    setGlobalFilter(filter); // Set the Global Filter to the filter prop.
    setLoaded(true); // Fixed Framer Motion animations to run on client side https://github.com/framer/motion/issues/578
  }, [filter, setGlobalFilter]);

  if (!isLoaded) {
    return <></>; // For Framer Motion animations - will be fixed in https://github.com/framer/motion/pull/1452
  }

  return (
    <TableContainer css={{ width: "100%", textAlign: "left" }}>
      <Box
        as="table"
        css={{ width: "100%", textAlign: "left" }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps({
                    ...column.getSortByToggleProps(),
                    style: {
                      minWidth: column.minWidth,
                      width: column.width,
                      textAlign: column.align || "center",
                      justifyContent: column.align || "center",
                      cursor: column.canSort ? "pointer" : "unset",
                      whiteSpace: "nowrap",
                    },
                  })}
                >
                  <Flex
                    css={{
                      alignItems: "center",
                      justifyContent: column.align || "center",
                      color: column.isSorted ? "$text" : "currentColor",
                    }}
                  >
                    {/* Render the columns filter UI */}
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDown style={{ marginTop: "-3px" }} />
                      ) : (
                        <ArrowUp style={{ marginTop: "-3px" }} />
                      )
                    ) : (
                      ""
                    )}
                  </Flex>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {!isLoading ? (
            rows.map((row, i) => {
              prepareRow(row);
              const { key, ...rowProps } = row.getRowProps();
              return (
                // Use a React.Fragment here so the table markup is still valid
                <React.Fragment key={key}>
                  <AnimatePresence initial={false}>
                    <motion.tr
                      {...rowProps}
                      key={key}
                      initial={{ opacity: 0, y: myStakes ? 32 : -32 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: myStakes ? 32 : -32 }}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps({
                              style: {
                                minWidth: cell.column.minWidth,
                                width: cell.column.width,
                                textAlign: cell.column.align || "center",
                              },
                            })}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </motion.tr>
                  </AnimatePresence>
                  {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                  <AnimatePresence>
                    {row.isExpanded && renderRowSubComponent ? (
                      <motion.tr
                        {...rowProps}
                        key={key}
                        transition={{ type: "spring", duration: 0.3 }}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <td
                          colSpan={visibleColumns.length}
                          style={{ padding: 0 }}
                        >
                          {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                          {renderRowSubComponent({ row })}
                        </td>
                      </motion.tr>
                    ) : null}
                  </AnimatePresence>
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              {headerGroups[headerGroups.length - 1].headers.map((_column) => {
                return (
                  <td key={_column.id}>
                    <Loader />
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </Box>
    </TableContainer>
  );
}

export default Table;
