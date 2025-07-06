import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import { createTrack } from "@/services/trackService";
import { CreateTrack } from "@/types/Track";
import { getCategories } from "@/services/categoriesService";
import { useToast } from "@/components/ui/use-toast";

export type FormFields = CreateTrack;

type NewTrackProps = {
  closeDialog: () => void;
};

export default function NewTrack({ closeDialog }: NewTrackProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const form = useForm<FormFields>({
    resolver: zodResolver(CreateTrack),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createTrack,
    onSuccess: () => {
      form.formState.isSubmitSuccessful && form.reset();
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      closeDialog();
      toast({
        description: "Nova Rota criada com sucesso!",
      });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  if (data) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-3 items-center gap-4">
            <TextInput
              control={form.control}
              name="name"
              label="Nome"
              description="Insira o nome da nova rota de coleta"
              className="col-span-3"
            />
            <SelectInput
              control={form.control}
              name="category"
              label="Categoria"
              description="Insira a categoria que a rota fará parte"
              data={data}
              keyField="_id"
              valueField="_id"
              nameField="name"
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
              <Button type="submit" className="self-center w-full">
                {form.formState.isSubmitting ? "Carregando..." : "Enviar"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    );
  }
}
