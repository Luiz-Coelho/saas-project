import { CreateCustomer, Customer, CustomerPopulated } from "@/types/Customer";
import axios from "axios";
import { formatObject } from "./formatService";

const url = "http://localhost:4000/api/customers";

export const getCustomers = async (
  params?: URLSearchParams
): Promise<CustomerPopulated[]> => {
  const { data } = await axios.get<CustomerPopulated[]>(url + "?" + params);
  return data.map(formatObject);
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  const { data } = await axios.get<Customer>(url + "/" + id);
  return formatObject(data);
};

export const createCustomer = async (body: CreateCustomer) => {
  const { data } = await axios.post<CreateCustomer>(url, body);
  return data;
};

export const updateCustomer = async (body: Customer) => {
  const { data } = await axios.put<Customer>(url + "/" + body._id, body);
  return data;
};
