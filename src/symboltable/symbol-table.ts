import { ReservedValues } from "../types/reserved-values";

// type ValueProperties<Value = string | number | undefined> = {
//   type: string;
//   value: Value;
//   isMutable: boolean;
// };

type ValueProperties<Value = "string" | "number" | "boolean"> = {
  isMutable: boolean;
} & {
  type: Value;
  value: string | number;
};

export type StObject<Value = "string" | "number" | "boolean"> = Omit<
  ValueProperties<Value>,
  "isMutable"
>;

export class SymbolTable {
  private table: Record<string, ValueProperties>;

  constructor() {
    this.table = {};
  }

  private ensureDeclared(name: string) {
    if (!Object.keys(this.table).includes(name)) {
      console.table(
        Object.entries(this.table).map(([name, value]) => ({ name, ...value }))
      );
      throw new Error(`Identifier '${name}' not declared.`);
    }
  }

  private ensureMutable(name: string) {
    if (!this.table[name]?.isMutable)
      throw new Error(`Identifier '${name}' is not mutable.`);
  }

  private ensureNotDeclared(name: string) {
    if (Object.keys(this.table).includes(name))
      throw new Error(`Identifier '${name}' is already declared.`);
  }

  declare({ name, ...props }: { name: string } & ValueProperties) {
    this.ensureNotDeclared(name);
    Object.assign(this.table, { [name]: { ...props } });
  }

  set(name: string, type: string, value: ValueProperties["value"]) {
    this.ensureDeclared(name);
    this.ensureMutable(name);

    Object.assign(this.table[name]!, { type, value });
  }

  get<Value = "string" | "number" | "boolean">(name: string) {
    this.ensureDeclared(name);

    const { type, value } = this.table[name]!;
    return { type, value } as StObject<Value>;
  }

  clear() {
    this.table = {};
  }
}

export const st = new SymbolTable();
