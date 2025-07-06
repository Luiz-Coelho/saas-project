import { useQuery } from "@tanstack/react-query";

import { columns } from "./Table/Columns";
import { DataTable } from "@/components/DataTable";

import { getTracks } from "@/services/trackService";
import NewTrack from "./NewTrack";
import { MyDialog } from "@/components/MyDialog";
import { useState } from "react";

export default function Customers() {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-flow-col py-4 ">
          <h2 className="self-center">Buscar Rota(s)</h2>
          <MyDialog
            open={open}
            onOpenChange={setOpen}
            label="Criar Rota"
            children={<NewTrack closeDialog={() => setOpen(false)} />}
          />
        </div>
        <DataTable
          columns={columns}
          data={data}
          meta={{ open, onOpenChange: setOpen }}
        />
      </div>
    );
  }
}
