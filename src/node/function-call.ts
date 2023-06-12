import { ft } from "../table/function-table";
import { StObject, SymbolTable } from "../table/symbol-table";
import { VarDec } from "./declaration-variable";
import { Identifier } from "./identifier";
import { Evaluable, InterpreterNode } from "./interpreter-node";

export class FuncCall
  extends InterpreterNode<null, [Identifier, Evaluable<StObject>[]]>
  implements Evaluable<void>
{
  constructor(identifier: Identifier, args: Evaluable<StObject>[]) {
    super(null, [identifier, args]);
  }

  evaluate(st: SymbolTable) {
    const localSt = new SymbolTable();
    const [identifier, args] = this.children;

    const funcdec = ft.get(identifier.value);

    const [_, parameters, functionBody] = funcdec.children;

    if (parameters.length !== args.length)
      throw new Error(
        `Function '${identifier.value}' expected ${parameters.length} arguments and got ${args.length}.`
      );

    for (let i = 0; i < parameters.length; i++) {
      const vardec = parameters[i]!;
      const argument = args[i]!;

      vardec.evaluate(localSt);

      const name = (vardec as VarDec).children[0].value;

      const argvalue = argument.evaluate(st) as StObject;

      localSt.set(name, argvalue.type, argvalue.value);
    }

    const value = functionBody.evaluate(localSt);

    if (value) return value;
  }
}
