import {AvailableLotteries} from "../models/lottery-name-options";

export enum LottoNames {
  MONDAY_LOTTO = "Monday Lotto",
  OZ_LOTTO = "Oz Lotto",
  WEDNESDAY_LOTTO = "Wednesday Lotto",
  POWERBALL = "Powerball",
  TATTS_LOTTO = "Tatts Lotto"
}

export const allLottoNames: AvailableLotteries = {
  mondayLotto: {name: LottoNames.MONDAY_LOTTO, biggest: 45, standard: 6, allowed: 20, mainNums: []},
  ozLotto: {name: LottoNames.OZ_LOTTO, biggest: 45, standard: 7, allowed: 20, mainNums: []},
  wednesdayLotto: {name: LottoNames.WEDNESDAY_LOTTO, biggest: 45, standard: 6, allowed: 20, mainNums: []},
  powerball: {name: LottoNames.POWERBALL, biggest: 35, standard: 7, allowed: 20, mainNums: [], suppNums: []},
  tattsLotto: {name: LottoNames.TATTS_LOTTO, biggest: 45, standard: 6, allowed: 20, mainNums: []}
};
