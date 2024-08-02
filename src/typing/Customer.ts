import { z } from "zod";

export const CustomerBase = z.object({
  email: z.string().email().min(1, "Campo obrigatório"),
  name: z.string().min(1, "Campo obrigatório"),
  address: z.string().min(1, "Campo obrigatório"),
  category: z.array(z.string()).min(1, "Campo obrigatório"),
  track: z.array(z.string()).optional(),
  status: z.enum(["active", "inactive"]),
});

export type CustomerBase = z.infer<typeof CustomerBase>;

export const CreateCustomer = CustomerBase;
export type CreateCustomer = z.infer<typeof CreateCustomer>;

export const Customer = CustomerBase.extend({
  _id: z.string(),
});

export type Customer = z.infer<typeof Customer>;

export const SearchCustomer = z
  .object({
    email: z.string(),
    name: z.string(),
    address: z.string(),
    category: z.array(z.string()),
    track: z.array(z.string()),
    status: z.array(z.string()),
  })
  .partial();

export type SearchCustomer = z.infer<typeof SearchCustomer>;
