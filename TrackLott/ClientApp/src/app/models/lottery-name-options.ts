export interface LotteryNameOptions {
  name: string,
  biggest: number,
  standard: number,
  allowed: number,
  jackpot?: number
}

export interface AvailableLotteries {
  monday_lotto: LotteryNameOptions,
  oz_lotto: LotteryNameOptions,
  wednesday_lotto: LotteryNameOptions,
  powerball: LotteryNameOptions,
  tatts_lotto: LotteryNameOptions
}
