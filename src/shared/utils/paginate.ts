import type { FindOptionsOrder, Repository, FindOptionsWhere, FindOptionsRelations } from 'typeorm';

import { OrderPaginate } from './enums';
import { isEnumValue } from './isEnumValue';

import type { DefaultEntity } from '@/shared/interfaces/DefaultEntity';
import type {
  PaginateOptions,
  PaginateResponse,
  QueryData,
  QueryParamsPaginate,
} from '@/shared/interfaces/PaginateInterface';

const DEFAULT_PAGE = 1;
const DEFAULT_OFFSET = 10;
const PAGE_OFFSET_START = 1;

export class Paginate<Entity extends DefaultEntity> {
  private readonly initialPage: number;
  private readonly offset: number;
  private readonly where: FindOptionsWhere<Entity> | Array<FindOptionsWhere<Entity>>;
  private readonly relations: FindOptionsRelations<Entity>;

  constructor(
    private readonly repository: Repository<Entity>,
    options: PaginateOptions<Entity>,
  ) {
    const { initialPage = DEFAULT_PAGE, offset = DEFAULT_OFFSET, where, relations = {} } = options;

    this.initialPage = initialPage;
    this.offset = offset;
    this.where = where;
    this.relations = relations;
  }

  static handleQueryParams(query: Partial<QueryData>): QueryParamsPaginate {
    const initialPage = Number(query.initial_page ?? DEFAULT_PAGE);
    const offset = Number(query.offset ?? DEFAULT_OFFSET);

    const orderRaw = query.order?.toUpperCase() ?? '';
    const order = isEnumValue(OrderPaginate, orderRaw) ? orderRaw : OrderPaginate.ASC;

    return { initialPage, offset, order };
  }

  async orderBy(orderBy: FindOptionsOrder<Entity>): Promise<PaginateResponse<Entity>> {
    return await this.paginate(orderBy);
  }

  private async paginate(orderBy: FindOptionsOrder<Entity>): Promise<PaginateResponse<Entity>> {
    const skip = (this.initialPage - PAGE_OFFSET_START) * this.offset;

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
