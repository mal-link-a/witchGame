import { Box } from "@chakra-ui/react";
import { FC, useRef } from "react";
import { Droppable } from "react-beautiful-dnd";

import { PotionForGame } from "../../lib";
import { PlayDraggableItem } from "../PlayDraggableItem";

interface Props {
  id: number;
  potion: PotionForGame;
}

export const PlayDroppableItem: FC<Props> = ({ id, potion }) => {
  const ImgSizes = useRef<string[]>(["5vw", "5.4vw", "5.5vw", "6.4vw"]);
  return (
    <Droppable droppableId={`droppable-${id}`} type="base">
      {(provided, snapshot) => (
        <Box
          w={ImgSizes.current}
          h={ImgSizes.current}
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "#17004a" : "#baa9d6",
          }}
          {...provided.droppableProps}
          border="1px solid black"
          borderRadius={"5px"}
        >
          <PlayDraggableItem
            id={potion.id}
            index={0}
            imgSrc={potion.imgSrc}
            imgSizes={ImgSizes.current}
          />
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
