import { z } from "zod";

export const StatusBase = z.object({
  name: z.string().min(1, "Campo obrigatório").toLowerCase().trim(),
});

export type StatusBase = z.infer<typeof StatusBase>;

export const CreateStatus = StatusBase;
export type CreateStatus = z.infer<typeof CreateStatus>;

export const Status = StatusBase.extend({
  _id: z.string(),
});

export type Status = z.infer<typeof Status>;
