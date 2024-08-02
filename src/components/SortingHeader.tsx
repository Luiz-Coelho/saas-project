import { ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Column } from "@tanstack/react-table";

type SortingHeaderProps<T> = {
  column: Column<T>;
  name: string;
};

export default function SortingHeader<T>({
  column,
  name,
}: SortingHeaderProps<T>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
