import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { createCategory } from "@/services/categoriesService";
import { CreateCategory } from "@/typing/Category";
import TextInput from "@/components/TextInput";

export type FormFields = CreateCategory;

export default function NewCategory() {
  const queryClient = useQueryClient();

  const form = useForm<FormFields>({
    resolver: zodResolver(CreateCategory),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      form.formState.isSubmitSuccessful && form.reset();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <TextInput
            control={form.control}
            name="name"
            label="Nome"
            className="col-span-3"
          />
          <TextInput
            control={form.control}
            name="description"
            label="Descrição"
            className="col-span-3"
          />
          <div className="col-span-3 flex gap-6 py-4">
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
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className="self-center w-full"
            >
              {form.formState.isSubmitting ? "Carregando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
