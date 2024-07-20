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
import { Control, FieldValues, Path } from "react-hook-form";

type DropdownInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  data: {
    id: string;
    label: string;
  }[];
  description?: string;
};

export default function DropdownInput<T extends FieldValues>({
  control,
  name,
  label,
  data,
  description,
}: DropdownInputProps<T>) {
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
                      ? field.onChange(data.map((i) => i.id))
                      : field.onChange([]);
                  }}
                >
                  Todas
                </DropdownMenuCheckboxItem>
                {data.map((i) => (
                  <FormItem key={i.id}>
                    <FormControl>
                      <DropdownMenuCheckboxItem
                        checked={field.value?.includes(i.id)}
                        onCheckedChange={(checked) => {
                          field.value && checked
                            ? field.onChange([...field.value, i.id])
                            : field.onChange(
                                field.value.filter(
                                  (value: string) => value !== i.id
                                )
                              );
                        }}
                      >
                        {i.label}
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
