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
  Roles,
} from '../models';
import {UserssRepository} from '../repositories';

export class UserssRolesController {
  constructor(
    @repository(UserssRepository)
    public userssRepository: UserssRepository,
  ) { }

  @get('/usersses/{id}/roles', {
    responses: {
      '200': {
        description: 'Roles belonging to Userss',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async getRoles(
    @param.path.number('id') id: typeof Userss.prototype.id,
  ): Promise<Roles> {
    return this.userssRepository.roles(id);
  }
}
