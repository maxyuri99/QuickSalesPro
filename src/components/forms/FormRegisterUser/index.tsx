"use client";
import React, { useContext } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { ControlUserContext } from "@/providers/ControlUserContext";

const formSchema = z.object({
  nome: z
    .string()
    .min(4, {
      message: "Mínimo de 4 caracters.",
    })
    .max(50, {
      message: "Máximo de 50 caracteres.",
    }),
  login: z
    .string()
    .min(4, {
      message: "Mínimo de 4 caracters.",
    })
    .max(50, {
      message: "Máximo de 50 caracteres.",
    }),
  senha: z
    .string({
      required_error: "Digite uma senha.",
    })
    .min(1, {
      message: "Mínimo de 1 caracters.",
    })
    .max(10, {
      message: "Máximo de 10 caracteres.",
    }),
  telefone: z
    .string()
    .min(10, {
      message: "Mínimo de 10 caracters.",
    })
    .max(11, {
      message: "Máximo de 11 caracteres.",
    }),
});

export const RegisterUserForm = ({ userItens }: any) => {
  const { handleRegisterUser } = useContext<any>(ControlUserContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      login: "",
      senha: "ebtel2023",
      telefone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleRegisterUser(values);
  };
  const { formState } = form;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-1">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="nome"
                  placeholder="Nome"
                  className="border-solid"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="login"
                  placeholder="Login"
                  className="border-solid"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="senha"
                  placeholder="Senha"
                  className="border-solid"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  id="telefone"
                  placeholder="(99)9 9999-9999"
                  className="border-solid"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              type="submit"
              className="mt-4"
              disabled={!formState.isValid}
            >
              Salvar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={"destructive"} type="button" className="mt-4">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};
