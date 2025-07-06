import { Automobile, CreateAutomobile } from "@/types/Automobile";
import axios from "axios";
import { formatObject } from "./formatService";

const url = "http://localhost:4000/api/automobiles";

export const getAutomobiles = async (): Promise<Automobile[]> => {
  const { data } = await axios.get<Automobile[]>(url);
  return data.map(formatObject);
};

export const getAutomobileById = async (id: string): Promise<Automobile> => {
  const { data } = await axios.get<Automobile>(url + "/" + id);
  return formatObject(data);
};

export const createAutomobile = async (body: CreateAutomobile) => {
  const { data } = await axios.post<CreateAutomobile>(url, body);
  return data;
};

export const updateAutomobile = async (body: Automobile) => {
  const { data } = await axios.put<Automobile>(url + "/" + body._id, body);
  return data;
};
