import { StObject, SymbolTable } from "../table/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class IntVal
  extends InterpreterNode<number, []>
  implements Evaluable<StObject<"number">>
{
  constructor(value: number) {
    super(value, []);
  }

  evaluate(st: SymbolTable): StObject<"number"> {
    return {
      type: "number",
      value: this.value,
    };
  }
}
