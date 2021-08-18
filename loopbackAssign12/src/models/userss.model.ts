import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Customers} from './customers.model';
import {Roles} from './roles.model';

@model()
export class Userss extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name:'firstname',
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    name:'middlename',
  })
  middleName: string;

  @property({
    type: 'string',
    required: true,
    name:'lastname',
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    name:'email',
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    name:'phonenumber',
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
    name:'address',
  })
  address: string;

  @property({
    type: 'date',
    required: true,
    datetime:'datetime',
  })
  datetime: string;

  @belongsTo(() => Customers)
  customersId: number;

  @belongsTo(() => Roles, {name: 'roles'})
  role: number;

  constructor(data?: Partial<Userss>) {
    super(data);
  }
}

export interface UserssRelations {
  // describe navigational properties here
}

export type UserssWithRelations = Userss & UserssRelations;
