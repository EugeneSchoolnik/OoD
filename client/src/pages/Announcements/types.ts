import type { estateType } from "../EstateObjects/types";

export interface IAnnouncement {
  id: string;
  id_object: string;
  id_customer: string;
  type: estateType;
  area: number;
  price: number;
  status: boolean;
  date: string;
}
