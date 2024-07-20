import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { categories, status, tracks } from "@/data";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import TextInput from "../../../../../components/TextFormInput";
import DropdownInput from "../../../../../components/DropdownFormInput";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  category: z.array(z.string()).optional(),
  track: z.array(z.string()).optional(),
  status: z.array(z.string()).optional(),
});

type FormFields = z.infer<typeof formSchema>;

const defaultValues = {
  email: "",
  name: "",
  address: "",
  category: [],
  track: [],
  status: [],
};

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
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
      console.log(`${searchParams}`);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, searchParams]);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      Array.isArray(value)
        ? value.forEach((value) => value && params.append(key, value))
        : value && params.append(key, value);
    });

    setSearchParams(params);
    fetch(`http://localhost:3000/customers?${searchParams}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        form.formState.isSubmitSuccessful && form.reset();
      })
      .catch((error) => console.log(error));
  };

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
