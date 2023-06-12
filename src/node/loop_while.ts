import { StObject } from "../table/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";
import { BooleanVal } from "./value-boolean";

export class LoopWhile
  extends InterpreterNode<null, [Evaluable<StObject>, Evaluable<any>]>
  implements Evaluable<void>
{
  constructor(condition: Evaluable<StObject>, effect: Evaluable<any>) {
    super(null, [condition, effect]);
  }

  evaluate() {
    const [conditionNode, effectNode] = this.children;

    while (BooleanVal.toBoolean(conditionNode.evaluate().value))
      effectNode.evaluate();
  }
}
