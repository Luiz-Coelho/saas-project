import { ColumnDef } from "@tanstack/react-table";
import { TrackPopulated } from "@/types/Track";

import SortingHeader from "@/components/SortingHeader";
import SelectHeader from "@/components/SelectHeader";
import SelectRow from "@/components/SelectRow";

import ActionsDiv from "@/components/ActionsDiv";
import UpdateTrack from "../UpdateTrack";
type Data = TrackPopulated;

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
    accessorFn: (row) => row.customer.map((c) => c.name).join(", "),
    id: "customers",
    header: ({ column }) => <SortingHeader column={column} name="Clientes" />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsDiv
        id={row.original._id}
        title="Editar Rota"
        children={<UpdateTrack id={row.original._id} closeDialog={() => {}} />}
      />
    ),
  },
];
