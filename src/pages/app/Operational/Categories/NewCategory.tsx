import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { createCategory } from "@/services/categoriesService";
import { CreateCategory } from "@/types/Category";
import TextInput from "@/components/TextInput";
import { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

export type FormFields = CreateCategory;

type NewCategoryProps = {
  closeDialog: () => void;
};

export default function NewCategory({ closeDialog }: NewCategoryProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      closeDialog();
      toast({
        description: "Nova Finalidade criada com sucesso!",
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        form.setError("name", error.response?.data, {
          shouldFocus: true,
        });
      }
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
