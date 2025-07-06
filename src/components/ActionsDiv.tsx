import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { MyDialog } from "./MyDialog";
import { useState } from "react";

type ActionsDivProps = {
  id: string;
  type?: "default" | "customer";
  title: string;
  children: React.ReactElement;
};

export default function ActionsDiv({
  id,
  type = "default",
  children,
  title,
}: ActionsDivProps) {
  const [open, setOpen] = useState(false);
  if (type === "default") {
    return (
      <MyDialog
        key={id}
        open={open}
        onOpenChange={setOpen}
        label={<Pencil size={18} />}
        children={children}
        variant={"ghost"}
        title={title}
      />
    );
  }
  if (type === "customer") {
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
}
