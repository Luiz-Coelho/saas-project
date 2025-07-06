import { ColumnDef } from "@tanstack/react-table";

import SortingHeader from "@/components/SortingHeader";
import SelectHeader from "@/components/SelectHeader";
import SelectRow from "@/components/SelectRow";
import ActionsDiv from "@/components/ActionsDiv";
import UpdateAutomobile from "../UpdateAutomobile";
import { Category } from "@/types/Category";

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
    accessorKey: "licensePlate",
    header: ({ column }) => <SortingHeader column={column} name="Placa" />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsDiv
        id={row.original._id}
        title="Editar Automóvel"
        children={
          <UpdateAutomobile id={row.original._id} closeDialog={() => {}} />
        }
      />
    ),
  },
];
