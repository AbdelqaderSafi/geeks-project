export interface IBaseData {
  id: string;
  updatedAt: Date;
  createdAt: Date;
}
export interface IBaseRepo<T extends IBaseData> {
  create: (data: Omit<T, "id" | "createdAt" | "updatedAt">) => T;
  findAll: () => T[];
  findById: (id: IBaseData["id"]) => T | undefined;
  findBy: <K extends keyof T>(propName: K, propValue: T[K]) => T | undefined;
  update: (id: IBaseData["id"], data: Partial<T>) => T | undefined;
  delete: (id: IBaseData["id"]) => void;
}
