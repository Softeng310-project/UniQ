import { IUserCartItem } from "@/models/User";

export function serializeCartItem(item: IUserCartItem): IUserCartItem {
  return {
    id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    category: item.category,
    degree: item.degree,
    condition: item.condition,
    description: item.description,
  };
}

export function serializeCartItems(items: IUserCartItem[]): IUserCartItem[] {
  return items.map((item) => serializeCartItem(item));
}
