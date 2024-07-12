import { Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

import { MainTab, PotionAttempt, PotionPlace } from "../../lib";
import { ControlPanel } from "../ControlPanel";
import { WelcomeTab } from "../WelcomeTab";
import { PlayTab } from "../PlayTab";

interface Props {
  mainType: MainTab;
  potionPlaces: PotionPlace[];
  potionAttempts: PotionAttempt[];
  checkSequence: () => void;
  startGame: () => void;
  moveOnDrag: (source: number, destination: number) => void;
  message: string;
  talk: () => void;
  backToWelcome: () => void;
}

export const Mainfield: FC<Props> = ({
  talk,
  message,
  checkSequence,
  startGame,
  potionPlaces,
  potionAttempts,
  moveOnDrag,
  mainType,
  backToWelcome,
}) => {
  const size = ["800px", "710px", "655px", "675px"];
  if (mainType === MainTab.welcomeTab) {
    return (
      <VStack
        w="100%"
        h="100%"
        minH={size}
        bg="#e4c9ff"
        justifyContent={"space-between"}
      >
        <WelcomeTab talk={talk} startGame={startGame} message={message} />
      </VStack>
    );
  }

  return (
    <VStack
      w="100%"
      h="100%"
      minH={size}
      bg="#e4c9ff"
      justifyContent={"space-between"}
    >
      <PlayTab
        mainType={mainType}
        moveOnDrag={moveOnDrag}
        potionPlaces={potionPlaces}
        potionAttempts={potionAttempts}
        checkSequence={checkSequence}
      />
      <Text
        p={1}
        w="100%"
        alignSelf="flex-start"
        minH={[200, 200, 130, 105]}
        fontSize={["16px", "16px", "18px", "22px"]}
        border="thick double #3b0373fe"
        color={"#3b0373fe"}
      >
        {message}
      </Text>
      <ControlPanel startGame={startGame} backToWelcome={backToWelcome} />
    </VStack>
  );
};
