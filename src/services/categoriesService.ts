import { Category, CategoryPopulated, CreateCategory } from "@/types/Category";
import axios from "axios";
import { formatObject } from "./formatService";

const url = "http://localhost:4000/api/categories";

export const getCategories = async (): Promise<CategoryPopulated[]> => {
  const { data } = await axios.get<CategoryPopulated[]>(url);
  return data.map(formatObject);
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const { data } = await axios.get<Category>(url + "/" + id);
  return formatObject(data);
};

export const createCategory = async (body: CreateCategory) => {
  const { data } = await axios.post<CreateCategory>(url, body);
  return data;
};

export const updateCategory = async (body: Category) => {
  const { data } = await axios.put<Category>(url + "/" + body._id, body);
  return data;
};
