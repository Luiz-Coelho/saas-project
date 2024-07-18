import { Frequency } from "./Frequency";

export type Category = {
  id: string,
  title: string;
  description: string;
  frequency: Frequency[];
};