export interface GameSpec {
  name: string,
  standard: number,
  allowed: number,
  biggest: number,
  primaryNumbers: number[],
  secondaryNumbers?: number[]
}

export interface LottoGame {
  generic: GameSpec,
  monWedLotto: GameSpec,
  ozLotto: GameSpec,
  powerball: GameSpec,
  tattsLotto: GameSpec,
  setForLife744: GameSpec,
  super66: GameSpec
}
