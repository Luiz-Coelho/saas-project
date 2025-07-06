import { ColumnDef } from "@tanstack/react-table";

import SortingHeader from "@/components/SortingHeader";
import SelectHeader from "@/components/SelectHeader";
import SelectRow from "@/components/SelectRow";
import ActionsDiv from "@/components/ActionsDiv";
import UpdateCategory from "../UpdateCategory";
import { CategoryPopulated } from "@/types/Category";

type Data = CategoryPopulated;

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
    accessorFn: (row) => row.track.map((t) => t.name).join(", "),
    id: "tracks",
    header: ({ column }) => <SortingHeader column={column} name="Clientes" />,
  },
  {
    accessorFn: (row) => row.customer.map((c) => c.name).join(", "),
    id: "customers",
    header: ({ column }) => <SortingHeader column={column} name="Rotas" />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsDiv
        id={row.original._id}
        title="Editar Finalidade"
        children={
          <UpdateCategory id={row.original._id} closeDialog={() => {}} />
        }
      />
    ),
  },
];
