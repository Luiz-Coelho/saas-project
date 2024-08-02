import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import TextInput from "@/components/TextInput";
import { CreateAutomobile } from "@/typing/Automobile";
import { createAutomobile } from "@/services/automobilesService";

export type FormFields = CreateAutomobile;

export default function NewAutomobile() {
  const queryClient = useQueryClient();

  const form = useForm<FormFields>({
    resolver: zodResolver(CreateAutomobile),
    defaultValues: {
      name: "",
      licensePlate: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createAutomobile,
    onSuccess: () => {
      form.formState.isSubmitSuccessful && form.reset();
      queryClient.invalidateQueries({ queryKey: ["automobiles"] });
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
