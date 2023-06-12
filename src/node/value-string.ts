import { StObject } from "../table/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class StringVal
  extends InterpreterNode<string, []>
  implements Evaluable<StObject<"string">>
{
  constructor(value: string) {
    super(value, []);
  }

  evaluate(): StObject<"string"> {
    return {
      type: "string",
      value: this.value,
    };
  }
}
