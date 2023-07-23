import { Button, MultiStep, Text } from "@ignite-ui/react";

import { ArrowRight } from "phosphor-react";

import { ConnectBox, ConnectItem, Container, Header } from "./styles";

export default function Register() {
  async function handleRegister() {}

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
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
