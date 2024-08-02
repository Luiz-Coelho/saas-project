import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TextInput from "../../../../components/TextInput";
import DropdownInput from "../../../../components/DropdownInput";

import { status } from "@/data";
import { Customer } from "@/typing/Customer";
import { fetchMountCustomerData } from "@/services/mountCustomerService";
import { getCustomerById, updateCustomer } from "@/services/customerService";
import SelectInput from "@/components/SelectInput";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export type FormFields = Customer;

const defaultValues: Customer = {
  _id: "",
  email: "",
  name: "",
  address: "",
  category: [],
  track: [],
  status: "inactive",
};

export default function UpdateCustomer() {
  const { customerId } = useParams() as { customerId: string };
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories", "tracks"],
    queryFn: fetchMountCustomerData,
  });

  const form = useForm<FormFields>({
    resolver: zodResolver(Customer),
    defaultValues: defaultValues,
  });

  const {
    data: customerData,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer,
    error: customerError,
  } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomerById(customerId),
  });

  useEffect(() => {
    form.reset(customerData);
  }, [customerData]);

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const onSubmit: SubmitHandler<Customer> = (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  if (isLoading || isLoadingCustomer) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;
  if (isErrorCustomer) return <div>Error: {customerError.message}</div>;

  const categories = data?.categories || [];

  const tracks = data?.tracks || [];

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
          data={status}
          keyField="_id"
          valueField="value"
          nameField="name"
        />
        <div className="col-span-3 flex gap-6">
          <Button
            variant={"secondary"}
            type="reset"
            className="self-center w-full"
            onClick={() => {
              form.reset(customerData);
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
