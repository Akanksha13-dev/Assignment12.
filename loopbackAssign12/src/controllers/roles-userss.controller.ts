import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Roles,
  Userss
} from '../models';
import {RolesRepository} from '../repositories';

export class RolesUserssController {
  constructor(
    @repository(RolesRepository) protected rolesRepository: RolesRepository,
  ) { }

  @get('/roles/{id}/usersses', {
    responses: {
      '200': {
        description: 'Array of Roles has many Userss',
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
    return this.rolesRepository.usersses(id).find(filter);
  }

  @post('/roles/{id}/usersses', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userss)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Roles.prototype.key,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userss, {
            title: 'NewUserssInRoles',
            exclude: ['id'],
            optional: ['role']
          }),
        },
      },
    }) userss: Omit<Userss, 'id'>,
  ): Promise<Userss> {
    return this.rolesRepository.usersses(id).create(userss);
  }

  @patch('/roles/{id}/usersses', {
    responses: {
      '200': {
        description: 'Roles.Userss PATCH success count',
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
    return this.rolesRepository.usersses(id).patch(userss, where);
  }

  @del('/roles/{id}/usersses', {
    responses: {
      '200': {
        description: 'Roles.Userss DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Userss)) where?: Where<Userss>,
  ): Promise<Count> {
    return this.rolesRepository.usersses(id).delete(where);
  }
}
