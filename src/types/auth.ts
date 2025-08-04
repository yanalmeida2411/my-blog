import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(4,"Usuário é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullname: z.string().min(4,"Nome é obrigatório"),
    user: z.string().min(4,"Usuário é obrigatório"),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword && data.password.length !== 0, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;