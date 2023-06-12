import { config } from "../config";
import { StObject, SymbolTable } from "../table/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class Print
  extends InterpreterNode<null, Evaluable<StObject>[]>
  implements Evaluable<void>
{
  constructor(children: Evaluable<StObject>[]) {
    super(null, children);
  }

  evaluate(st: SymbolTable) {
    config.print(
      this.children.map((child) => child.evaluate(st).value).join(" ")
    );
  }
}
