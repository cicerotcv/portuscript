import { WHITESPACES } from "../constants";
import { IToken, Token } from "../token";
import { BuiltIns } from "../types/builtins";
import { Delimiters } from "../types/delimiters";
import { Operations } from "../types/operations";
import { Reserved } from "../types/reserved";
import { ReservedValues } from "../types/reserved-values";
import { Special } from "../types/special";
import { NumberUtils } from "../utils/numbers";
import { StringUtils } from "../utils/string";

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

    if (this.currentChar === "=") {
      this.position++;

      if (this.currentChar === "=") {
        this.current = new Token(Operations.compare_equal, null);
        this.position++;
      } else {
        this.current = new Token(Operations.assign, null);
      }

      return this.current;
    }

    if (this.currentChar === "&") {
      this.position++;

      if (this.currentChar !== "&") {
        throw new Error(`Unrecognized char '${this.currentChar}'`);
      }
      this.position++;

      this.current = new Token(Operations.and, null);
      return this.current;
    }

    if (this.currentChar === "|") {
      this.position++;

      if (this.currentChar !== "|") {
        throw new Error(`Unrecognized char '${this.currentChar}'`);
      }
      this.position++;

      this.current = new Token(Operations.or, null);
      return this.current;
    }

    if (this.currentChar === "<") {
      this.current = new Token(Operations.compare_less, null);
      this.position++;
      return this.current;
    }

    if (this.currentChar === ">") {
      this.current = new Token(Operations.compare_greater, null);
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

    if (this.currentChar === "{") {
      this.current = new Token(Delimiters.openingCurlyBrackets, null);
      this.position++;
      return this.current;
    }

    if (this.currentChar === "}") {
      this.current = new Token(Delimiters.closingCurlyBrackets, null);
      this.position++;
      return this.current;
    }

    if (this.currentChar === ";") {
      this.current = new Token(Delimiters.semiColon, null);
      this.position++;
      return this.current;
    }

    if (this.currentChar === ",") {
      this.current = new Token(Delimiters.comma, null);
      this.position++;
      return this.current;
    }

    if (NumberUtils.isNumber(this.currentChar)) {
      let candidate = "";

      while (NumberUtils.isNumber(this.currentChar) && !this.hasReachedEnd) {
        candidate += this.currentChar;
        this.position++;
      }

      this.current = Token.number(Number(candidate));
      return this.current;
    }

    if (StringUtils.isChar(this.currentChar)) {
      let candidate = "";

      while (
        StringUtils.isAcceptableChar(this.currentChar) &&
        !this.hasReachedEnd
      ) {
        candidate += this.currentChar;
        this.position++;
      }

      // verdadeiro/falso
      if (Object.values(ReservedValues.boolean).includes(candidate)) {
        this.current = new Token(BuiltIns.boolean, candidate); // reserved word
      }
      // reserved words
      else if (Object.values(Reserved).includes(candidate)) {
        this.current = new Token(candidate, null); // reserved word
      }
      // identifier/function
      else {
        this.current = new Token(Special.identifier, candidate);
      }

      return this.current;
    }

    throw new Error(`Unrecognized char '${this.currentChar}'`);
  }
}
