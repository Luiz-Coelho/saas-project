import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TextInput from "../../../../components/TextInput";
import DropdownInput from "../../../../components/DropdownInput";

import { CreateCustomer } from "@/types/Customer";
import { fetchMountCustomerData } from "@/services/mountCustomerService";
import { createCustomer } from "@/services/customerService";
import SelectInput from "@/components/SelectInput";
import { useToast } from "@/components/ui/use-toast";

export type FormFields = CreateCustomer;

const defaultValues: CreateCustomer = {
  email: "",
  name: "",
  address: "",
  category: [""],
  track: [],
  status: "inativo",
};

export default function NewCustomer() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories", "tracks", "statuses"],
    queryFn: fetchMountCustomerData,
  });

  const form = useForm<FormFields>({
    resolver: zodResolver(CreateCustomer),
    defaultValues: defaultValues,
  });

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      form.formState.isSubmitSuccessful && form.reset();
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        description: "Novo cliente cadastrado com sucesso!",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateCustomer> = (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  const categories = data?.categories || [];

  const tracks = data?.tracks || [];

  const statuses = data?.statuses || [];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-y-6 gap-x-10 max-w-screen-xl mx-auto"
      >
        <TextInput
          control={form.control}
          name="email"
          label="Email"
          description={
            "É necessário fornecer o email para integrar com outras funcionalidades do sistema"
          }
        />
        <TextInput
          control={form.control}
          name="name"
          label="Nome"
          description={"Insira o endereço de onde será realizada a coleta"}
        />
        <TextInput
          control={form.control}
          name="address"
          label="Endereço"
          description={"Insira o nome da empresa ou da pessoa"}
        />
        <DropdownInput
          control={form.control}
          name="track"
          label="Rota"
          data={tracks}
          description="Esse campo pode ficar vazio e ter múltiplos valores"
        />
        <DropdownInput
          control={form.control}
          name="category"
          label="Finalidade"
          data={categories}
          description="Esse campo pode ter múltiplos valores"
        />
        <SelectInput
          control={form.control}
          name="status"
          label="Status"
          data={statuses}
          keyField="_id"
          valueField="_id"
          nameField="name"
        />
        <div className="col-span-3 flex gap-6">
          <Button
            variant={"secondary"}
            type="reset"
            className="self-center w-full"
            onClick={() => {
              form.reset();
            }}
          >
            Limpar
          </Button>
          <Button type="submit" className="self-center w-full">
            {form.formState.isSubmitting ? "Carregando..." : "Enviar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
