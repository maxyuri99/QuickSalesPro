import { RegisterUserForm } from "@/components/forms/FormRegisterUser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

export const DialogInsertUser = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex gap-2">
          <PlusCircle className="w-4 h-4" />
          Novo Usuário
        </Button>
      </DialogTrigger>

      <DialogContent className="text-slate-300">
        <DialogHeader>
          <DialogTitle className="text-slate-300">Novo Usuário</DialogTitle>
          <DialogDescription>Criar um novo usuário!</DialogDescription>
          <RegisterUserForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
