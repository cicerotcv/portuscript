import { st } from "../symboltable/symbol-table";
import { Operations } from "../types/operations";
import { Identifier } from "./identifier";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class Assignment
  extends InterpreterNode<null, [Identifier, Evaluable<unknown>]>
  implements Evaluable<void>
{
  // extends BaseNode implements InterpreterNode<number>
  constructor(identifier: Identifier, value: Evaluable<unknown>) {
    super(null, [identifier, value]);
  }

  evaluate() {
    const [identifier, valueNode] = this.children;

    const value = valueNode.evaluate() as string | number | undefined;

    st.set(identifier.value, typeof value, value);
  }
}
