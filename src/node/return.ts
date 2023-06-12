import { StObject, SymbolTable } from "../table/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class Return
  extends InterpreterNode<null, [Evaluable<StObject>]>
  implements Evaluable<StObject>
{
  constructor(returnValue: Evaluable<StObject>) {
    super(null, [returnValue]);
  }

  evaluate(st: SymbolTable): StObject {
    return this.children[0].evaluate(st);
  }
}
