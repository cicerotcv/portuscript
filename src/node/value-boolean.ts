import { StObject } from "../table/symbol-table";
import { ReservedValues } from "../types/reserved-values";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class BooleanVal
  extends InterpreterNode<string, []>
  implements Evaluable<StObject<string>>
{
  constructor(value: string) {
    super(value, []);
  }

  evaluate(): StObject<string> {
    return { type: "boolean", value: this.value };
  }

  static toBoolean(value: string | number) {
    if (String(value) === ReservedValues.boolean.verdadeiro) return true;
    if (String(value) === ReservedValues.boolean.falso) return false;

    return Boolean(value);
  }
}
