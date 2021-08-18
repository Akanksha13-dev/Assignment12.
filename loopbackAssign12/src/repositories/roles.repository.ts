import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Roles, RolesRelations, Userss} from '../models';
import {UserssRepository} from './userss.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.key,
  RolesRelations
> {

  public readonly usersses: HasManyRepositoryFactory<Userss, typeof Roles.prototype.key>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UserssRepository') protected userssRepositoryGetter: Getter<UserssRepository>,
  ) {
    super(Roles, dataSource);
    this.usersses = this.createHasManyRepositoryFactoryFor('usersses', userssRepositoryGetter,);
    this.registerInclusionResolver('usersses', this.usersses.inclusionResolver);
  }
}
