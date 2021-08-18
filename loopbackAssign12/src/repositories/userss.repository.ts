import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Userss, UserssRelations, Customers, Roles} from '../models';
import {CustomersRepository} from './customers.repository';
import {RolesRepository} from './roles.repository';

export class UserssRepository extends DefaultCrudRepository<
  Userss,
  typeof Userss.prototype.id,
  UserssRelations
> {

  public readonly customers: BelongsToAccessor<Customers, typeof Userss.prototype.id>;

  public readonly roles: BelongsToAccessor<Roles, typeof Userss.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Userss, dataSource);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.customers = this.createBelongsToAccessorFor('customers', customersRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
