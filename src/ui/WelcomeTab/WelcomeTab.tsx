import { Text, Button, Flex, HStack } from "@chakra-ui/react";

import { FC } from "react";

interface Props {
  startGame: () => void;
  talk: () => void;
  message: string;
}

export const WelcomeTab: FC<Props> = ({ startGame, message, talk }) => {
  return (
    <Flex
      align={"center"}
      direction={"column"}
      minW="100%"
      minH="100%"
      border={"8px double #3b0373fe"}
      position="relative"
    >
      {" "}
      <Text
        alignSelf={"flex-start"}
        textAlign="left"
        fontSize={["16px", "16px", "18px", "22px"]}
        m={[2, 4, 16, 20]}
        color={"#3b0373fe"}
        minH={"400px"}
      >
        {message}
      </Text>
      <HStack position={"absolute"} bottom="16px">
        <Button onClick={startGame} colorScheme="purple" size="lg">
          {" "}
          Начать
        </Button>
        <Button onClick={talk} colorScheme="purple" size="lg">
          {" "}
          Поговорить
        </Button>
      </HStack>
    </Flex>
  );
};
