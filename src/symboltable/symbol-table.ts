type ValueProperties = {
  type: string;
  value: string | number | undefined;
  isMutable: boolean;
};

export type SymbolTableOutput = Omit<ValueProperties, "isMutable">;

export class SymbolTable {
  private table: Record<string, ValueProperties>;

  constructor() {
    this.table = {};
  }

  private ensureDeclared(name: string) {
    if (!Object.keys(this.table).includes(name))
      throw new Error(`Identifier '${name}' not declared.`);
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

  get(name: string): SymbolTableOutput {
    this.ensureDeclared(name);

    const { type, value } = this.table[name]!;
    return { type, value };
  }

  clear() {
    this.table = {};
  }
}

export const st = new SymbolTable();
