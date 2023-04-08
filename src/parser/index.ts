import { Tokenizer } from "../tokenizer";
import { Operations } from "../types/operations";

export class Parser {
  static tokenizer: Tokenizer;

  static parseExpression() {
    const tokens = Parser.tokenizer;

    let n = tokens.current.value as number;

    tokens.selectNext();

    while (Object.keys(Operations).includes(tokens.current.type)) {
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

  static run(code: string) {
    Parser.tokenizer = new Tokenizer(code);
    return Parser.parseExpression();
  }
}
