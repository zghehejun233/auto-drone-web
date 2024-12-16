"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  compareItems,
  RankingInfo,
  rankItem,
} from "@tanstack/match-sorter-utils";
import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingFn,
  sortingFns,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Delete,
  Edit,
  RefreshCw,
  View,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

type Task = {
  id: string;
  name: string;
  owner: string;
  status: string;
  created_at: string;
  last_run_at: string;
  actions?: {
    title: string;
    edit: string;
    view: string;
  };
};

export default function InspectionPage() {
  const router = useRouter();

  const columnHelper = createColumnHelper<Task>();
  const columns = [
    columnHelper.accessor("id", {
      header: () => "ID",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("name", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="ml-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {"任务名称"},
            {column.getIsSorted() === "asc" ? (
              <ArrowUpDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="rotate-180 h-4 w-4" />
            )}
          </Button>
        );
      },
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("owner", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="ml-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {"所有者"},
            {column.getIsSorted() === "asc" ? (
              <ArrowUpDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="rotate-180 h-4 w-4" />
            )}
          </Button>
        );
      },
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("status", {
      header: () => "状态",
      cell: ({ row }) => {
        const color = `
          ${
            row.getValue("status") === "Running"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`;
        return (
          <div className={`${color} px-2 py-1 rounded-lg`}>
            {row.getValue("status")}
          </div>
        );
      },
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("created_at", {
      header: () => "创建时间",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("last_run_at", {
      header: () => "最后运行时间",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("actions", {
      header: () => {
        return <span>操作</span>;
      },
      cell: () => (
        <div className="flex gap-2 justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              router.replace(`/applications/inspection/11`);
            }}
          >
            <View />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
          <Button variant="ghost" size="icon">
            <Delete />
          </Button>
        </div>
      ),
      footer: (props) => props.column.id,
    }),
  ];

  const rdata: Task[] = Array.from({ length: 100 }).map((_, index) => ({
    id: index.toString(),
    name: "Inspection " + (index + 1),
    owner: "John Doe",
    status: "Running",
    created_at: "2021-01-01",
    last_run_at: "2021-01-01",
  }));

  const [data] = React.useState(() => [...rdata]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = React.useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: {
      pagination,
      globalFilter,
      sorting,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    sortingFns: {
      fuzzy: fuzzySort,
    },
  });

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <RefreshCw />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>刷新</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          className="focus-visible:ring-0 w-72"
          placeholder="搜索"
          value={table.getState().globalFilter}
          onChange={(e) => {
            table.setGlobalFilter(e.target.value || undefined);
          }}
        />
        <div className="flex-grow" />
        <Button className="rounded-lg">创建</Button>
      </div>
      <div className="my-4">
        <Table>
          <TableHeader>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  // 居中
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-2 bg-red">
        <div className="flex gap-2">
          <span>{table.getPageCount()}页</span>
          <span>{table.getRowCount()}条</span>
        </div>
        <div className="flex-grow" />

        <Select
          onValueChange={(e) => {
            console.log(e);
            table.setPageSize(Number(e.valueOf()));
          }}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger className="w-[72px]">
            <SelectValue placeholder="page size" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="mx-2">
          第{table.getState().pagination.pageIndex + 1}页
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronFirst />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronLast />
        </Button>
      </div>
    </div>
  );
}
