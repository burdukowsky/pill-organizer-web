import {Pill} from './pill';

export interface Place {
  id: number;
  name: string;
  description: string;
  pills: Array<Pill>;
}

export function createEmptyPlace(): Place {
  return {id: null, name: null, description: null, pills: []};
}
