import { z } from "zod";

export const TrackBase = z.object({
  name: z.string().min(1, "Atribua um nome a sua rota.").toLowerCase().trim(),
  category: z
    .string()
    .min(1, "Você deve vincular a rota a uma finalidade e somente uma."),
  customer: z.array(z.string()).optional(),
});

export type TrackBase = z.infer<typeof TrackBase>;

export const CreateTrack = TrackBase;
export type CreateTrack = z.infer<typeof CreateTrack>;

export const Track = TrackBase.extend({
  _id: z.string(),
});

export type Track = z.infer<typeof Track>;

export type TrackPopulated = Omit<Track, "category" | "customer"> & {
  category: {
    _id: string;
    name: string;
  };
  customer: {
    _id: string;
    name: string;
  }[];
};
