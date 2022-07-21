export interface PickedNumbers {
  primaryNumbers: number[],
  secondaryNumbers?: number[]
}

export interface Combination {
  lottoName?: string;
  dateAdded: string;
  pickedNumbers: PickedNumbers;
}

export interface CombinationPayload {
  lottoName?: string;
  dateAdded: string;
  pickedNumbers: string;
}
