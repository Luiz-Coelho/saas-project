import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import StatusSelect from "@/components/StatusSelect";
import { categories } from "@/data";

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  category: z.string(),
  route: z.string(),
  status: z.enum(["active", "inactive", "all"]),
  // i need to create a status, all customer will be created as active? or i will give the option to create as inactive?
});

type FormFields = z.infer<typeof formSchema>;

export default function SearchForm() {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      category: "",
      route: "",
      status: "all",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-6 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
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
                {/* Make it as a dropdown */}
                <Input {...field} type="text" />
              </FormControl>
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
                {/* Make it as a dropdown */}
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
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
                {/* Make it as a dropdown */}
                <StatusSelect {...field} categories={categories} />
              </FormControl>
              <FormMessage />
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
