import { SymbolTableOutput, st } from "../symboltable/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class Identifier
  extends InterpreterNode<string, []>
  implements Evaluable<number>
{
  constructor(value: string) {
    super(value, []);
  }

  evaluate(): number {
    return st.get(this.value).value as number;
  }
}
