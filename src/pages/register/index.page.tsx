import { useEffect } from "react";

import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowRight } from "phosphor-react";

import { z } from "zod";

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
    formState: { errors, isSubmitted },
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
    console.log(data);
  }

  return (
    <Container>
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

        <Button type="submit" disabled={isSubmitted}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
