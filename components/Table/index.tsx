/* eslint-disable react/jsx-key */
import React, { useCallback, useEffect } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useExpanded,
  Column,
  Row,
  IdType,
} from "react-table";
import { matchSorter } from "match-sorter";
import { ArrowDown, ArrowUp } from "phosphor-react";

import Box from "../Box";
import { styled } from "../../stitches.config";

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
          backgroundColor: "rgba(255, 199, 148, 0.07)",
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
      py: "$5",
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
}: TableProps<T>): React.ReactElement {
  /**
   * Custom Filter Function ----
   * Only filter by: code * name
   */
  const ourGlobalFilterFunction = useCallback(
    (rows: Row<T>[], ids: IdType<T>[], query: string) => {
      console.log("rows", rows);
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
    state: { expanded },
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
    },
    useGlobalFilter,
    useSortBy,
    useExpanded
  );

  useEffect(() => {
    setGlobalFilter(filter); // Set the Global Filter to the filter prop.
  }, [filter, setGlobalFilter]);

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
                    },
                  })}
                >
                  {/* Render the columns filter UI */}
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <ArrowDown style={{ top: 20 }} />
                    ) : (
                      <ArrowUp />
                    )
                  ) : (
                    ""
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const { key, ...rowProps } = row.getRowProps();
            return (
              // Use a React.Fragment here so the table markup is still valid
              <React.Fragment key={key}>
                <tr {...rowProps}>
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
                </tr>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {row.isExpanded && renderRowSubComponent ? (
                  <tr {...rowProps}>
                    <td colSpan={visibleColumns.length} style={{ padding: 0 }}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </Box>
    </TableContainer>
  );
}

export default Table;
