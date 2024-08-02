import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Table } from "@tanstack/react-table";

type TableFooterProps<T> = {
  table: Table<T>;
};

export default function TableFooter<T>({ table }: TableFooterProps<T>) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground px-4">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} linhas selecionada(s).
      </div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
