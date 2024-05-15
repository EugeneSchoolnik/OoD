import type { estateType } from "../EstateObjects/types";

export interface ICustomerRequest {
  id: string;
  id_customer: string;
  type: estateType;
  area: number;
  min_price: number;
  max_price: number;
}
