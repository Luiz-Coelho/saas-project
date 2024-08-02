import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/DataTable";
import { columns } from "./Table/Columns";

import { getCategories } from "@/services/categoriesService";
import { MyDialog } from "@/components/MyDialog";
import NewCategory from "./NewCategory";

export default function Categories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-flow-col">
          <h2 className="self-center">Buscar Finalidade(s)</h2>
          <MyDialog
            label="Criar Finalidade"
            description="Crie uma nova finalidade aqui. Clique em criar quando estiver pronto."
            children={<NewCategory />}
          />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
}
