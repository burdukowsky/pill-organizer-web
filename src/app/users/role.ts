import {RoleEnum} from './role.enum';

export interface Role {
  name: RoleEnum;
}

export function getAllRoles(): Array<Role> {
  return [{name: RoleEnum.Admin}, {name: RoleEnum.Editor}, {name: RoleEnum.Viewer}];
}
