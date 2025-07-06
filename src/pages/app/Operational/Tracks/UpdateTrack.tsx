import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import TextInput from "@/components/TextInput";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Track } from "@/types/Track";
import { getTrackById, updateTrack } from "@/services/trackService";
import SelectInput from "@/components/SelectInput";
import { getCategories } from "@/services/categoriesService";

export type FormFields = Track;

type UpdateTrackProps = {
  id: string;
  closeDialog: () => void;
};

export default function UpdateTrack({ id, closeDialog }: UpdateTrackProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<FormFields>({
    resolver: zodResolver(Track),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const {
    data: mountData,
    isLoading: isLoadingMount,
    isError: isMountError,
    error: mountError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["track", id],
    queryFn: () => getTrackById(id),
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      closeDialog();
      toast({
        description: "Rota atualizada com sucesso!",
      });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutation.mutate(data);
  };

  if (isLoading || isLoadingMount) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;
  if (isMountError) return <div>Error: {mountError.message}</div>;

  const categories = mountData || [];

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
          <SelectInput
            control={form.control}
            name="category"
            label="Categoria"
            description="Insira a categoria que a rota fará parte"
            data={categories}
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
