import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "../../components/ui/button";
import { ModeToggle } from "../../components/mode-toggle";

import List from "../../components/ui/list";
import ListItem from "../../components/ui/list-item";
import { Link } from "react-router-dom";

//type Props = {};

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Extraordinário",
    href: "#",
    description:
      "Este tipo de coleta é geralmente destinado a resíduos que não se enquadram nas categorias regulares de coleta. Pode incluir itens de grande volume ou resíduos gerados por eventos especiais que requerem atenção especial para o descarte.",
  },
  {
    title: "Biológico",
    href: "#",
    description:
      "Refere-se à coleta de resíduos que têm origem biológica, como restos de alimentos, folhas, caules, sementes, papéis usados, dejetos humanos, entre outros.",
  },
  {
    title: "Químico",
    href: "#",
    description:
      "Esses resíduos precisam de um tratamento especial para evitar a contaminação do meio ambiente e riscos à saúde pública. Normalmente, são incluídos na categoria de resíduos perigosos e podem ser identificados pela cor laranja em sistemas de coleta seletiva",
  },
];

export default function LandingPageHeader() {
  return (
    <header className="my-2 flex justify-around items-center">
      <div className="flex items-center">
        <a href="#">
          <img src="src\assets\logo.png" alt="" className="h-12 w-12" />
        </a>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            {/* there are 2 paddings, in the list and in the list item, p-4 and p-3 */}
            <NavigationMenuContent className="p-4">
              <NavigationMenuLink>Preços</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4">
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tipos de Coleta</NavigationMenuTrigger>
            <NavigationMenuContent>
              <List>
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    description={component.description}
                    href={component.href}
                    title={component.title}
                  />
                ))}
              </List>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <a href="#">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Por que a 2MC?
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <a href="#">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contato
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <ul className="flex gap-4">
          <li>
            <Button variant="outline">
              <Link to={"/app"}>Dashboard</Link>
            </Button>
          </li>
          <li>
            <Button>Entrar</Button>
          </li>
          <li>
            <Button variant="secondary">Cadastrar</Button>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </header>
  );
}
