import { st } from "../symboltable/symbol-table";
import { Identifier } from "./identifier";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class ConstDec
  extends InterpreterNode<null, [Identifier, Evaluable<any>]>
  implements Evaluable<void>
{
  constructor(identifier: Identifier, value: Evaluable<any>) {
    super(null, [identifier, value]);
  }

  evaluate() {
    const [identifier, valueNode] = this.children;
    const value = valueNode.evaluate();

    st.declare({
      name: identifier.value,
      isMutable: false,
      type: typeof value,
      value: value,
    });
  }
}