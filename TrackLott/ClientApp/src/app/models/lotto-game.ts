export interface GameSpecs {
  name: string,
  standard: number,
  allowed: number,
  biggest: number,
  primaryNumbers: number[],
  secondaryNumbers?: number[]
}

export interface LottoGame {
  generic: GameSpecs,
  monWedLotto: GameSpecs,
  ozLotto: GameSpecs,
  powerball: GameSpecs,
  tattsLotto: GameSpecs,
  setForLife744: GameSpecs,
  super66: GameSpecs
}
