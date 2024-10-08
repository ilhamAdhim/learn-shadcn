import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  CircleDollarSign,
  MoreHorizontal,
  PlusCircle,
  Settings2Icon,
  TagsIcon,
} from "lucide-react";
import { useState } from "react";
import { DataTableDemo } from "@/components/composites/DataTable";
import { Input } from "@/components/ui/input";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ICategory } from "@/types/category";
import { Badge, Box } from "@radix-ui/themes";
import { UseDisclosureType } from "@/types/common";
import { ITransaction } from "@/types/transaction";
import { format } from "date-fns";

export const columns: ColumnDef<ITransaction>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "transaction_type",
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Box className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </Box>
    ),
    cell: ({ row }) => (
      <div className="capitalize text-center">
        {row.getValue("date") ? format(row.getValue("date"), "dd MMM yyyy") : "-"}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: () => <div className="text-center">Transaction Title</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "category_title",
    header: () => <div className="text-center"> Category </div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-center">
          <Badge className="p-1" key={row.id} color={row.original.color_badge}>
            {/* {row.original.category_title} */}
            {row.getValue("category_title")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Box className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </Box>
    ),
    cell: ({ row, column }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("ID-id", {
        style: "currency",
        currency: "IDR",
      }).format(amount);

      return (
        <div
          className={`text-center font-medium ${
            row.original.transaction_type === "expenses" ? "text-red-500" : "text-green-500"
          }`}
        >
          {row.original.transaction_type === "expenses" ? "-" : "+"}
          {formatted}
        </div>
      );
    },
  },
];

interface ITableTransactionView {
  dataTransaction: ITransaction[];
  categoryList?: ICategory[];
  modalManageCategory?: UseDisclosureType;
  handleOpenModalEdit: (item: ITransaction) => void;
  handleOpenModalDelete: (item: ITransaction) => void;
  withFilters?: boolean;
  tableCaption?: string;
}

function TableTransactionView({
  dataTransaction,
  categoryList,
  modalManageCategory,
  handleOpenModalEdit,
  handleOpenModalDelete,
  withFilters = false,
  tableCaption,
}: ITableTransactionView) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: dataTransaction,
    columns: [
      ...columns,
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => handleOpenModalEdit(row.original)}
                >
                  Edit Transaction
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => handleOpenModalDelete(row.original)}
                >
                  Delete Transaction
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        transaction_type: false,
        ...columnVisibility,
      },
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <>
      <DataTableDemo
        tableCaption={tableCaption}
        tableInstance={table}
        headers={
          <div className="flex space-between py-4">
            {withFilters && (
              <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
                <Input
                  placeholder="Filter Transaction titles..."
                  value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                  onChange={event => table.getColumn("title")?.setFilterValue(event.target.value)}
                  className="w-full"
                />

                <div className="flex gap-2 flex-wrap lg:flex-nowrap w-full justify-between">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full lg:w-fit">
                        <CircleDollarSign className="h-4 w-4 mr-2" /> Expense Type
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup
                        value={
                          (table.getColumn("transaction_type")?.getFilterValue() as string) ?? ""
                        }
                        onValueChange={value =>
                          value === "all"
                            ? table.getColumn("transaction_type")?.setFilterValue("")
                            : table.getColumn("transaction_type")?.setFilterValue(value)
                        }
                      >
                        <DropdownMenuRadioItem value="all">All Category</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="expenses">Expenses</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="income">Income</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full lg:w-fit">
                        <TagsIcon className="h-4 w-4 mr-2" /> Categories
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-h-[250px] overflow-auto">
                      <DropdownMenuRadioGroup
                        value={
                          (table.getColumn("category_title")?.getFilterValue() as string) ?? ""
                        }
                        onValueChange={value =>
                          value === "all"
                            ? table.getColumn("category_title")?.setFilterValue("")
                            : table.getColumn("category_title")?.setFilterValue(value)
                        }
                      >
                        <DropdownMenuRadioItem value="all">All Transaction</DropdownMenuRadioItem>

                        {categoryList?.map(item => (
                          <DropdownMenuRadioItem value={item.category_title} key={item.id}>
                            <Badge className="w-full p-1 rounded-lg" color={item.colorBadge as any}>
                              {item.category_title}
                            </Badge>
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                      <DropdownMenuSeparator />
                      {modalManageCategory && (
                        <div onClick={modalManageCategory.open}>
                          <DropdownMenuItem>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span className="pr-2"> Create New... </span>
                          </DropdownMenuItem>
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full lg:w-fit">
                        <Settings2Icon className="mr-2 h-4 w-4" /> Columns
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {table
                        .getAllColumns()
                        .filter(column => column.getCanHide())
                        ?.map(column => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={value => column.toggleVisibility(!!value)}
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            )}
          </div>
        }
      />
    </>
  );
}

export default TableTransactionView;
