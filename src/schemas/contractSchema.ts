import { z } from "zod";

export const contractSchema = z.object({
  name: z.string().min(1, "Nome do contrato é obrigatório"),
  type: z.string().min(1, "Tipo do contrato é obrigatório"),
  startDate: z.date(),
  endDate: z.date(),
  amount: z.string().min(1, "Valor do contrato deve ser positivo"),
  description: z.string().optional(),
  clientOrSupplier: z.string().min(1, "Cliente/Fornecedor é obrigatório"),
});
