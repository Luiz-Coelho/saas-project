import { Frequency } from "./Frequency";

export type Category = {
  id: string;
  label: string;
  description: string;
  frequency: Frequency[];
};
