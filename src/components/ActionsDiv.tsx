import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

type ActionsDivProps = {
  id: string;
};

export default function ActionsDiv({ id }: ActionsDivProps) {
  return (
    <div>
      <Button variant={"ghost"} asChild>
        <Link to={id}>
          <Pencil size={18} />
        </Link>
      </Button>
    </div>
  );
}
