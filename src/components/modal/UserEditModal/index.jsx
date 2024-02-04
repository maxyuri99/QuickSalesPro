import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditUserForm } from "@/components/forms/FormEditUser";

export function DialogCloseButton(buttonImage, userItens) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonImage}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md text-[#F0F1F2]">
        <DialogHeader>
          <DialogTitle className="text-[#F0F1F2]">Editar Usuário</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <EditUserForm userItens={userItens}/>
          </div>
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
