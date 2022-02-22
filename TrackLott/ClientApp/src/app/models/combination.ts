export interface PickedNumbers {
  mainNums: number[],
  jackpot: number
}

export interface Combination {
  lottoName?: string;
  dateAdded: Date;
  pickedNumbers: PickedNumbers[];
}
