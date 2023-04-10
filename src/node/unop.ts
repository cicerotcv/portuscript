import { Operations } from "../types/operations";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class UnOp
  extends InterpreterNode<string, [Evaluable<number>]>
  implements Evaluable<number>
{
  constructor(value: string, child: Evaluable<number>) {
    super(value, [child]);
  }

  get child() {
    return this.children[0];
  }

  evaluate(): number {
    if (this.value === Operations.plus) return this.child.evaluate();
    if (this.value === Operations.minus) return -this.child.evaluate();

    throw new Error(`Unknown unary operator "${this.value}"`);
  }
}
