import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { categories, status, tracks } from "@/data";
import TextInput from "../../../../../components/TextFormInput";
import DropdownInput from "../../../../../components/DropdownFormInput";

const formSchema = z.object({
  email: z.string().email().min(1, "Campo obrigatório"),
  name: z.string().min(1, "Campo obrigatório"),
  address: z.string().min(1, "Campo obrigatório"),
  category: z.array(z.string()).min(1, "Campo obrigatório"),
  track: z.array(z.string()).optional(),
  status: z.string(),
});

type FormFields = z.infer<typeof formSchema>;

const defaultValues = {
  email: "",
  name: "",
  address: "",
  category: [],
  track: [],
  status: "inactive",
};

export default function NewCustomer() {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

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
        <DropdownInput
          control={form.control}
          name="status"
          label="Status"
          data={status}
        />
        <div className="col-span-3 flex gap-6">
          <Button
            variant={"secondary"}
            type="reset"
            className="self-center w-full"
            onClick={() => {
              form.reset(defaultValues);
            }}
          >
            Limpar
          </Button>
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            className="self-center w-full"
          >
            {form.formState.isSubmitting ? "Carregando..." : "Enviar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
