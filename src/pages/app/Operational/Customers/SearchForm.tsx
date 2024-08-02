import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { SearchCustomer } from "@/typing/Customer";
import { status } from "@/data";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import TextInput from "../../../../components/TextInput";
import DropdownInput from "../../../../components/DropdownInput";
import { Category } from "@/typing/Category";
import { Track } from "@/typing/Track";

type SearchFormFields = SearchCustomer;

const defaultValues = {
  email: "",
  name: "",
  address: "",
  category: [],
  track: [],
  status: [],
};

type SearchFormProps = {
  onSubmit: SubmitHandler<SearchFormFields>;
  categories: Category[];
  tracks: Track[];
};

export default function SearchForm({
  onSubmit,
  categories,
  tracks,
}: SearchFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<SearchFormFields>({
    resolver: zodResolver(SearchCustomer),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (searchParams) {
      const params = {
        email: searchParams.get("email") || "",
        name: searchParams.get("name") || "",
        address: searchParams.get("address") || "",
        category: searchParams.getAll("category") || [],
        track: searchParams.getAll("track") || [],
        status: searchParams.getAll("status") || [],
      };

      form.reset(params);
    }
  }, []);

  useEffect(() => {
    const subscription = form.watch((data) => {
      const params = new URLSearchParams();

      Object.entries(data).forEach(([key, value]) => {
        Array.isArray(value)
          ? value.forEach((value) => value && params.append(key, value))
          : value && params.append(key, value);
      });

      setSearchParams(params);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, searchParams]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-y-6 gap-x-10 max-w-screen-xl mx-auto"
      >
        <TextInput control={form.control} name="email" label="Email" />
        <TextInput control={form.control} name="name" label="Nome" />
        <TextInput control={form.control} name="address" label="Endereço" />
        <DropdownInput
          control={form.control}
          name="track"
          label="Rota"
          data={tracks}
        />
        <DropdownInput
          control={form.control}
          name="category"
          label="Finalidade"
          data={categories}
        />
        <DropdownInput
          control={form.control}
          name="status"
          label="Status"
          data={status}
        />
        <div className="col-span-3 flex gap-6">
          <Button
            variant={"secondary"}
            type="reset"
            className="self-center w-full"
            onClick={() => {
              form.reset(defaultValues);
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
      </form>
    </Form>
  );
}
