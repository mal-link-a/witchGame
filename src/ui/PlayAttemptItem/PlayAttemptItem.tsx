import { Image, Flex, HStack } from "@chakra-ui/react";
import { FC } from "react";

import { PotionAttempt } from "../../lib";
const size = ["15px", "15px", "20px", "28px", "35px"];

interface Props {
  item: PotionAttempt;
}

export const PlayAttemptItem: FC<Props> = ({ item }) => {
  return (
    <HStack gap={[0, 0, 1, 1, 2]} h="15">
      {item.potions.map((potion) => {
        return (
          <Image
            src={potion.imgSrc}
            boxSize={size}
            objectFit="cover"
            alt={potion.color}
          />
        );
      })}
      <Flex align={"center"} h={size} w={size}>
        {item.value}
      </Flex>
    </HStack>
  );
};
