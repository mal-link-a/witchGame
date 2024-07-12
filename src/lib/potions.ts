import { Potion, PotionColors } from "./types";
import { getRandomInt } from "../share/getRandomInt";
import { imgSrc } from "./img";

export const getPotions = (count: number): Potion[] => {
  let potions: Potion[] = [];
  let tmpPotions = structuredClone(potionList);
  for (let i = 0; i < count; i++) {
    const rndItemId = getRandomInt(tmpPotions.length);
    potions.push(tmpPotions[rndItemId]);
    tmpPotions.splice(rndItemId, 1);
  }
  return potions;
};
const potionList: Potion[] = [
  {
    imgSrc: imgSrc.red,
    color: PotionColors.red,
  },
  {
    imgSrc: imgSrc.blue,
    color: PotionColors.blue,
  },
  {
    imgSrc: imgSrc.green,
    color: PotionColors.green,
  },
  {
    imgSrc: imgSrc.white,
    color: PotionColors.white,
  },
  {
    imgSrc: imgSrc.black,
    color: PotionColors.black,
  },
  {
    imgSrc: imgSrc.violet,
    color: PotionColors.violet,
  },
  {
    imgSrc: imgSrc.yellow,
    color: PotionColors.yellow,
  },
];
