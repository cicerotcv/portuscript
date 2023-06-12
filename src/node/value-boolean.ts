import { Evaluable, InterpreterNode } from "./interpreter-node";

export class BooleanVal
  extends InterpreterNode<boolean, []>
  implements Evaluable<boolean>
{
  constructor(value: boolean) {
    super(value, []);
  }

  evaluate(): boolean {
    return this.value;
  }
}
