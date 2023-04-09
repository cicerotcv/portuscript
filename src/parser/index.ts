import { Tokenizer } from "../tokenizer";
import { BuiltIns } from "../types/builtins";
import { Delimiters } from "../types/delimiters";
import { Operations } from "../types/operations";

export class Parser {
  static tokenizer: Tokenizer;

  static parseExpression() {
    const tokens = Parser.tokenizer;

    let n = Parser.parseTerm();

    while ([Operations.minus, Operations.plus].includes(tokens.current.type)) {
      if (tokens.current.type === Operations.plus) {
        tokens.selectNext();
        n += Parser.parseTerm();
      } else if (tokens.current.type === Operations.minus) {
        tokens.selectNext();
        n -= Parser.parseTerm();
      } else {
        throw new Error(`Expected "+" or "-" and got ${tokens.current}`);
      }
    }

    return n;
  }

  static parseTerm(): number {
    const tokens = Parser.tokenizer;

    let n = Parser.parseFactor();

    while ([Operations.multi, Operations.div].includes(tokens.current.type)) {
      if (tokens.current.type === Operations.multi) {
        tokens.selectNext();
        n = n * Parser.parseFactor();
      } else if (tokens.current.type === Operations.div) {
        tokens.selectNext();
        n = n / Parser.parseFactor();
      } else {
        throw new Error(`Expected "*" or "/" and got ${tokens.current}`);
      }
    }

    return n;
  }

  static parseFactor(): number {
    const tokens = Parser.tokenizer;

    if (tokens.current.type === BuiltIns.number) {
      const number = tokens.current.value;
      tokens.selectNext();
      return number as number;
    }

    if (tokens.current.type === Operations.minus) {
      tokens.selectNext();
      return -Parser.parseFactor();
    }

    if (tokens.current.type === Operations.plus) {
      tokens.selectNext();
      return Parser.parseFactor();
    }

    if (tokens.current.type === Delimiters.openingParentheses) {
      tokens.selectNext();

      const expression = Parser.parseExpression();

      if (tokens.current.type !== Delimiters.closingParentheses) {
        throw new Error(`Expected "(" and got ${tokens.current}`);
      }

      tokens.selectNext();
      return expression;
    }

    throw new Error(`Unexpected token ${tokens.current}`);
  }

  static run(code: string) {
    Parser.tokenizer = new Tokenizer(code);
    return Parser.parseExpression();
  }
}
