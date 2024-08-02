import { ColumnDef } from "@tanstack/react-table";
import { Track } from "@/typing/Track";

import SortingHeader from "@/components/SortingHeader";
import SelectHeader from "@/components/SelectHeader";
import SelectRow from "@/components/SelectRow";

import ActionsDiv from "@/components/ActionsDiv";
type Data = Track;

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
    accessorKey: "category.name",
    header: ({ column }) => <SortingHeader column={column} name="Finalidade" />,
  },
  {
    accessorKey: "customers.name",
    header: ({ column }) => <SortingHeader column={column} name="Clientes" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsDiv id={row.original._id} />,
  },
];
