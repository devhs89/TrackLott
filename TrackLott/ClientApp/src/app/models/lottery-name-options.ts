export interface LotteryNameOptions {
  name: string,
  biggest: number,
  standard: number,
  allowed: number,
  jackpot?: number
}

export interface AvailableLotteries {
  mondayLotto: LotteryNameOptions,
  ozLotto: LotteryNameOptions,
  wednesdayLotto: LotteryNameOptions,
  powerball: LotteryNameOptions,
  tattsLotto: LotteryNameOptions
}
