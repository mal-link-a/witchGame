import { Box, Button, Grid, HStack } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { DragDropContext } from "react-beautiful-dnd";

import { PotionPlace, PotionAttempt, MainTab } from "../../lib";

import { FC } from "react";
import { PlayDroppableItem } from "../PlayDroppableItem";
import { PlayAttemptItem } from "../PlayAttemptItem";

interface Props {
  potionPlaces: PotionPlace[];
  potionAttempts: PotionAttempt[];
  checkSequence: () => void;
  moveOnDrag: (source: number, destination: number) => void;
  mainType: MainTab;
}

export const PlayTab: FC<Props> = ({
  potionPlaces,
  potionAttempts,
  checkSequence,
  moveOnDrag,
  mainType,
}) => {
  const onDragEnd = (data: any) => {
    if (!data?.destination?.droppableId) return;
    const [destination, source] = [
      data.destination.droppableId,
      data.source.droppableId,
    ];
    if (destination === "droppableBase" || destination === source) return;

    const destinationId = destination.slice(-1);
    const sourceId = source.slice(-1);
    moveOnDrag(sourceId, destinationId);
  };
  return (
    <Box
      border="thick double #3b0373fe"
      w="100%"
      minH={["400px", "410px", "430px", "460px", "500px"]}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <HStack
          alignItems="center"
          id="droppableParent"
          gap={1}
          bg="745fa3"
          justifyContent="center"
        >
          {potionPlaces.map((place) => {
            return (
              <PlayDroppableItem
                key={"DroppableZone-" + place.order}
                id={place.order}
                potion={place.potion}
              />
            );
          })}
          <Button
            isDisabled={mainType === MainTab.gameTabGameEnded}
            onClick={() => checkSequence()}
            colorScheme="purple"
            w={["5vw", "5.4vw", "5.5vw", "6.4vw"]}
            h={["5vw", "5.4vw", "5.5vw", "6.4vw"]}
          >
            <CheckIcon />
          </Button>
        </HStack>
      </DragDropContext>
      <Grid
        mt={6}
        gridTemplateColumns={"45% 45%"}
        gap={6}
        justifyItems={"center"}
        justifyContent={"center"}
      >
        {potionAttempts.map((item) => {
          return <PlayAttemptItem item={item} />;
        })}
      </Grid>
    </Box>
  );
};
