import { StObject } from "../symboltable/symbol-table";
import { Operations } from "../types/operations";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class UnOp
  extends InterpreterNode<string, [Evaluable<StObject<"number">>]>
  implements Evaluable<StObject<"number">>
{
  constructor(value: string, child: Evaluable<StObject<"number">>) {
    super(value, [child]);
  }

  get child() {
    return this.children[0];
  }

  evaluate(): StObject<"number"> {
    const child = this.child.evaluate();

    if (this.value === Operations.plus)
      return { type: "number", value: child.value };
    if (this.value === Operations.minus)
      return { type: "number", value: -child.value };

    throw new Error(`Unknown unary operator "${this.value}"`);
  }
}
