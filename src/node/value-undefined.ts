import { StObject, SymbolTable } from "../table/symbol-table";
import { ReservedValues } from "../types/reserved-values";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class UndefinedVal
  extends InterpreterNode<string, []>
  implements Evaluable<StObject<"indefinido">>
{
  constructor() {
    super(ReservedValues.indefinido, []);
  }

  evaluate(st: SymbolTable): StObject<"indefinido"> {
    return {
      type: "indefinido",
      value: this.value,
    };
  }
}
