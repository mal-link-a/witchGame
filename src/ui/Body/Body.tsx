import { Box, Grid } from "@chakra-ui/react";
import { Mainfield } from "../Mainfield/Mainfield";
import { Witch } from "../Witch";
import { useEffect, useRef, useState } from "react";

import { getRandomInt } from "../../share/getRandomInt";
import {
  MainTab,
  messageTypes,
  PotionAttempt,
  PotionColors,
  PotionPlace,
} from "../../lib/types";
import { getPotions } from "../../lib/potions";
import { getMessage } from "../../lib/messages";

import { sleep } from "../../share/sleep";

export const Body = () => {
  const usedTalks = useRef<(messageTypes | PotionColors)[]>([]); //Массив уже использованных сообщения, используется для избежания повторов
  const message = useRef<string[]>([""]); //Сообщение для отображения как речи ведьмы
  const [isUpdateMessage, setIsUpdateMessage] = useState<boolean>(false); //Флажок для нормальной работы отображения сообщения
  const [shovedMessage, setShovedMessage] = useState<string>(""); //Отображаемое сообщение речи ведьмы
  const [mainType, setMainType] = useState<MainTab>(MainTab.welcomeTab); //Контент и состояние содержимого
  const [potionPlaces, setPotionPlaces] = useState<PotionPlace[]>([]); //Места под зелья
  const [potionAttempts, setPotionAttempts] = useState<PotionAttempt[]>([]); //Запись истории для игры в зелья
  const [gameSequence, setGameSequence] = useState<number[]>([]); // Текущая победная комбинация игры в зелья

  useEffect(() => {
    setShovedMessage(getMessage(messageTypes.welcome)[0]);
  }, []);

  //Перетаскивание потионов
  const handleMoveOnDrag = (source: number, destination: number) => {
    const places = structuredClone(potionPlaces);
    const ourPotion = places[source].potion;
    const targetPotion = places[destination].potion;
    places[source].potion = targetPotion;
    places[destination].potion = ourPotion;
    setPotionPlaces(places);
  };
  //Раунд игры
  const handleCheckSequence = (): void => {
    let arr = [];
    for (let i = 0; i < potionPlaces.length; i++) {
      arr.push(potionPlaces[i].potion.id);
    }
    const attempts = structuredClone(potionAttempts);
    const potions = [];
    for (let i = 0; i < potionPlaces.length; i++) {
      potions.push({ ...potionPlaces[i].potion });
    }
    if (arr.length !== gameSequence.length)
      throw Error(
        `Ошибка в handleCheckSequence - неверная длина массива. \n длина пришедшего массива = ${arr.length} \n длина игрового массива = ${gameSequence.length}`
      );
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === gameSequence[i]) count++;
    }
    

    const newAttempts: PotionAttempt = { potions: potions, value: count };
    attempts.push(newAttempts);
    setPotionAttempts(attempts);
    if (potionAttempts.length === 17) {
      resultLoseGame();
    }
    if (potionAttempts.length % 5 === 0) {
      updateTalkInInGame();
    }
    if (count === 7) {
      resultWinGame();      
    }
  };
  //Разговоры ведьмы во время игры
  const updateTalkInInGame = () => {
    //Это будет хорошо работать, пока количество диалогов много меньше количества зелий
    let potionTalkColor;
    do {
      potionTalkColor =
        potionPlaces[getRandomInt(potionPlaces.length)].potion.color;
    } while (
      usedTalks.current.includes(potionTalkColor) &&
      usedTalks.current.length < potionPlaces.length
    );
    usedTalks.current.push(potionTalkColor);
    ShowMessage(potionTalkColor);
  };
  //Показ сообщений ведьмы
  const ShowMessage = (type: messageTypes | PotionColors) => {
    message.current = getMessage(type);
    setShovedMessage("");
    if (isUpdateMessage === false) {
      updateMessage(true);
    }
  };
  //Начало игры
  const handleStartGame = () => {
    let arrSorted: PotionPlace[] = [];
    const potions = getPotions(7);
    for (let i = 0; i < 7; i++) {
      arrSorted.push({
        potion: { ...potions[i], id: i },
        order: i,
      });
    }
    setPotionPlaces(arrSorted);
    let sequenceArr = [];
    let posArr = [0, 1, 2, 3, 4, 5, 6];
    for (let i = 0; i < 7; i++) {
      let round = getRandomInt(posArr.length);
      sequenceArr.push(posArr[round]);
      posArr.splice(round, 1);
      if (isUpdateMessage === false) {
        updateMessage(true);
      }
    }
    setPotionAttempts([]);
    setShovedMessage("");
    message.current = getMessage(messageTypes.startGame);
    setGameSequence(sequenceArr);
    setMainType(MainTab.gameTab);    
    console.log(`Победная комбинация:
    ${sequenceArr.map((item) => arrSorted[item].potion.color).join("-")}`)   
  };
  //Говорить с ведьмой в начальном меню
  const handleTalk = () => {
    ShowMessage(messageTypes.talk);
  };
  //Кликать на ведьму
  const handleWitchClick = () => {
    ShowMessage(messageTypes.witchClick);
  };
  //Выйти из меню игры в начальное меню
  const handleBackToWelcome = () => {
    if (mainType !== MainTab.welcomeTab) {
      setMainType(MainTab.welcomeTab);
      ShowMessage(messageTypes.returnToWelcome);
    }
  };
  //Внутрянка показа сообщений
  const updateMessage = async (firstMsg = false) => {
    const [delay, spaceDelay, dotDelay, nextMsgDelay] = [20, 100, 300, 2000];

    if (!firstMsg && !isUpdateMessage) {
      return;
    }
    setIsUpdateMessage(true);
    if (message.current.length === 0) {
      setIsUpdateMessage(false);
      return;
    }
    const char = message.current[0].slice(0, 1);
    setShovedMessage((prev) => prev + char);
    if (char === " ") {
      await sleep(spaceDelay);
    } else if (char === ".") {
      await sleep(dotDelay);
    } else {
      await sleep(delay);
    }
    if (message.current.length === 1 && message.current[0].length === 0) {
      setIsUpdateMessage(false);
      return;
    }
    if (message.current.length > 1 && message.current[0].length === 0) {
      message.current.splice(0, 1);
      await sleep(nextMsgDelay);
      setShovedMessage("");
    }
    message.current[0] = message.current[0].slice(1);
    updateMessage(true);
  };
  //Выиграли игру
  const resultWinGame = () => {
    setMainType(MainTab.gameTabGameEnded);
    ShowMessage(messageTypes.win);
  };
  //Проиграли игру
  const resultLoseGame = () => {
    setMainType(MainTab.gameTabGameEnded);
    ShowMessage(messageTypes.lose);
  };

  return (
    <Box
      boxSizing="border-box"
      className="App"
      ml="auto"
      mr="auto"
      mt={4}
      width="80%"
      h="80%"
    >
      <Grid
        w="100%"
        h="100%"
        justifyContent="space-between"
        gridTemplateRows={["50px 1fr","1fr"]}
        gridTemplateColumns={["1fr","max(33%, 120px) 1fr"]}
        templateAreas={["witch", "main","witch main"]
          }
      >
        <Witch witchClick={handleWitchClick} />
        <Mainfield
          potionAttempts={potionAttempts}
          potionPlaces={potionPlaces}
          startGame={handleStartGame}
          checkSequence={handleCheckSequence}
          moveOnDrag={handleMoveOnDrag}
          mainType={mainType}
          message={shovedMessage}
          talk={handleTalk}
          backToWelcome={handleBackToWelcome}
        />
      </Grid>
      <Box
        zIndex={-100}
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        w="100vw"
        h="120vh"
        background={"#3b0069"}
      />
    </Box>
  );
};
