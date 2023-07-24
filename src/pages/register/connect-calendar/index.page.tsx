import { useRouter } from "next/router";

import { Button, MultiStep, Text } from "@ignite-ui/react";

import { signIn, useSession } from "next-auth/react";

import { ArrowRight, Check } from "phosphor-react";

import {
  AuthError,
  ConnectBox,
  ConnectItem,
  Container,
  Header,
} from "./styles";

export default function Register() {
  const session = useSession();
  const router = useRouter();

  const hasError = !!router.query.error;

  const isSignedIn = session.status === "authenticated";

  async function handleConnectCalendar() {
    await signIn("google");
  }

  return (
    <Container>
      <Header>
        <Header as="strong">Conecte sua agenda</Header>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptas
          magni sequi, expedita saepe accusantium.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
