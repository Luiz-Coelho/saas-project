import { Table } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";

type SelectHeaderProps<T> = {
  table: Table<T>;
};

export default function SelectHeader<T>({ table }: SelectHeaderProps<T>) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
}
