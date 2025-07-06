import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/DataTable";
import { columns } from "./Table/Columns";

import { getCategories } from "@/services/categoriesService";
import { MyDialog } from "@/components/MyDialog";
import NewCategory from "./NewCategory";
import { useState } from "react";

export default function Categories() {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-flow-col py-4">
          <h2 className="self-center">Buscar Finalidade(s)</h2>
          <MyDialog
            open={open}
            onOpenChange={setOpen}
            label="Criar Finalidade"
            children={<NewCategory closeDialog={() => setOpen(false)} />}
          />
        </div>
        <DataTable
          columns={columns}
          data={data}
          meta={{ open: open, onOpenChange: setOpen }}
        />
      </div>
    );
  }
}
