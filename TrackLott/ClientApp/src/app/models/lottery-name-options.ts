export interface LotteryNameOptions {
  name: string,
  standard: number,
  allowed: number,
  biggest?: number,
  mainNums?: number[],
}

export interface AvailableLotteries {
  mondayLotto: LotteryNameOptions,
  ozLotto: LotteryNameOptions,
  wednesdayLotto: LotteryNameOptions,
  powerball: LotteryNameOptions,
  tattsLotto: LotteryNameOptions
}
