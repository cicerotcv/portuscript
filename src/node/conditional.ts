import { StObject } from "../table/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";
import { BooleanVal } from "./value-boolean";

export class Conditional
  extends InterpreterNode<
    null,
    [Evaluable<StObject>, Evaluable<any>, Evaluable<StObject>]
  >
  implements Evaluable<void>
{
  constructor(
    condition: Evaluable<StObject>,
    effect: Evaluable<any>,
    fallback: Evaluable<StObject>
  ) {
    super(null, [condition, effect, fallback]);
  }

  evaluate() {
    const [conditionNode, effectNode, fallbackNode] = this.children;

    if (BooleanVal.toBoolean(conditionNode.evaluate().value))
      effectNode.evaluate();
    else fallbackNode.evaluate();
  }
}
