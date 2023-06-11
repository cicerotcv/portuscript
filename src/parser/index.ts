import { Assignment } from "../node/assignment";
import { BinOp } from "../node/binop";
import { Block } from "../node/block";
import { ConstDec } from "../node/constdect";
import { Identifier } from "../node/identifier";
import { Evaluable, InterpreterNode } from "../node/interpreter-node";
import { IntVal } from "../node/intval";
import { NoOp } from "../node/noop";
import { UnOp } from "../node/unop";
import { VarDec } from "../node/vardec";
import { Tokenizer } from "../tokenizer";
import { BuiltIns } from "../types/builtins";
import { Delimiters } from "../types/delimiters";
import { Operations } from "../types/operations";
import { Reserved } from "../types/reserved";
import { Special } from "../types/special";

export class Parser {
  static tokenizer: Tokenizer;

  static parseBlock() {
    const tokens = Parser.tokenizer;

    if (tokens.current.type !== Delimiters.openingCurlyBrackets)
      throw new Error(`Expected '{' and received ${tokens.current}`);

    tokens.selectNext();

    const statements = [];
    while (
      ![Delimiters.closingCurlyBrackets, Delimiters.eof].includes(
        tokens.current.type
      )
    ) {
      statements.push(Parser.parseStatement());
    }

    if (tokens.current.type !== Delimiters.closingCurlyBrackets)
      throw new Error(`Expected '}' and received ${tokens.current}`);

    tokens.selectNext();

    return new Block(statements);
  }

  static parseStatement() {
    const tokens = Parser.tokenizer;

    let statement: Evaluable<any> = new NoOp();

    if (tokens.current.type === Delimiters.semiColon) {
      tokens.selectNext();

      statement = new NoOp();
    }

    // assignment
    if (tokens.current.type === Special.identifier) {
      const identifier = new Identifier(tokens.current.value as string);

      tokens.selectNext();

      if (tokens.current.type !== Operations.assign) {
        throw Error(`Expected '=' and received ${tokens.current}`);
      }

      tokens.selectNext();

      statement = new Assignment(identifier, Parser.parseExpression());

      if (tokens.current.type !== Delimiters.semiColon)
        throw Error(`Expected ';' and received ${tokens.current}`);
      tokens.selectNext();
    }
    // vardec
    if (tokens.current.type === Reserved.seja) {
      tokens.selectNext();

      if (tokens.current.type !== Special.identifier)
        throw Error(`Expected 'identifier' and received ${tokens.current}`);

      const identifier = new Identifier(tokens.current.value as string);
      tokens.selectNext();

      if (tokens.current.type !== Operations.assign)
        throw Error(`Expected '=' and received ${tokens.current}`);

      tokens.selectNext();

      statement = new VarDec(identifier, Parser.parseExpression());

      if (tokens.current.type !== Delimiters.semiColon)
        throw Error(`Expected ';' and received ${tokens.current}`);
      tokens.selectNext();
    }

    if (tokens.current.type === Reserved.constante) {
      tokens.selectNext();

      if (tokens.current.type !== Special.identifier)
        throw Error(`Expected 'identifier' and received ${tokens.current}`);

      const identifier = new Identifier(tokens.current.value as string);
      tokens.selectNext();

      if (tokens.current.type !== Operations.assign)
        throw Error(`Expected '=' and received ${tokens.current}`);

      tokens.selectNext();

      statement = new ConstDec(identifier, Parser.parseExpression());

      if (tokens.current.type !== Delimiters.semiColon)
        throw Error(`Expected ';' and received ${tokens.current}`);
      tokens.selectNext();
    }

    return statement;
  }

  static parseExpression() {
    const tokens = Parser.tokenizer;

    let expression = Parser.parseTerm();

    while ([Operations.minus, Operations.plus].includes(tokens.current.type)) {
      if (tokens.current.type === Operations.plus) {
        tokens.selectNext();
        expression = new BinOp(Operations.plus, [
          expression,
          Parser.parseTerm(),
        ]);
      } else if (tokens.current.type === Operations.minus) {
        tokens.selectNext();
        expression = new BinOp(Operations.minus, [
          expression,
          Parser.parseTerm(),
        ]);
      } else {
        throw new Error(`Expected "+" or "-" and got ${tokens.current}`);
      }
    }

    return expression;
  }

  static parseTerm() {
    const tokens = Parser.tokenizer;

    let term = Parser.parseFactor();

    while ([Operations.multi, Operations.div].includes(tokens.current.type)) {
      if (tokens.current.type === Operations.multi) {
        tokens.selectNext();
        term = new BinOp(Operations.multi, [term, Parser.parseFactor()]);
      } else if (tokens.current.type === Operations.div) {
        tokens.selectNext();
        term = new BinOp(Operations.div, [term, Parser.parseFactor()]);
      } else {
        throw new Error(`Expected "*" or "/" and got ${tokens.current}`);
      }
    }

    return term;
  }

  static parseFactor(): Evaluable<any> {
    const tokens = Parser.tokenizer;

    if (tokens.current.type === BuiltIns.number) {
      const number = new IntVal(tokens.current.value as number);
      tokens.selectNext();
      return number;
    }

    if (tokens.current.type === Operations.minus) {
      tokens.selectNext();
      return new UnOp(Operations.minus, Parser.parseFactor());
    }

    if (tokens.current.type === Operations.plus) {
      tokens.selectNext();
      return Parser.parseFactor();
    }

    if (tokens.current.type === Special.identifier) {
      const identifier = new Identifier(tokens.current.value as string);
      tokens.selectNext();
      return identifier;
    }

    if (tokens.current.type === Delimiters.openingParentheses) {
      tokens.selectNext();

      const expression = Parser.parseExpression();

      if (tokens.current.type !== Delimiters.closingParentheses) {
        throw new Error(`Expected ")" and got ${tokens.current}`);
      }

      tokens.selectNext();
      return expression;
    }

    throw new Error(`Unexpected token ${tokens.current}`);
  }

  static run(code: string) {
    Parser.tokenizer = new Tokenizer(code);
    const root = Parser.parseBlock();
    return root.evaluate();
  }
}
