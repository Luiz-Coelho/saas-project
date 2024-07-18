import { buttonVariants } from "@/components/ui/button";

import { Link } from "react-router-dom";

import { GoPlus } from "react-icons/go";
import SearchForm from "./SearchForm";

export default function Customers() {
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
      <SearchForm />
    </div>
  );
}
