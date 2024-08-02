import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";

type SelectInputProps<T extends FieldValues, U> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  data: U[];
  keyField: keyof U;
  valueField: keyof U;
  nameField: keyof U;
  description?: string;
  className?: string;
};

export default function SelectInput<T extends FieldValues, U>({
  control,
  name,
  label,
  description,
  data,
  keyField,
  valueField,
  nameField,
  className,
}: SelectInputProps<T, U>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((d) => (
                <SelectItem
                  key={d[keyField] as string}
                  value={d[valueField] as string}
                >
                  {d[nameField] as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
