import { StObject, SymbolTable } from "../table/symbol-table";
import { Identifier } from "./identifier";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class Assignment
  extends InterpreterNode<null, [Identifier, Evaluable<StObject>]>
  implements Evaluable<void>
{
  // extends BaseNode implements InterpreterNode<number>
  constructor(identifier: Identifier, value: Evaluable<StObject>) {
    super(null, [identifier, value]);
  }

  evaluate(st: SymbolTable) {
    const [identifier, valueNode] = this.children;

    const value = valueNode.evaluate(st);

    st.set(identifier.value, value.type, value.value);
  }
}
