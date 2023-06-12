import { StObject } from "../table/symbol-table";
import { Operations } from "../types/operations";
import { ReservedValues } from "../types/reserved-values";
import { Evaluable, InterpreterNode } from "./interpreter-node";
import { BooleanVal } from "./value-boolean";

export class BinOp
  extends InterpreterNode<string, [Evaluable<StObject>, Evaluable<StObject>]>
  implements Evaluable<StObject>
{
  // extends BaseNode implements InterpreterNode<number>
  constructor(
    value: string,
    children: [Evaluable<StObject>, Evaluable<StObject>]
  ) {
    super(value, children);
  }

  evaluate(): StObject {
    const left = this.children[0].evaluate();
    const right = this.children[1].evaluate();

    // arithmetical operation
    if (
      [
        Operations.plus,
        Operations.minus,
        Operations.multi,
        Operations.div,
      ].includes(this.value)
    ) {
      // arithmetical
      if (left.type === "number" && right.type == "number") {
        const arithmetical = performArithmeticalOperation(
          left.value as number,
          right.value as number,
          this.value
        );

        return { type: "number", value: arithmetical };
      }

      if (left.type === "boolean" && right.type == "boolean") {
        if (
          this.value === Operations.div &&
          right.value === ReservedValues.boolean.falso
        )
          throw new Error(`You cannot divide by '${right.value}'`);

        const arithmetical = performArithmeticalOperation(
          Number(BooleanVal.toBoolean(left.value)),
          Number(BooleanVal.toBoolean(right.value)),
          this.value
        );

        return { type: "number", value: arithmetical };
      }

      if (left.type === "number" && right.type === "boolean") {
        if (
          this.value === Operations.div &&
          right.value === ReservedValues.boolean.falso
        )
          throw new Error(`You cannot divide by '${right.value}'`);

        const arithmetical = performArithmeticalOperation(
          left.value as number,
          Number(BooleanVal.toBoolean(right.value)),
          this.value
        );

        return { type: "number", value: arithmetical };
      }

      if (left.type === "string" && this.value === Operations.plus) {
        return { type: "string", value: `${left.value}${right.value}` };
      }

      throw new Error(
        `Unrecognized arithmetical operation '${this.value}' between ${left.value} and ${right.value}`
      );
    }

    // comparison
    if (
      [
        Operations.compare_equal,
        Operations.compare_greater,
        Operations.compare_less,
      ].includes(this.value)
    ) {
      try {
        const relation = performRelationalOperation(
          left.value,
          right.value,
          this.value
        );

        return {
          type: "boolean",
          value: relation
            ? ReservedValues.boolean.verdadeiro
            : ReservedValues.boolean.falso,
        };
      } catch {
        throw new Error(
          `You cannot perform '${this.value}' operation between ${left.value} and ${right.value}`
        );
      }
    }

    // logical
    if ([Operations.and, Operations.or].includes(this.value)) {
      try {
        const logical = performLogicalOperation(
          BooleanVal.toBoolean(left.value),
          BooleanVal.toBoolean(right.value),
          this.value
        );

        return {
          type: "boolean",
          value: logical
            ? ReservedValues.boolean.verdadeiro
            : ReservedValues.boolean.falso,
        };
      } catch {
        throw new Error(
          `You cannot perform '${this.value}' operation between ${left.value} and ${right.value}`
        );
      }
    }

    throw new Error(
      `Unrecognized binary operation '${this.value}' between ${left} and ${right}`
    );
  }
}

const performArithmeticalOperation = (
  a: number,
  b: number,
  op: string
): number => {
  if (op === Operations.plus) return a + b;
  if (op === Operations.minus) return a - b;
  if (op === Operations.multi) return a * b;
  if (op === Operations.div) return a / b;

  throw new Error(
    `Unrecognized arithmetical operation '${op}' between '${a}' and '${b}'`
  );
};

const performRelationalOperation = (
  a: number | string,
  b: number | string,
  op: string
): boolean => {
  if (op === Operations.compare_equal) return a == b;
  if (op === Operations.compare_greater) return a > b;
  if (op === Operations.compare_less) return a < b;

  throw new Error(
    `Unrecognized relational operation '${op}' between '${a}' and '${b}'`
  );
};

const performLogicalOperation = (
  a: string | number | boolean,
  b: string | number | boolean,
  op: string
) => {
  if (op === Operations.and) return a && b;
  if (op === Operations.or) return a || b;

  throw new Error(
    `Unrecognized logical operation '${op}' between '${a}' and '${b}'`
  );
};
