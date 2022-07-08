import {LottoGame} from "../models/lotto-game";

export const lottoName = {
  genericId: "generic",
  genericDisplay: "Generic Lotto",
  monWedLottoId: "monWedLotto",
  monWedLottoDisplay: "Mon & Wed Lotto",
  ozLottoId: "ozLotto",
  ozLottoDisplay: "Oz Lotto",
  powerballId: "powerball",
  powerballDisplay: "Powerball",
  tattsLottoId: "tattsLotto",
  tattsLottoDisplay: "Tatts Lotto",
  setForLife744Id: "setForLife744",
  setForLife744Display: "Set For Life",
  super66Id: "super66",
  super66Display: "Super 66"
};

export const lottoSelectOption: LottoGame = {
  generic: {name: lottoName.genericDisplay, biggest: 45, standard: 6, allowed: 10, primaryNumbers: []},
  monWedLotto: {name: lottoName.monWedLottoDisplay, biggest: 45, standard: 6, allowed: 10, primaryNumbers: []},
  ozLotto: {name: lottoName.ozLottoDisplay, biggest: 47, standard: 7, allowed: 10, primaryNumbers: []},
  powerball: {
    name: lottoName.powerballDisplay,
    biggest: 35,
    standard: 7,
    allowed: 10,
    primaryNumbers: [],
    secondaryNumbers: []
  },
  tattsLotto: {name: lottoName.tattsLottoDisplay, biggest: 45, standard: 6, allowed: 10, primaryNumbers: []},
  setForLife744: {
    name: lottoName.setForLife744Display,
    biggest: 44,
    standard: 7,
    allowed: 7,
    primaryNumbers: []
  },
  super66: {name: lottoName.super66Display, biggest: 9, standard: 6, allowed: 6, primaryNumbers: []}
};
