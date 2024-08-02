import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type MyDialogProps = {
  label: string;
  description?: string;
  children: React.ReactNode;
};

export function MyDialog({ label, description, children }: MyDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={"justify-self-end"}>{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
