import { Evaluable, InterpreterNode } from "./interpreter-node";

export class Block
  extends InterpreterNode<null, Evaluable<any>[]>
  implements Evaluable<any>
{
  constructor(children: Evaluable<any>[]) {
    super(null, children);
  }

  evaluate() {
    this.children.forEach((child) => child.evaluate());
  }
}
