import { StObject, SymbolTable } from "../table/symbol-table";
import { Block } from "./block";
import { Evaluable, InterpreterNode } from "./interpreter-node";
import { Return } from "./return";
import { BooleanVal } from "./value-boolean";

export class LoopWhile
  extends InterpreterNode<null, [Evaluable<StObject>, Block]>
  implements Evaluable<void>
{
  constructor(condition: Evaluable<StObject>, effect: Block) {
    super(null, [condition, effect]);
  }

  evaluate(st: SymbolTable) {
    const [conditionNode, effectNode] = this.children;

    while (BooleanVal.toBoolean(conditionNode.evaluate(st).value)) {
      const value = effectNode.evaluate(st);
      if (value) return value;
    }
  }
}
