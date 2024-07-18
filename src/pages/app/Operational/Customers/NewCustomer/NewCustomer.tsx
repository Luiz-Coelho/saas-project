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
import { Checkbox } from "@/components/ui/checkbox";

import { categories } from "@/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  email: z.string().email().min(1, "Campo obrigatório"),
  name: z.string().min(1, "Campo obrigatório"),
  address: z.string().min(1, "Campo obrigatório"),
  category: z.array(z.string()).min(1, "Campo obrigatório"),
  route: z.string(),
  status: z.enum(["active", "inactive"]),
});

type FormFields = z.infer<typeof formSchema>;

export default function NewCustomer() {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      category: [],
      route: "",
      status: "inactive",
    },
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
              <FormDescription>
                Esse campo pode ter mais de um valor
              </FormDescription>
              {categories.map((category) => (
                <FormItem
                  key={category.id}
                  className="flex space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value.includes(category.title)}
                      onCheckedChange={(checked) => {
                        checked
                          ? field.onChange([...field.value, category.title])
                          : field.onChange(
                              field.value.filter(
                                (value) => value !== category.title
                              )
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel>{category.title}</FormLabel>
                </FormItem>
              ))}
              <FormMessage />
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Ativo</SelectItem>
                    <SelectItem value="Inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant={"secondary"} type="reset" className="col-start-1">
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
