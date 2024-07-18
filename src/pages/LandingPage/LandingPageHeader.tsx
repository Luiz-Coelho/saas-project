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
import { components } from "@/data";

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
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link to={"#"}>Por que a 2MC?</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link to={"#"}>Contato</Link>
            </NavigationMenuLink>
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
