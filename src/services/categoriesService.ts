import { Category, CreateCategory } from "@/typing/Category";
import axios from "axios";

const url = "http://localhost:3000/api/categories";

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get(url);
  return data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const { data } = await axios.get(url + "/" + id);
  return data;
};

export const createCategory = async (body: CreateCategory) => {
  const { data } = await axios.post<CreateCategory>(url, body);
  return data;
};
