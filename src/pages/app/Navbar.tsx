import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MainNav from "./MainNav";
import { UserDropdown } from "./UserDropdown";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  return (
    <aside className="flex flex-col">
      <header className="flex items-center gap-4 p-3.5">
        <Avatar>
          <AvatarFallback>LF</AvatarFallback>
        </Avatar>
        <UserDropdown />
        <ModeToggle />
      </header>
      <Separator className="px-0 mx-0" />
      <main className="flex flex-col py-8 px-4">
        <nav className="flex flex-col gap-y-4 ">
          <h2 className="text-muted-foreground">Administração</h2>
          <MainNav to={"/app/administrative/users"} text={"Usuários"} />
          <MainNav
            to={"/app/administrative/departments"}
            text={"Departamentos"}
          />
          <h2 className="text-muted-foreground">Financeiro</h2>

          <MainNav to={"/app/financial/payables"} text={"Contas a Pagar"} />
          <MainNav
            to={"/app/financial/receivables"}
            text={"Contas a Receber"}
          />

          <h2 className="text-muted-foreground">Operacional</h2>
          <MainNav to={"/app/operational/customers"} text={"Clientes"} />
          <MainNav to={"/app/operational/automobiles"} text={"Automóveis"} />
          <MainNav to={"/app/operational/tracks"} text={"Rotas"} />
          <MainNav to={"/app/operational/orders"} text={"Ordens de Serviço"} />
        </nav>
      </main>
      <footer className="flex flex-col py-8 px-4 mt-auto">
        <MainNav to={"/todo"} text={"Preciso de ajuda"} />
      </footer>
    </aside>
  );
}
