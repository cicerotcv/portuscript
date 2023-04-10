import { Operations } from "../types/operations";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class BinOp
  extends InterpreterNode<string, [Evaluable<number>, Evaluable<number>]>
  implements Evaluable<number>
{
  // extends BaseNode implements InterpreterNode<number>
  constructor(value: string, children: [Evaluable<number>, Evaluable<number>]) {
    super(value, children);
  }

  evaluate() {
    const [left, right] = this.children;

    if (this.value === Operations.plus)
      return left.evaluate() + right.evaluate();

    if (this.value === Operations.minus)
      return left.evaluate() - right.evaluate();

    if (this.value === Operations.multi)
      return left.evaluate() * right.evaluate();

    if (this.value === Operations.div)
      return left.evaluate() / right.evaluate();

    throw new Error(
      `Unrecognized binary operation '${this.value}' between ${left} and ${right}`
    );
  }
}
