import { v4 as uuid } from "uuid";
import { hashPassword, comparePassword } from "../shared/hash.util";

export type WithBase = { id: string; createdAt: Date; updatedAt: Date };

export class BaseRepository<T extends WithBase> {
  protected items: T[] = [];
  // private idCounter = 1;
  constructor(private label?: string) {}
  findAll(): T[] {
    return this.items;
  }

  findById(id: string): T | undefined {
    return this.items.find((i) => i.id === id);
  }

  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): T {
    const now = new Date();
    const item = {
      ...data,
      id: uuid(),
      createdAt: now,
      updatedAt: now,
    } as T;
    // this.idCounter++;
    this.items.push(item);
    return item;
  }

  update(
    id: string,
    patch: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): T | null {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) return null;
    this.items[index] = {
      ...this.items[index],
      ...patch,
      updatedAt: new Date(),
    } as T;
    return this.items[index];
  }

  delete(id: string): boolean {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}
