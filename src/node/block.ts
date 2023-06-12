import { StObject, SymbolTable } from "../table/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";
import { Return } from "./return";
import { UndefinedVal } from "./value-undefined";

export class Block
  extends InterpreterNode<null, Evaluable<any>[]>
  implements Evaluable<any>
{
  constructor(children: Evaluable<any>[]) {
    super(null, children);
  }

  evaluate(st: SymbolTable): StObject | undefined {
    for (const child of this.children) {
      const value = child.evaluate(st);
      if (value) return value;
    }
  }
}
