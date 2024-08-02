import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchForm from "./SearchForm";
import { GoPlus } from "react-icons/go";
import { buttonVariants } from "@/components/ui/button";
import { DataTable } from "../../../../components/DataTable";
import { columns } from "./Table/Columns";

import { SearchCustomer } from "@/typing/Customer";
import { getCustomers } from "@/services/customerService";
import { fetchMountCustomerData } from "@/services/mountCustomerService";

export default function Customers() {
  const [searchParams, setSearchParams] = useState<URLSearchParams>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tracks", "categories"],
    queryFn: fetchMountCustomerData,
  });

  const {
    data: searchData,
    refetch,
    isLoading: isLoadingSearch,
    isError: isSearchError,
    error: searchError,
  } = useQuery({
    queryKey: ["customers", searchParams],
    queryFn: () => getCustomers(searchParams),
    enabled: !!searchParams,
  });

  useEffect(() => {
    if (searchParams) {
      refetch();
    }
  }, [searchParams]);

  async function handleSearchSubmit(data: SearchCustomer) {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      Array.isArray(value)
        ? value.forEach((value) => value && params.append(key, value))
        : value && params.append(key, value);
    });

    setSearchParams(params);
  }

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  const categories = data?.categories || [];
  const tracks = data?.tracks || [];

  return (
    <div className="space-y-4">
      <div className="grid grid-flow-col">
        <h2 className="self-center">Buscar Cliente(s)</h2>
        <Link
          to={"/app/operational/customers/newcustomer"}
          className={`justify-self-end ${buttonVariants({
            variant: "default",
          })}`}
        >
          <GoPlus className="text-xl" />
          Novo Cliente
        </Link>
      </div>
      <SearchForm
        onSubmit={handleSearchSubmit}
        categories={categories}
        tracks={tracks}
      />
      {isLoadingSearch && <div>Loading...</div>}
      {isSearchError && <div>Error: {searchError.message}</div>}
      {searchData && <DataTable columns={columns} data={searchData} />}
    </div>
  );
}
