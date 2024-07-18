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
import { categories, status, tracks } from "@/data";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string(),
  name: z.string(),
  address: z.string(),
  category: z.array(z.string()),
  track: z.array(z.string()),
  status: z.array(z.string()),
});

type FormFields = z.infer<typeof formSchema>;

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      category: [],
      track: [],
      status: [],
    },
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
          : params.append(key, value);
      });

      setSearchParams(params);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, searchParams]);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      Array.isArray(value)
        ? value.forEach((value) => value && params.append(key, value))
        : params.append(key, value);
    });

    setSearchParams(params);
    fetch(`http://localhost:3000/customers/${params}`, {
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            <FormItem>
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
          name="track"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rota(s)</FormLabel>
              <FormItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>Escolher rotas</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Rotas</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={field.value.length === tracks.length}
                      onCheckedChange={(checked) => {
                        checked
                          ? field.onChange(tracks.map((track) => track.id))
                          : field.onChange([]);
                      }}
                    >
                      Todas
                    </DropdownMenuCheckboxItem>
                    {tracks.map((track) => (
                      <FormItem key={track.id}>
                        <FormControl>
                          <DropdownMenuCheckboxItem
                            checked={field.value.includes(track.id)}
                            onCheckedChange={(checked) => {
                              checked
                                ? field.onChange([...field.value, track.id])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== track.id
                                    )
                                  );
                            }}
                          >
                            {track.name}
                          </DropdownMenuCheckboxItem>
                        </FormControl>
                      </FormItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormItem>
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
              <FormItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>Escolher finalidade(s)</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Finalidades</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={field.value.length === categories.length}
                      onCheckedChange={(checked) => {
                        checked
                          ? field.onChange(
                              categories.map((category) => category.id)
                            )
                          : field.onChange([]);
                      }}
                    >
                      Todas
                    </DropdownMenuCheckboxItem>
                    {categories.map((category) => (
                      <FormItem key={category.id}>
                        <FormControl>
                          <DropdownMenuCheckboxItem
                            checked={field.value.includes(category.id)}
                            onCheckedChange={(checked) => {
                              checked
                                ? field.onChange([...field.value, category.id])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== category.id
                                    )
                                  );
                            }}
                          >
                            {category.title}
                          </DropdownMenuCheckboxItem>
                        </FormControl>
                      </FormItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormItem>
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
              <FormItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"outline"}>Filtrar por Status</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={field.value.length === status.length}
                      onCheckedChange={(checked) => {
                        checked
                          ? field.onChange(status.map((stat) => stat.name))
                          : field.onChange([]);
                      }}
                    >
                      Todos
                    </DropdownMenuCheckboxItem>
                    {status.map((stat) => (
                      <FormItem key={stat.name}>
                        <FormControl>
                          <DropdownMenuCheckboxItem
                            checked={field.value.includes(stat.name)}
                            onCheckedChange={(checked) => {
                              checked
                                ? field.onChange([...field.value, stat.name])
                                : field.onChange(
                                    field.value.filter(
                                      (value) => value !== stat.name
                                    )
                                  );
                            }}
                          >
                            {stat.title}
                          </DropdownMenuCheckboxItem>
                        </FormControl>
                      </FormItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-3 flex gap-6">
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
      </form>
    </Form>
  );
}
