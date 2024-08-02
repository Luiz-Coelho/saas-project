import { AxiosError } from "axios";

export const handleError = (error: AxiosError) => {
  console.log(error);
  throw error;
};
