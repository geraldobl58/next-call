import { useEffect } from "react";

import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowRight } from "phosphor-react";

import { z } from "zod";

import { AxiosError } from "axios";

import { Toaster, toast } from "react-hot-toast";

import api from "@/src/lib/axios";

import { Button, MultiStep, Text, TextInput } from "@ignite-ui/react";

import { Container, Form, FormError, Header } from "./styles";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, "O usuário precisa ter pelo menos 3 letras")
    .regex(/^([a-z\\\\-]+)$/i, {
      message: "O usuário precisa ter apenas letras e hifens",
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, "O nome precisa ter pelo menos 3 letras"),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/users", {
        name: data.name,
        username: data.username,
      });

      await router.push("/register/connect-calendar");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        toast.error("Houve um erro ao cadastrar o usuário.");
      }
    }
  }

  return (
    <Container>
      <Toaster />
      <Header as="strong">Bem vindo</Header>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptas
        magni sequi, expedita saepe accusantium.
      </Text>

      <MultiStep size={4} currentStep={1} />

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text>Nome de usuário</Text>
          <TextInput
            size="sm"
            prefix="dominio.com/"
            placeholder="seu-usuario"
            {...register("username")}
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}
        </label>

        <label>
          <Text>Nome completo</Text>
          <TextInput
            size="sm"
            placeholder="Seu nome completo"
            {...register("name")}
          />

          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
