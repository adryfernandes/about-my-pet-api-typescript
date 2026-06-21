import type {
  FindOptionsOrder,
  Repository,
  ObjectLiteral,
  FindOptionsWhere,
  FindOptionsRelations,
} from 'typeorm';

import { OrderPaginate } from './enums';

import type {
  PaginateOptions,
  PaginateResponse,
  QueryData,
  QueryParamsPaginate,
} from '@/shared/interfaces/PaginateInterface';
import type { EntityDefault } from '@/shared/types/paginateType';
import { Timestamp } from '@/database/entities/extendings/timestamp';

export class Paginate<Entity extends Timestamp & ObjectLiteral> {
  private readonly initialPage: number;
  private readonly offset: number;
  private readonly order: OrderPaginate;
  private readonly where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[];
  private readonly relations: FindOptionsRelations<Entity>;

  constructor(
    private readonly repository: Repository<Entity>,
    private readonly options: PaginateOptions<Entity>,
  ) {
    this.initialPage = options.initialPage ?? 1;
    this.offset = options.offset ?? 10;
    this.order = options.order ?? OrderPaginate.DESC;
    this.where = options.where;
    this.relations = options.relations ?? {};
  }

  static handleQueryParams(query: Partial<QueryData>): QueryParamsPaginate {
    const initialPage = Number(query.initial_page ?? 1);
    const offset = Number(query.offset ?? 10);

    const orderRaw = query.order?.toUpperCase();

    const order =
      orderRaw && orderRaw in OrderPaginate ? (OrderPaginate as any)[orderRaw] : OrderPaginate.ASC;

    return {
      initialPage,
      offset,
      order,
    };
  }

  async orderBy(
    orderBy?: FindOptionsOrder<EntityDefault<Entity>>,
  ): Promise<PaginateResponse<Entity>> {
    const finalOrder =
      orderBy && Object.keys(orderBy).length > 0
        ? orderBy
        : {
            updatedAt: this.order,
          };

    return this.paginate(finalOrder as FindOptionsOrder<EntityDefault<Entity>>);
  }

  private async paginate(orderBy: FindOptionsOrder<Entity>): Promise<PaginateResponse<Entity>> {
    const skip = (this.initialPage - 1) * this.offset;

    const [data, count] = await this.repository.findAndCount({
      where: this.where,
      relations: this.relations,
      order: orderBy,
      skip,
      take: this.offset,
    });

    return { data, count };
  }
}
