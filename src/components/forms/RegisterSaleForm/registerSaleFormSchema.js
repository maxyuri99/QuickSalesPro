import { z } from "zod"

export const registerSaleFormSchema = z.object({
    cpf: z
        .string().nonempty("CPF é obrigatório")
        .refine((value) => value.length === 11, {
            message: "CPF inválido. Deve ter 11 dígitos.",
        }),
    nome: z.string().nonempty("O nome é obrigatório"),
    dt_nascimento: z
        .string().nonempty("A data de nascimento é obrigatória"),
    email: z.string().email().nonempty("O e-mail é obrigatório"),
    nome_mae: z.string().nonempty("É obrigatório adicionar o nome da mãe do cliente"),
    telefone_1: z.string().nonempty("O telefone principal é obrigatório"),
    cep: z.string().nonempty("O CEP é obrigatório"),
    numero_end: z.string().nonempty("O número do endereço é obrigatório"),
    bairro: z.string().nonempty("O bairro é obrigatório"),
    endereco: z.string().nonempty("A rua é obrigatória"),
    cidade: z.string().nonempty("A cidade é obrigatória"),
    banco: z.string().nonempty("O banco é obrigatório"),
    agencia: z.string().nonempty("A agência é obrigatória"),
    conta: z.string().nonempty("A conta é obrigatória"),
    uf: z.string().nonempty("O uf é obrigatório"),
    cnpj: z.string(),
    complemento_end: z.string(),
    cpf_socio: z.string(),
    telefone_2: z.string(),
    telefone_3: z.string(),
    observacao: z.string(),
})


