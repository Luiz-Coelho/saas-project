import { z } from "zod";

export const CategoryBase = z.object({
  name: z.string(),
  description: z.string().optional(),
  track: z.array(z.string()).optional(),
  customer: z.array(z.string()).optional(),
});

export type CategoryBase = z.infer<typeof CategoryBase>;

export const CreateCategory = CategoryBase;
export type CreateCategory = z.infer<typeof CreateCategory>;

export const Category = CategoryBase.extend({
  _id: z.string(),
  track: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
  customer: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
});

export type Category = z.infer<typeof Category>;
