export enum messageTypes {
  welcome = "welcome",
  returnToWelcome = "returnToWelcome",
  talk = "talk",
  win = "win",
  lose = "lose",
  startGame = "startGame",
  witchClick = "witchClick,",
}

export enum PotionColors {
  none = "none",
  red = "red",
  blue = "blue",
  green = "green",
  white = "white",
  black = "black",
  violet = "violet",
  yellow = "yellow",
}
export interface Potion {
  imgSrc: string;
  color: PotionColors;
}

export interface PotionForGame extends Potion {
  id: number;
}
export type PotionPlace = {
  potion: PotionForGame;
  order: number;
};
export type PotionAttempt = {
  potions: PotionForGame[];
  value: number;
};

export enum MainTab {
  welcomeTab = "WelcomeTab",
  gameTab = "GameTab",
  gameTabGameEnded = "GameTabGameEnded",
}
