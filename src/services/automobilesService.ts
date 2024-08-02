import { Automobile, CreateAutomobile } from "@/typing/Automobile";
import axios from "axios";

const url = "http://localhost:3000/api/automobiles";

export const getAutomobiles = async (): Promise<Automobile[]> => {
  const { data } = await axios.get(url);
  return data;
};

export const getAutomobileById = async (id: string): Promise<Automobile> => {
  const { data } = await axios.get(url + "/" + id);
  return data;
};

export const createAutomobile = async (body: CreateAutomobile) => {
  const { data } = await axios.post<CreateAutomobile>(url, body);
  return data;
};
