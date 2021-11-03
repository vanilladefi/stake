# Here's some sample data for table

```js
const data = [
  {
    firstName: "fan",
    lastName: "destruction",
    age: 25,
    visits: 82,
    progress: 32,
    status: "single",
  },
  {
    firstName: "assistance",
    lastName: "notebook",
    age: 28,
    visits: 59,
    progress: 38,
    status: "single",
  },
  {
    firstName: "literature",
    lastName: "category",
    age: 3,
    visits: 93,
    progress: 53,
    status: "relationship",
  },
  {
    firstName: "singer",
    lastName: "trees",
    age: 15,
    visits: 53,
    progress: 86,
    status: "single",
  },
  {
    firstName: "stomach",
    lastName: "icicle",
    age: 27,
    visits: 24,
    progress: 82,
    status: "single",
  },
  {
    firstName: "organization",
    lastName: "customer",
    age: 5,
    visits: 71,
    progress: 93,
    status: "relationship",
  },
  {
    firstName: "operation",
    lastName: "process",
    age: 17,
    visits: 66,
    progress: 81,
    status: "relationship",
  },
  {
    firstName: "ghost",
    lastName: "authority",
    age: 6,
    visits: 66,
    progress: 17,
    status: "relationship",
  },
  {
    firstName: "affair",
    lastName: "loaf",
    age: 9,
    visits: 57,
    progress: 87,
    status: "relationship",
  },
  {
    firstName: "vest",
    lastName: "point",
    age: 26,
    visits: 17,
    progress: 68,
    status: "relationship",
  },
  {
    firstName: "aspect",
    lastName: "wax",
    age: 0,
    visits: 14,
    progress: 34,
    status: "complicated",
  },
  {
    firstName: "match",
    lastName: "whip",
    age: 1,
    visits: 94,
    progress: 98,
    status: "single",
  },
  {
    firstName: "ray",
    lastName: "oil",
    age: 11,
    visits: 49,
    progress: 58,
    status: "complicated",
  },
  {
    firstName: "mask",
    lastName: "insurance",
    age: 22,
    visits: 33,
    progress: 16,
    status: "relationship",
  },
  {
    firstName: "run",
    lastName: "secretary",
    age: 29,
    visits: 95,
    progress: 65,
    status: "single",
  },
  {
    firstName: "wedding",
    lastName: "net",
    age: 11,
    visits: 69,
    progress: 69,
    status: "complicated",
  },
  {
    firstName: "scarecrow",
    lastName: "variety",
    age: 11,
    visits: 40,
    progress: 90,
    status: "relationship",
  },
  {
    firstName: "sand",
    lastName: "mode",
    age: 15,
    visits: 90,
    progress: 68,
    status: "relationship",
  },
  {
    firstName: "university",
    lastName: "hair",
    age: 13,
    visits: 95,
    progress: 72,
    status: "single",
  },
  {
    firstName: "boot",
    lastName: "chocolate",
    age: 16,
    visits: 67,
    progress: 45,
    status: "complicated",
  },
];
```

Here's sample columns:

```js
const columns: Column<(typeof data)[0]>[] = useMemo(
  () => [
    {
      // Make an expander cell
      Header: () => null, // No header
      id: "expander", // It needs an ID
      Cell: ({ row }: { row: Row }) => (
        // Use Cell to render an expander for each row.
        // We can use the getToggleRowExpandedProps prop-getter
        // to build the expander.
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? <X /> : <DotsThreeVertical />}
        </span>
      ),
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Visits",
      accessor: "visits",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Profile Progress",
      accessor: "progress",
    },
  ],
  []
);
```

Here sample <Table /> component with subrow:

```jsx
<Table
  columns={columns}
  data={data}
  renderRowSubComponent={({ row }) => <p>JSON.stringify(row.values)</p>}
/>
```
