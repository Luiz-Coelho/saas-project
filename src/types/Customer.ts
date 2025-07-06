import { z } from "zod";

export const CustomerBase = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .min(1, "Campo obrigatório")
    .toLowerCase()
    .trim(),
  name: z.string().min(1, "Campo obrigatório").toLowerCase().trim(),
  address: z.string().min(1, "Campo obrigatório").toLowerCase().trim(),
  category: z
    .array(z.string())
    .nonempty("Atribua ao menos uma finalidade ao Cliente."),
  track: z.array(z.string()).optional(),
  status: z.string(),
});

export type CustomerBase = z.infer<typeof CustomerBase>;

export const CreateCustomer = CustomerBase;
export type CreateCustomer = z.infer<typeof CreateCustomer>;

export const Customer = CustomerBase.extend({
  _id: z.string(),
});

export type Customer = z.infer<typeof Customer>;

export type CustomerPopulated = Omit<
  Customer,
  "category" | "track" | "status"
> & {
  category: {
    _id: string;
    name: string;
  }[];
  track: {
    _id: string;
    name: string;
  }[];
  status: {
    _id: string;
    name: string;
  };
};

export const SearchCustomer = z
  .object({
    email: z.string().toLowerCase().trim(),
    name: z.string().toLowerCase().trim(),
    address: z.string().toLowerCase().trim(),
    category: z.array(z.string()),
    track: z.array(z.string()),
    status: z.array(z.string()),
  })
  .partial();

export type SearchCustomer = z.infer<typeof SearchCustomer>;
