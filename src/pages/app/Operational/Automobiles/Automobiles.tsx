import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/DataTable";

import { MyDialog } from "@/components/MyDialog";
import { columns } from "./Table/Columns";
import NewAutomobile from "./NewAutomobile";
import { getAutomobiles } from "@/services/automobilesService";

export default function Automobiles() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["automobiles"],
    queryFn: getAutomobiles,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-flow-col">
          <h2 className="self-center">Buscar Carro(s)</h2>
          <MyDialog
            label="Criar Carro"
            description="Crie uma novo carro aqui. Clique em criar quando estiver pronto."
            children={<NewAutomobile />}
          />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
}
