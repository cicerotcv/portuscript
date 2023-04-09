import { WHITESPACES } from "../constants";
import { IToken, Token } from "../token";
import { Delimiters } from "../types/delimiters";
import { NumberUtils } from "../utils/numbers";

export class Tokenizer {
  source: string;
  current!: IToken<unknown>;
  position: number;

  constructor(source: string) {
    this.source = source;
    this.position = 0;
    this.selectNext();
  }

  get currentChar() {
    return this.source[this.position] as string;
  }

  get hasReachedEnd() {
    return this.position >= this.source.length;
  }

  selectNext() {
    // current char is the last
    if (this.hasReachedEnd) {
      this.current = Token.eof();
      return this.current;
    }

    // ignore whitespace
    while (WHITESPACES.includes(this.currentChar)) {
      this.position++;
      if (this.hasReachedEnd) {
        this.current = Token.eof();
        return this.current;
      }
    }

    if (this.currentChar === "+") {
      this.current = Token.plus();
      this.position++;
      return this.current;
    }

    if (this.currentChar === "-") {
      this.current = Token.minus();
      this.position++;
      return this.current;
    }

    if (this.currentChar === "*") {
      this.current = Token.multi();
      this.position++;
      return this.current;
    }

    if (this.currentChar === "/") {
      this.current = Token.div();
      this.position++;
      return this.current;
    }
    if (this.currentChar === "(") {
      this.current = new Token(Delimiters.openingParentheses, null);
      this.position++;
      return this.current;
    }
    if (this.currentChar === ")") {
      this.current = new Token(Delimiters.closingParentheses, null);
      this.position++;
      return this.current;
    }

    if (NumberUtils.isNumber(this.currentChar)) {
      let candidate = "";

      while (NumberUtils.isNumber(this.currentChar) && !this.hasReachedEnd) {
        candidate += this.currentChar;
        this.position++;
      }
      if (candidate === " ") console.error(true);
      this.current = Token.number(Number(candidate));
      return this.current;
    }

    throw new Error(`Unrecognized char '${this.currentChar}'`);
  }
}
