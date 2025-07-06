import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { CategoryPopulated } from "@/types/Category";
import { Status } from "@/types/Status";
import { TrackPopulated } from "@/types/Track";
import { Control, FieldValues, Path } from "react-hook-form";

type DropdownFormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  data: TrackPopulated[] | CategoryPopulated[] | Status[];
  description?: string;
};

export default function DropdownFormInput<T extends FieldValues>({
  control,
  name,
  label,
  data,
  description,
}: DropdownFormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <FormItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>Escolher {label}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={field.value.length === data.length}
                  onCheckedChange={(checked) => {
                    checked
                      ? field.onChange(data.map((d) => d._id))
                      : field.onChange([]);
                  }}
                >
                  Selecionar Tudo
                </DropdownMenuCheckboxItem>
                {data.map((d) => (
                  <FormItem key={d._id}>
                    <FormControl>
                      <DropdownMenuCheckboxItem
                        checked={field.value?.includes(d._id)}
                        onCheckedChange={(checked) => {
                          field.value && checked
                            ? field.onChange([...field.value, d._id])
                            : field.onChange(
                                field.value.filter(
                                  (value: string) => value !== d._id
                                )
                              );
                        }}
                      >
                        {d.name}
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
  );
}
