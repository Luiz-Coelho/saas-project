import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

type TextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  className?: string;
};

export default function TextInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
}: TextInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
          <FormControl>
            <Input {...field} type="text" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
