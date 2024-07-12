import { Image } from "@chakra-ui/react";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  id: number;
  index: number;
  imgSrc: string;
  imgSizes: string[];
}

export const PlayDraggableItem: FC<Props> = ({
  id,
  index,
  imgSrc,
  imgSizes,
}) => {
  return (
    <Draggable
      draggableId={`draggable-${id}`}
      key={`draggable-${id}`}
      index={index}
    >
      {(provided, snapshot) => (
        <Image
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          src={imgSrc}
          boxSize={imgSizes}
          objectFit="contain"
          alt="potion"
        />
      )}
    </Draggable>
  );
};
