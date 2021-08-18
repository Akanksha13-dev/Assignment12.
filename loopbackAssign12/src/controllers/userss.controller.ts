import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Userss} from '../models';
import {UserssRepository} from '../repositories';

export class UserssController {
  constructor(
    @repository(UserssRepository)
    public userssRepository : UserssRepository,
  ) {}

  @post('/usersses')
  @response(200, {
    description: 'Userss model instance',
    content: {'application/json': {schema: getModelSchemaRef(Userss)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userss, {
            title: 'NewUserss',

          }),
        },
      },
    })
    userss: Userss,
  ): Promise<Userss> {
    return this.userssRepository.create(userss);
  }

  @get('/usersses/count')
  @response(200, {
    description: 'Userss model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Userss) where?: Where<Userss>,
  ): Promise<Count> {
    return this.userssRepository.count(where);
  }

  @get('/usersses')
  @response(200, {
    description: 'Array of Userss model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Userss, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Userss) filter?: Filter<Userss>,
  ): Promise<Userss[]> {
    return this.userssRepository.find({include:['customers','roles']});
  }

  @patch('/usersses')
  @response(200, {
    description: 'Userss PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userss, {partial: true}),
        },
      },
    })
    userss: Userss,
    @param.where(Userss) where?: Where<Userss>,
  ): Promise<Count> {
    return this.userssRepository.updateAll(userss, where);
  }

  @get('/usersses/{id}')
  @response(200, {
    description: 'Userss model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Userss, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Userss, {exclude: 'where'}) filter?: FilterExcludingWhere<Userss>
  ): Promise<Userss> {
    return this.userssRepository.findById(id,{include:['customers','roles']});
  }

  @patch('/usersses/{id}')
  @response(204, {
    description: 'Userss PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userss, {partial: true}),
        },
      },
    })
    userss: Userss,
  ): Promise<void> {
    return this.userssRepository.updateById(id, userss);
  }

  @put('/usersses/{id}')
  @response(204, {
    description: 'Userss PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userss: Userss,
  ): Promise<void> {
    await this.userssRepository.replaceById(id, userss);
  }

  @del('/usersses/{id}')
  @response(204, {
    description: 'Userss DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userssRepository.deleteById(id);
  }
}
