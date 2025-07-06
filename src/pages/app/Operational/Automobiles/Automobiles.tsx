import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/DataTable";

import { MyDialog } from "@/components/MyDialog";
import { columns } from "./Table/Columns";
import NewAutomobile from "./NewAutomobile";
import { getAutomobiles } from "@/services/automobilesService";
import { useState } from "react";

export default function Automobiles() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["automobiles"],
    queryFn: getAutomobiles,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-flow-col py-4">
          <h2 className="self-center">Buscar Carro(s)</h2>
          <MyDialog
            open={open}
            onOpenChange={setOpen}
            label="Criar Carro"
            children={<NewAutomobile closeDialog={() => setOpen(false)} />}
          />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
}
