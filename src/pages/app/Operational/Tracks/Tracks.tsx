import { useQuery } from "@tanstack/react-query";

import { columns } from "./Table/Columns";
import { DataTable } from "@/components/DataTable";

import { getTracks } from "@/services/trackService";
import NewTrack from "./NewTrack";
import { MyDialog } from "@/components/MyDialog";

export default function Customers() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-flow-col">
          <h2 className="self-center">Buscar Rota(s)</h2>
          <MyDialog
            label="Criar Rota"
            description="Crie uma nova rota aqui. Clique em criar quando estiver pronto."
            children={<NewTrack />}
          />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
}
