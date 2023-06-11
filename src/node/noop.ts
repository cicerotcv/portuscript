import { Evaluable, InterpreterNode } from "./interpreter-node";

export class NoOp extends InterpreterNode<null, []> implements Evaluable<void> {
  constructor() {
    super(null, []);
  }

  evaluate(): void {}
}
