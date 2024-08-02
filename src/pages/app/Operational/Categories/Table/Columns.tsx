import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/typing/Category";

import SortingHeader from "@/components/SortingHeader";
import SelectHeader from "@/components/SelectHeader";
import SelectRow from "@/components/SelectRow";
import ActionsDiv from "@/components/ActionsDiv";

type Data = Category;

export const columns: ColumnDef<Data>[] = [
  {
    id: "select",
    header: ({ table }) => <SelectHeader table={table} />,
    cell: ({ row }) => <SelectRow row={row} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortingHeader column={column} name="Nome" />,
  },
  {
    accessorKey: "customers.name",
    header: ({ column }) => <SortingHeader column={column} name="Clientes" />,
  },
  {
    accessorKey: "track.name",
    header: ({ column }) => <SortingHeader column={column} name="Rotas" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsDiv id={row.original._id} />,
  },
];
