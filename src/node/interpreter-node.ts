import { SymbolTable } from "../table/symbol-table";

export interface Evaluable<T> {
  evaluate(st: SymbolTable): T;
}

export abstract class InterpreterNode<
  ValueType extends string | number | null | boolean,
  ChildrenType extends Array<any>
> {
  value: ValueType;
  children: ChildrenType;

  constructor(value: ValueType, children: ChildrenType) {
    this.value = value;
    this.children = children;
  }

  toString() {
    const className = this.constructor.name;

    const valueProperty = `value="${this.value}"`;

    if (!this.children.length) return `<${className} ${valueProperty} />`;

    return `<${className} ${valueProperty}>}\n${this.children.join(
      "\n"
    )}\n</${className}>`;
  }
}
