import { Evaluable, InterpreterNode } from "./interpreter-node";

export class IntVal
  extends InterpreterNode<number, []>
  implements Evaluable<number>
{
  constructor(value: number) {
    super(value, []);
  }

  evaluate(): number {
    return this.value;
  }
}
