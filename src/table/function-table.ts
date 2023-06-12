import { FuncDec } from "../node/declaration-function";

export class FunctionTable {
  private table: Record<string, FuncDec>;

  constructor() {
    this.table = {};
  }

  private ensureDeclared(name: string) {
    if (Object.keys(this.table).includes(name)) return;

    throw new Error(`Identifier '${name}' not declared.`);
  }

  private ensureNotDeclared(name: string) {
    if (!Object.keys(this.table).includes(name)) return;

    throw new Error(`Identifier '${name}' is already declared.`);
  }

  declare({ name, ref }: { name: string; ref: FuncDec }) {
    this.ensureNotDeclared(name);
    this.table[name] = ref;
  }

  get(name: string) {
    this.ensureDeclared(name);
    return this.table[name] as FuncDec;
  }

  clear() {
    this.table = {};
  }
}

export const ft = new FunctionTable();
