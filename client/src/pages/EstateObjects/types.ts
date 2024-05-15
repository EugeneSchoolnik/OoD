export type estateType = "house" | "office" | "apartment" | "storage";

export interface IEstateObject {
  id: string;
  type: estateType;
  address: string;
  area: number;
  price: number;
}
