import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Customers, CustomersRelations, Userss} from '../models';
import {UserssRepository} from './userss.repository';

export class CustomersRepository extends DefaultCrudRepository<
  Customers,
  typeof Customers.prototype.id,
  CustomersRelations
> {

  public readonly usersses: HasManyRepositoryFactory<Userss, typeof Customers.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UserssRepository') protected userssRepositoryGetter: Getter<UserssRepository>,
  ) {
    super(Customers, dataSource);
    this.usersses = this.createHasManyRepositoryFactoryFor('usersses', userssRepositoryGetter,);
    this.registerInclusionResolver('usersses', this.usersses.inclusionResolver);
  }
}
