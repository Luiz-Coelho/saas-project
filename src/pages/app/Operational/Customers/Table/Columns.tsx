import { ColumnDef } from "@tanstack/react-table";

import { CustomerPopulated } from "@/types/Customer";

import SortingHeader from "@/components/SortingHeader";
import SelectHeader from "@/components/SelectHeader";
import SelectRow from "@/components/SelectRow";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

type Data = CustomerPopulated;

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
    accessorKey: "status.name",
    header: ({ column }) => <SortingHeader column={column} name="Status" />,
  },
  {
    accessorFn: (row) => row.track.map((t) => t.name).join(", "),
    id: "tracks",
    header: ({ column }) => <SortingHeader column={column} name="Rotas" />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button variant={"ghost"} asChild>
        <Link to={row.original._id}>
          <Pencil size={18} />
        </Link>
      </Button>
    ),
  },
];
