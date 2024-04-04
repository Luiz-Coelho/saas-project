import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email().min(1, "Campo obrigatório"),
  name: z.string().min(1, "Campo obrigatório"),
  address: z.string().min(1, "Campo obrigatório"),
  category: z.string().min(1, "Campo obrigatório"),
  route: z.string(),
  // i need to create a status, all customer will be created as active? or i will give the option to create as inactive?
});

type FormFields = z.infer<typeof formSchema>;

export default function NewCustomer() {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      category: "",
      route: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 max-w-prose mx-auto"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormDescription>
                É necessário fornecer o email para integrar com outras
                funcionalidades
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormDescription>
                Insira o nome da empresa ou da pessoa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Insira o endereço de onde será realizada a coleta
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Finalidade(s)</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Esse campo pode ter mais de um valor
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="route"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rota(s)</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Esse campo pode ficar vazio, não é necessário preencher no
                momento do cadastro
              </FormDescription>
            </FormItem>
          )}
        />
        <Button variant={"secondary"} type="reset">
          Limpar
        </Button>
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Carregando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
