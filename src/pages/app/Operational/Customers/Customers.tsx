import { buttonVariants } from "@/components/ui/button";

import { Link } from "react-router-dom";

import { GoPlus } from "react-icons/go";
import SearchForm from "./SearchForm";

export default function Customers() {
  return (
    <div className="space-y-4">
      <Link
        to={"/app/operational/customers/newcustomer"}
        className={`self-end ${buttonVariants({
          variant: "default",
        })}`}
      >
        <GoPlus className="text-xl" />
        Novo Usuário
      </Link>
      <h2 className="">Buscar Cliente(s)</h2>
      <SearchForm />
    </div>
  );
}
