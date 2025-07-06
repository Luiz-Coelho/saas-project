import { z } from "zod";

export const CategoryBase = z.object({
  name: z.string().min(1, "Campo obrigatório").toLowerCase().trim(),
  description: z.string().toLowerCase().trim().optional(),
  track: z.array(z.string()).optional(),
  customer: z.array(z.string()).optional(),
});

export type CategoryBase = z.infer<typeof CategoryBase>;

export const CreateCategory = CategoryBase;
export type CreateCategory = z.infer<typeof CreateCategory>;

export const Category = CategoryBase.extend({
  _id: z.string(),
});

export type Category = z.infer<typeof Category>;

export type CategoryPopulated = Omit<Category, "track" | "customer"> & {
  track: {
    _id: string;
    name: string;
  }[];
  customer: {
    _id: string;
    name: string;
  }[];
};
