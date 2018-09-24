export interface Pill {
  id: number;
  name: string;
  description: string;
}

export function createEmptyPill(): Pill {
  return {id: null, name: '', description: ''};
}
