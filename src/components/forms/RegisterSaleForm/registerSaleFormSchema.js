import { z } from "zod"

export const registerSaleFormSchema = (saleContext) => {
    const { selectedFormPag } = saleContext;
    return selectedFormPag === 1
        ? z.object({
            nome: z.string().nonempty("O nome é obrigatório"),
            dt_nascimento: z.string().nonempty("A data de nascimento é obrigatória"),
            email: z.string().email("Email inválido").nonempty("O e-mail é obrigatório"),
            nome_mae: z.string(),
            numero_end: z.string().nonempty("O número do endereço é obrigatório"),
            agencia: z.string().nonempty("A agência é obrigatória"),
            conta: z.string().nonempty("A conta é obrigatória"),
            complemento_end: z.string(),
            observacao: z.string(),
        })
        : z.object({
            nome: z.string().nonempty("O nome é obrigatório"),
            dt_nascimento: z.string().nonempty("A data de nascimento é obrigatória"),
            email: z.string().email("Email inválido").nonempty("O e-mail é obrigatório"),
            nome_mae: z.string(),
            numero_end: z.string().nonempty("O número do endereço é obrigatório"),
            agencia: z.string(),
            conta: z.string(),
            complemento_end: z.string(),
            observacao: z.string(),
        });
};