import axios from "axios";
import { formatObject } from "./formatService";
import { CreateStatus, Status } from "@/types/Status";

const url = "http://localhost:4000/api/status";

export const getStatuses = async (): Promise<Status[]> => {
  const { data } = await axios.get<Status[]>(url);
  return data.map(formatObject);
};

export const getStatusById = async (id: string): Promise<Status> => {
  const { data } = await axios.get<Status>(url + "/" + id);
  return formatObject(data);
};

export const createStatus = async (body: CreateStatus) => {
  const { data } = await axios.post<CreateStatus>(url, body);
  return data;
};

export const updateStatus = async (body: Status) => {
  const { data } = await axios.put<Status>(url + "/" + body._id, body);
  return data;
};
