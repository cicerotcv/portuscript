import { BuiltIns } from "../types/builtins";
import { Delimiters } from "../types/delimiters";
import { Operations } from "../types/operations";

export type IToken<V = null> = {
  type: string;
  value: V;
};

export class Token<V> implements IToken<V> {
  type: string;
  value: V;

  constructor(type: string, value: V) {
    this.type = type;
    this.value = value;
  }

  inspect() {
    if (!this.value) return `Token(${this.type})`;
    return `Token(${this.type}, ${this.value})`;
  }

  static number = (value: number) => new Token(BuiltIns.number, value);
  static plus = () => new Token(Operations.plus, null);
  static minus = () => new Token(Operations.minus, null);
  static multi = () => new Token(Operations.multi, null);
  static div = () => new Token(Operations.div, null);
  static eof = () => new Token(Delimiters.eof, null);
}
