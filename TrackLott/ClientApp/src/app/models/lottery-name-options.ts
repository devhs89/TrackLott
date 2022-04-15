export interface LotteryNameOptions {
  name: string,
  standard: number,
  allowed: number,
  biggest: number,
  mainNums: number[],
  suppNums?: [number?, number?]
}

export interface AvailableLotteries {
  mondayLotto: LotteryNameOptions,
  ozLotto: LotteryNameOptions,
  wednesdayLotto: LotteryNameOptions,
  powerball: LotteryNameOptions,
  tattsLotto: LotteryNameOptions
}
