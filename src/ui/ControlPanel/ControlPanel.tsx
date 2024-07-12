import { Button, ButtonGroup } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  startGame: () => void;
  backToWelcome: () => void;
}

export const ControlPanel: FC<Props> = ({ startGame, backToWelcome }) => {
  return (
    <ButtonGroup justifyContent={"center"} p={2} h={[30, 50]} gap="4" w="100%">
      <Button onClick={startGame} h={"100%"} colorScheme="purple">
        Новая игра
      </Button>
      <Button onClick={backToWelcome} h={"100%"} colorScheme="purple">
        Вернуться к началу
      </Button>
    </ButtonGroup>
  );
};
