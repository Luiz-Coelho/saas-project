import { CreateCustomer, Customer } from "@/typing/Customer";
import axios from "axios";

const url = "http://localhost:3000/api/customers";

export const getCustomers = async (
  params?: URLSearchParams
): Promise<Customer[]> => {
  const { data } = await axios.get<Customer[]>(url + "?" + params);
  return data;
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  const { data } = await axios.get<Customer>(url + "/" + id);
  return data;
};

export const createCustomer = async (body: CreateCustomer) => {
  const { data } = await axios.post<CreateCustomer>(url, body);
  return data;
};

export const updateCustomer = async (body: Customer) => {
  const { data } = await axios.put<Customer>(url + "/" + body._id, body);
  return data;
};
