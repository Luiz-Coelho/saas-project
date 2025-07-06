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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string | React.ReactNode;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export function MyDialog({
  open,
  onOpenChange,
  label,
  title = label,
  children,
  variant,
}: MyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={"justify-self-end"} variant={variant}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Clique em enviar quando estiver pronto.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
