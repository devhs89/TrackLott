import {AvailableLotteries} from "../models/lottery-name-options";

export const lottoName: AvailableLotteries = {
  mondayLotto: {name: "Monday Lotto", biggest: 45, standard: 6, allowed: 20, mainNums: []},
  ozLotto: {name: "Oz Lotto", biggest: 45, standard: 7, allowed: 20, mainNums: []},
  wednesdayLotto: {name: "Wednesday Lotto", biggest: 45, standard: 6, allowed: 20, mainNums: []},
  powerball: {name: "Powerball", biggest: 35, standard: 7, allowed: 20, mainNums: [], jackpotNums: []},
  tattsLotto: {name: "Tatts Lotto", biggest: 45, standard: 6, allowed: 20, mainNums: []}
};
