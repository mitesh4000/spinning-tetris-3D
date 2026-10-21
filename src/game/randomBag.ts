import type { TetrominoType } from './constants';

const BAG: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

export class RandomBag {
  private bag: TetrominoType[] = [];

  private refill(): void {
    this.bag = [...BAG];
    // Fisher-Yates shuffle
    for (let i = this.bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
    }
  }

  next(): TetrominoType {
    if (this.bag.length === 0) this.refill();
    return this.bag.pop()!;
  }
}
