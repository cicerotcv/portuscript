import { Tokenizer } from "../tokenizer";
import { Operations } from "../types/operations";

export class Parser {
  static tokenizer: Tokenizer;

  static parseExpression() {
    const tokens = Parser.tokenizer;

    let n = Parser.parseTerm();

    while ([Operations.minus, Operations.plus].includes(tokens.current.type)) {
      if (tokens.current.type === Operations.plus) {
        n += tokens.selectNext().value as number;
      } else if (tokens.current.type === Operations.minus) {
        n -= tokens.selectNext().value as number;
      } else {
        throw new Error(`Expected "+" or "-" and got ${tokens.current}`);
      }
    }

    return n;
  }

  static parseTerm(): number {
    const tokens = Parser.tokenizer;

    let n = tokens.current.value as number;

    tokens.selectNext();

    while ([Operations.multi, Operations.div].includes(tokens.current.type)) {
      if (tokens.current.type === Operations.multi) {
        n *= tokens.selectNext().value;
      } else if (tokens.current.type === Operations.div) {
        n /= tokens.selectNext().value;
      }
    }

    return n;
  }

  static run(code: string) {
    Parser.tokenizer = new Tokenizer(code);
    return Parser.parseExpression();
  }
}
