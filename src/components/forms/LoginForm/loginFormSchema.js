import { z } from "zod";

export const loginFormSchema = z.object({
    login: z.string().nonempty("O login é obrigatório"),
    senha: z.string().nonempty("A senha é obrigatória")
})