import type { FindOptionsRelations, FindOptionsWhere } from 'typeorm';

import type { OrderPaginate } from '@/shared/utils/enums';

export interface PaginateOptions<Entity> {
  initialPage?: number;
  offset?: number;
  order?: OrderPaginate;
  where: FindOptionsWhere<Entity> | Array<FindOptionsWhere<Entity>>;
  relations?: FindOptionsRelations<Entity>;
}

export interface PaginateResponse<Entity> {
  data: Entity[];
  count: number;
}

export interface QueryParamsPaginate {
  initialPage: number;
  offset: number;
  order: OrderPaginate;
}

export interface QueryData {
  initial_page: string;
  offset: string;
  order: string;
}
