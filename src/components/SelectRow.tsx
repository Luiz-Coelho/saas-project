import { Row } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";

type SelectRowProps<T> = {
  row: Row<T>;
};

export default function SelectRow<T>({ row }: SelectRowProps<T>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
}
