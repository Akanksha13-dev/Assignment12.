import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customers,
  Userss,
} from '../models';
import {CustomersRepository} from '../repositories';

export class CustomersUserssController {
  constructor(
    @repository(CustomersRepository) protected customersRepository: CustomersRepository,
  ) { }

  @get('/customers/{id}/usersses', {
    responses: {
      '200': {
        description: 'Array of Customers has many Userss',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Userss)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Userss>,
  ): Promise<Userss[]> {
    return this.customersRepository.usersses(id).find(filter);
  }

  @post('/customers/{id}/usersses', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userss)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customers.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userss, {
            title: 'NewUserssInCustomers',
            exclude: ['id'],
            optional: ['customersId']
          }),
        },
      },
    }) userss: Omit<Userss, 'id'>,
  ): Promise<Userss> {
    return this.customersRepository.usersses(id).create(userss);
  }

  @patch('/customers/{id}/usersses', {
    responses: {
      '200': {
        description: 'Customers.Userss PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userss, {partial: true}),
        },
      },
    })
    userss: Partial<Userss>,
    @param.query.object('where', getWhereSchemaFor(Userss)) where?: Where<Userss>,
  ): Promise<Count> {
    return this.customersRepository.usersses(id).patch(userss, where);
  }

  @del('/customers/{id}/usersses', {
    responses: {
      '200': {
        description: 'Customers.Userss DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Userss)) where?: Where<Userss>,
  ): Promise<Count> {
    return this.customersRepository.usersses(id).delete(where);
  }
}
