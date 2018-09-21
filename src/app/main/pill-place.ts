import {Pill, createEmptyPill} from './pill';
import {Place, createEmptyPlace} from './place';

export class PillPlace {
  pill: Pill;
  place: Place;

  constructor(pill: Pill, place: Place) {
    this.pill = pill;
    this.place = place;
  }
}

export function createEmptyPillPlace(): PillPlace {
  return new PillPlace(createEmptyPill(), createEmptyPlace());
}
