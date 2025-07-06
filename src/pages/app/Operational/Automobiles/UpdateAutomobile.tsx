import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Automobile } from "@/types/Automobile";
import TextInput from "@/components/TextInput";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  getAutomobileById,
  updateAutomobile,
} from "@/services/automobilesService";
import { isAxiosError } from "axios";

export type FormFields = Automobile;

type UpdateAutomobileProps = {
  id: string;
  closeDialog: () => void;
};

export default function UpdateAutomobile({
  id,
  closeDialog,
}: UpdateAutomobileProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<FormFields>({
    resolver: zodResolver(Automobile),
    defaultValues: {
      name: "",
      licensePlate: "",
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["automobile", id],
    queryFn: () => getAutomobileById(id),
  });

  useEffect(() => {
    form.reset(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateAutomobile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automobiles"] });
      closeDialog();
      toast({
        description: "Automóvel atualizado com sucesso!",
      });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error);
        form.setError("licensePlate", error.response?.data, {
          shouldFocus: true,
        });
      }
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
            name="licensePlate"
            label="Placa"
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
