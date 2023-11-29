import type { OrderPaginate } from '@/utils/enums';

// Retorno para paginação
export interface PaginateResponse<Entity> {
  data: Entity[];
  count: number;
}

// Parametro da requisição para a paginação
export interface QueryParamsPaginate {
  initialPage: number;
  offset: number;
  order: OrderPaginate;
}

// Queries enviadas para paginação
export interface QueryData {
  initial_page: string;
  offset: string;
  order: string;
}
