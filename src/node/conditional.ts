import { StObject, SymbolTable } from "../table/symbol-table";
import { Block } from "./block";
import { Evaluable, InterpreterNode } from "./interpreter-node";
import { NoOp } from "./noop";
import { BooleanVal } from "./value-boolean";

export class Conditional
  extends InterpreterNode<null, [Evaluable<StObject>, Block, Evaluable<any>]>
  implements Evaluable<void>
{
  constructor(
    condition: Evaluable<StObject>,
    effect: Block,
    fallback: Evaluable<any>
  ) {
    super(null, [condition, effect, fallback]);
  }

  evaluate(st: SymbolTable) {
    const [conditionNode, effectNode, fallbackNode] = this.children;

    if (BooleanVal.toBoolean(conditionNode.evaluate(st).value)) {
      return effectNode.evaluate(st);
    }
    return fallbackNode.evaluate(st);
  }
}
