import { Image, Spinner } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { imgSrc } from "../../lib/img";

interface Props {
  witchClick: () => void;
}

export const Witch: FC<Props> = ({ witchClick }) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    fetch(imgSrc.witch)
      .then((response) => response.blob())
      .then((image) => {
        setUrl(URL.createObjectURL(image));
      });
  }, []);
  if (!url) {
    return <Spinner margin="auto" size="xl" color="white" />;
  }
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
