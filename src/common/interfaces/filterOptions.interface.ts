import { ICondition } from 'src/posts/interface/condition.interface';

export interface IFilterOptions {
  categoryId?: number | undefined;
  priceCode?: string | undefined;
  areaCode?: string | undefined;
  condition?: ICondition;
}
