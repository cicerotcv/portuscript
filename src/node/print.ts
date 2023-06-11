import { Evaluable, InterpreterNode } from "./interpreter-node";

export class Print
  extends InterpreterNode<null, Evaluable<any>[]>
  implements Evaluable<void>
{
  constructor(children: Evaluable<any>[]) {
    super(null, children);
  }

  evaluate() {
    console.log(this.children.map((child) => child.evaluate()).join(" "));
  }
}
