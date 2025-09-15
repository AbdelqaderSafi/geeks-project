import { IBaseData, IBaseRepo } from "./types";

export default class baseRepo<T extends IBaseData> implements IBaseRepo<T> {
  private items: T[];
  private idCounter: number;

  constructor(items: T[]) {
    this.items = items;
    this.idCounter = items.length;
  }
  create(data: Omit<T, keyof IBaseData>) {
    const firstLetter = this.items[0]?.id.charAt(0) || "i";
    const newItem: T = {
      ...data,
      id: String(firstLetter + ++this.idCounter),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as T;

    this.items.push(newItem);
    return newItem;
  }

  findAll() {
    return this.items;
  }

  findById(id: IBaseData["id"]) {
    const userIndex = this.items.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;

    return this.items.find((item) => item.id === id);
  }

  findBy<K extends keyof T>(propName: K, propValue: T[K]) {
    return this.items.find((item) => item[propName] === propValue);
  }

  delete(id: IBaseData["id"]) {
    const userIndex = this.items.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;

    const allItems: T[] = this.items.filter((item) => item.id !== id);
    this.items = allItems;
    return true;
  }

  update(id: IBaseData["id"], data: Partial<T>) {
    const userIndex = this.items.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;

    const newUser: T = { ...this.items[userIndex], ...data } as T;
    this.items[userIndex] = newUser;
    return this.items[userIndex];
  }
}
