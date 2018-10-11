import {Role} from './role';

export interface User {
  id: number;
  username: string;
  password: string;
  roles: Array<Role>;
}

export function createEmptyUser(): User {
  return {id: null, username: '', password: '', roles: []};
}
