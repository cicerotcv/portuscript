import { StObject, SymbolTable } from "../table/symbol-table";
import { Identifier } from "./identifier";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class VarDec
  extends InterpreterNode<null, [Identifier, Evaluable<StObject>]>
  implements Evaluable<void>
{
  constructor(identifier: Identifier, value: Evaluable<StObject>) {
    super(null, [identifier, value]);
  }

  evaluate(st: SymbolTable) {
    const [identifier, valueNode] = this.children;
    const node = valueNode.evaluate(st);

    st.declare({
      name: identifier.value,
      isMutable: true,
      type: node.type,
      value: node.value,
    });
  }
}
