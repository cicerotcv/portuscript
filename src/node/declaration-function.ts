import { ft } from "../table/function-table";
import { Block } from "./block";
import { VarDec } from "./declaration-variable";
import { Identifier } from "./identifier";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class FuncDec
  extends InterpreterNode<null, [Identifier, VarDec[], Block]>
  implements Evaluable<void>
{
  constructor(
    identifier: Identifier,
    parameters: VarDec[],
    functionBody: Block
  ) {
    super(null, [identifier, parameters ?? [], functionBody]);
  }

  evaluate() {
    const [identifier] = this.children;
    ft.declare({
      name: identifier.value,
      ref: this,
    });
  }
}
