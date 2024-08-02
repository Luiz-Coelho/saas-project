import { ColumnDef } from "@tanstack/react-table";

import { Customer } from "@/typing/Customer";

import SortingHeader from "@/components/SortingHeader";
import SelectHeader from "@/components/SelectHeader";
import SelectRow from "@/components/SelectRow";
import ActionsDiv from "@/components/ActionsDiv";

type Data = Omit<Customer, "category" | "track"> & {
  category: {
    _id: string;
    name: string;
  }[];
  track: {
    _id: string;
    name: string;
  }[];
};

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
    accessorKey: "email",
    header: ({ column }) => <SortingHeader column={column} name="E-mail" />,
  },
  {
    accessorKey: "address",
    header: ({ column }) => <SortingHeader column={column} name="Endereço" />,
  },
  {
    accessorFn: (row) => row.category.map((c) => c.name).join(", "),
    id: "categories",
    header: ({ column }) => <SortingHeader column={column} name="Finalidade" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortingHeader column={column} name="Status" />,
  },
  {
    accessorFn: (row) => row.track?.map((t) => t.name).join(", "),
    id: "tracks",
    header: ({ column }) => <SortingHeader column={column} name="Rotas" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsDiv id={row.original._id} />,
  },
];
