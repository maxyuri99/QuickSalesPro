"use client";
import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

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
  cargo: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

export const EditUserForm = ({ userItens }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: userItens ? userItens.nome : "",
      login: userItens ? userItens.login : "",
      cargo: userItens ? userItens.nome_cargo : "",
    },
  });

  //Defina seu Handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
          name="cargo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cargo!" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={field.value}>{field.value}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"secondary"} type="submit" className="mt-4">
          Salvar
        </Button>
      </form>
    </Form>
  );
};
