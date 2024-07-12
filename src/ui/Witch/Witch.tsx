import { Image } from "@chakra-ui/react";
import { FC } from "react";
import { imgSrc } from "../../lib/img";

interface Props {
  witchClick: () => void;
}

export const Witch: FC<Props> = ({ witchClick }) => {
  return (
    <Image
      onClick={witchClick}
      boxSize="100%"
      objectFit="cover"
      src={imgSrc.witch}
      alt="Witch"
    />
  );
};
