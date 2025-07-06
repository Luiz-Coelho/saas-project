import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { getCategoryById, updateCategory } from "@/services/categoriesService";
import { Category } from "@/types/Category";
import TextInput from "@/components/TextInput";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export type FormFields = Category;

type UpdateCategoryProps = {
  id: string;
  closeDialog: () => void;
};

export default function UpdateCategory({
  id,
  closeDialog,
}: UpdateCategoryProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<FormFields>({
    resolver: zodResolver(Category),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      closeDialog();
      toast({
        description: "Finalidade atualizada com sucesso!",
      });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

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
