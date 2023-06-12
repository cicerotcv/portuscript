type ValueTypes = "string" | "number" | "boolean" | "indefinido";

type ValueProperties<Value = ValueTypes> = {
  isMutable: boolean;
} & {
  type: Value;
  value: string | number;
};

export type StObject<Value = ValueTypes> = Omit<
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
    if (this.table[name]?.isMutable) return;

    throw new Error(`Identifier '${name}' is not mutable.`);
  }

  private ensureNotDeclared(name: string) {
    if (Object.keys(this.table).includes(name))
      throw new Error(`Identifier '${name}' is already declared.`);
  }

  declare({
    name,
    isMutable,
    type,
    value,
  }: { name: string } & ValueProperties) {
    this.ensureNotDeclared(name);
    this.table[name] = {
      isMutable,
      type,
      value,
    };
  }

  set(name: string, type: string, value: ValueProperties["value"]) {
    this.ensureDeclared(name);
    this.ensureMutable(name);

    Object.assign(this.table[name]!, { type, value });
  }

  get<Value = ValueTypes>(name: string) {
    this.ensureDeclared(name);

    const { type, value } = this.table[name]!;
    return { type, value } as StObject<Value>;
  }

  clear() {
    this.table = {};
  }

  show() {
    console.table(
      Object.entries(this.table).map(([name, props]) => ({ name, ...props }))
    );
  }
}

export const st = new SymbolTable();
