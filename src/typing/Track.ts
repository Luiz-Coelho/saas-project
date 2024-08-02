import { z } from "zod";

export const TrackBase = z.object({
  name: z.string(),
  category: z.string(),
  customer: z.array(z.string()).optional(),
});

export type TrackBase = z.infer<typeof TrackBase>;

export const CreateTrack = TrackBase;
export type CreateTrack = z.infer<typeof CreateTrack>;

export const Track = TrackBase.extend({
  _id: z.string(),
  category: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
    })
  ),
  customer: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
});

export type Track = z.infer<typeof Track>;
