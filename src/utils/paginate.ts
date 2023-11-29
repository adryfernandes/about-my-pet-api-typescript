import type { FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';

import { OrderPaginate } from './enums';

import type { EntityDefault } from '@/types/paginate.type';

import type {
  PaginateResponse,
  QueryData,
  QueryParamsPaginate,
} from '@/interfaces/paginate.interface';

/**
 * Faz a paginação da lista a partir da atualização do item
 * @param repository
 * @param initialPage
 * @param offset
 * @param order
 */

export class Paginate<Entity> {
  constructor(
    private repository: Repository<Entity>,
    private initialPage: number = 1,
    private offset: number = 10,
    private order: OrderPaginate = OrderPaginate.DESC,
    private where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
    private relations: FindOptionsRelations<Entity> = {}
  ) {}

  /**
   * Formata a query de um jeito padrão
   * @param query - query vinda da requisição
   * @returns
   */
  static handleQueryParams(query: Partial<QueryData>): QueryParamsPaginate {
    const initialPage = query.initial_page;
    const offset = query.offset;
    const order = query.order;

    const queryParams: QueryParamsPaginate = {
      initialPage: parseInt(initialPage) || 1,
      offset: parseInt(offset) || 10,
      order: OrderPaginate[order?.toUpperCase()] || OrderPaginate.ASC,
    };

    return queryParams;
  }

  /**
   * Lista por ordem da data de atualização
   * @returns
   */
  async byUpdatedAt(): Promise<PaginateResponse<Entity>> {
    const { order } = this;

    const orderBy = { timestamp: { updatedAt: order } } as FindOptionsOrder<EntityDefault<Entity>>;
    const result = await this.paginate(orderBy);

    return result;
  }

  /**
   * Ordena pelo item escolhildo
   * @param orderBy - campo que será ordenada
   * @returns
   */
  async orderBy(
    orderBy?: FindOptionsOrder<EntityDefault<Entity>>
  ): Promise<PaginateResponse<Entity>> {
    const { order } = this;

    if (!(orderBy || (orderBy && Object.keys(orderBy).length))) {
      orderBy = { timestamp: { createdAt: order } } as FindOptionsOrder<EntityDefault<Entity>>;
    }

    const result = await this.paginate(orderBy);

    return result;
  }

  /**
   * Pagina ordenando pela coluna escolhida
   * @param orderBy
   * @returns
   */
  private async paginate(orderBy: FindOptionsOrder<Entity>): Promise<PaginateResponse<Entity>> {
    const { repository, initialPage, offset, where, relations } = this;

    // Número de itens que a consulta irá pular para iniciar a paginação
    const skip: number = (initialPage - 1) * offset;

    const [data, count]: [Entity[], number] = await repository.findAndCount({
      where,
      relations,
      order: orderBy,
      skip,
      take: offset,
    });

    return <PaginateResponse<Entity>>{ data, count };
  }
}
