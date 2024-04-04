import { buttonVariants } from "@/components/ui/button";

import { Link } from "react-router-dom";

import { GoPlus } from "react-icons/go";

export default function Users() {
  return (
    <div className="flex flex-col">
      <Link
        to={"/newuser"}
        className={`w-min self-end ${buttonVariants({ variant: "default" })}`}
      >
        <GoPlus className="text-xl" />
        Novo Usuário
      </Link>
      <div>Search Form</div>
    </div>
  );
}
