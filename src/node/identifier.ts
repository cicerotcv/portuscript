import { StObject, st } from "../table/symbol-table";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class Identifier
  extends InterpreterNode<string, []>
  implements Evaluable<StObject<"number">>
{
  constructor(value: string) {
    super(value, []);
  }

  evaluate(): StObject<"number"> {
    return st.get(this.value);
  }
}
