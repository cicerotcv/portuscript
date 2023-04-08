import { TokenTypes } from "../types";
import { BuiltIns } from "../types/builtins";
import { Delimiters } from "../types/delimiters";
import { Operations } from "../types/operations";

export type IToken<T extends TokenTypes, V = null> = {
  type: T;
  value: V;
};

export class Token<T extends TokenTypes, V> implements IToken<T, V> {
  readonly type;
  readonly value: V;

  constructor(type: T, value: V) {
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
  static eof = () => new Token(Delimiters.eof, null);
}
