import {Entity, hasMany, model, property} from '@loopback/repository';
import {Userss} from './userss.model';

@model()
export class Roles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  key: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Userss, {keyTo: 'role'})
  usersses: Userss[];

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
