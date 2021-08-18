import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Userss,
  Customers,
} from '../models';
import {UserssRepository} from '../repositories';

export class UserssCustomersController {
  constructor(
    @repository(UserssRepository)
    public userssRepository: UserssRepository,
  ) { }

  @get('/usersses/{id}/customers', {
    responses: {
      '200': {
        description: 'Customers belonging to Userss',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customers)},
          },
        },
      },
    },
  })
  async getCustomers(
    @param.path.number('id') id: typeof Userss.prototype.id,
  ): Promise<Customers> {
    return this.userssRepository.customers(id);
  }
}
