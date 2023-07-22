import { useRouter } from "next/router";

import { useForm } from "react-hook-form";

import { Button, TextInput } from "@ignite-ui/react";

import { ArrowRight } from "phosphor-react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormAnnotation } from "./styles";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, "O usuário precisa ter pelo menos 3 letras")
    .regex(/^([a-z\\\\-]+)$/i, {
      message: "O usuário precisa ter apenas letras e hifens",
    })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  const router = useRouter();

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data;

    await router.push(`/register?username=${username}`);
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="dominio.com/"
          placeholder="seu-usuario"
          {...register("username")}
        />
        <Button size="sm" type="submit" disabled={isSubmitted}>
          Reservar usuário
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        {errors.username
          ? errors.username.message
          : "Digite o usuário desejado"}
      </FormAnnotation>
    </>
  );
}
