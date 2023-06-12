import { StObject } from "../symboltable/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class Print
  extends InterpreterNode<null, Evaluable<StObject>[]>
  implements Evaluable<void>
{
  constructor(children: Evaluable<StObject>[]) {
    super(null, children);
  }

  evaluate() {
    console.log(this.children.map((child) => child.evaluate().value).join(" "));
  }
}
