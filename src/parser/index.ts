import { Assignment } from "../node/assignment";
import { BinOp } from "../node/binop";
import { Block } from "../node/block";
import { Conditional } from "../node/conditional";
import { ConstDec } from "../node/constdect";
import { Identifier } from "../node/identifier";
import { Evaluable } from "../node/interpreter-node";
import { NoOp } from "../node/noop";
import { Print } from "../node/print";
import { UnOp } from "../node/unop";
import { BooleanVal } from "../node/value-boolean";
import { IntVal } from "../node/value-number";
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
    else if (tokens.current.type === Special.identifier) {
      const identifier = new Identifier(tokens.current.value as string);

      tokens.selectNext();

      if (tokens.current.type !== Operations.assign) {
        throw Error(`Expected '=' and received ${tokens.current}`);
      }

      tokens.selectNext();

      statement = new Assignment(identifier, Parser.parseRelExpression());

      if (tokens.current.type !== Delimiters.semiColon)
        throw Error(`Expected ';' and received ${tokens.current}`);
      tokens.selectNext();
    }

    // var dec
    else if (tokens.current.type === Reserved.seja) {
      tokens.selectNext();

      if (tokens.current.type !== Special.identifier)
        throw Error(`Expected 'identifier' and received ${tokens.current}`);

      const identifier = new Identifier(tokens.current.value as string);
      tokens.selectNext();

      if (tokens.current.type !== Operations.assign)
        throw Error(`Expected '=' and received ${tokens.current}`);

      tokens.selectNext();

      statement = new VarDec(identifier, Parser.parseRelExpression());

      if (tokens.current.type !== Delimiters.semiColon)
        throw Error(`Expected ';' and received ${tokens.current}`);
      tokens.selectNext();
    }

    // const dec
    else if (tokens.current.type === Reserved.constante) {
      tokens.selectNext();

      if (tokens.current.type !== Special.identifier)
        throw Error(`Expected 'identifier' and received ${tokens.current}`);

      const identifier = new Identifier(tokens.current.value as string);
      tokens.selectNext();

      if (tokens.current.type !== Operations.assign)
        throw Error(`Expected '=' and received ${tokens.current}`);

      tokens.selectNext();

      statement = new ConstDec(identifier, Parser.parseRelExpression());

      if (tokens.current.type !== Delimiters.semiColon)
        throw Error(`Expected ';' and received ${tokens.current}`);
      tokens.selectNext();
    }

    // se/senao
    else if (tokens.current.type === Reserved.se) {
      tokens.selectNext();

      if (tokens.current.type !== Delimiters.openingParentheses)
        throw Error(`Expected '(' and received ${tokens.current}`);
      tokens.selectNext();

      const condition = Parser.parseRelExpression();

      if (tokens.current.type !== Delimiters.closingParentheses)
        throw Error(`Expected ')' and received ${tokens.current}`);
      tokens.selectNext();

      const effect = Parser.parseBlock();

      let fallback: Evaluable<any> = new NoOp();

      if (tokens.current.type === Reserved.senao) {
        tokens.selectNext();
        fallback = Parser.parseBlock();
      }

      statement = new Conditional(condition, effect, fallback);
    }

    // print
    else if (tokens.current.type === Reserved.imprima) {
      tokens.selectNext();

      if (tokens.current.type !== Delimiters.openingParentheses)
        throw Error(`Expected '(' and received ${tokens.current}`);
      tokens.selectNext();

      const children = [Parser.parseRelExpression()];

      while (tokens.current.type === Delimiters.comma) {
        tokens.selectNext();
        children.push(Parser.parseRelExpression());
      }

      if (tokens.current.type !== Delimiters.closingParentheses)
        throw Error(`Expected ')' and received ${tokens.current}`);
      tokens.selectNext();

      if (tokens.current.type !== Delimiters.semiColon)
        throw Error(`Expected ';' and received ${tokens.current}`);
      tokens.selectNext();

      statement = new Print(children);
    }

    return statement;
  }

  static parseRelExpression() {
    const tokens = Parser.tokenizer;

    let expression = Parser.parseExpression();

    while (
      [
        Operations.compare_greater,
        Operations.compare_less,
        Operations.compare_equal,
      ].includes(tokens.current.type)
    ) {
      // compare_equal
      if (tokens.current.type === Operations.compare_equal) {
        tokens.selectNext();
        expression = new BinOp(Operations.compare_equal, [
          expression,
          Parser.parseExpression(),
        ]);
      }
      // compare_less
      else if (tokens.current.type === Operations.compare_less) {
        tokens.selectNext();
        expression = new BinOp(Operations.compare_less, [
          expression,
          Parser.parseExpression(),
        ]);
      }
      // compare_greater
      else if (tokens.current.type === Operations.compare_greater) {
        tokens.selectNext();
        expression = new BinOp(Operations.compare_greater, [
          expression,
          Parser.parseExpression(),
        ]);
      }
      // unexpected
      else
        throw new Error(`Expected ">", "<" or "==" and got ${tokens.current}`);
    }

    return expression;
  }

  static parseExpression() {
    const tokens = Parser.tokenizer;

    let expression = Parser.parseTerm();

    while (
      [Operations.minus, Operations.plus, Operations.or].includes(
        tokens.current.type
      )
    ) {
      // plus
      if (tokens.current.type === Operations.plus) {
        tokens.selectNext();
        expression = new BinOp(Operations.plus, [
          expression,
          Parser.parseTerm(),
        ]);
      }
      // minus
      else if (tokens.current.type === Operations.minus) {
        tokens.selectNext();
        expression = new BinOp(Operations.minus, [
          expression,
          Parser.parseTerm(),
        ]);
      }
      // or
      else if (tokens.current.type === Operations.or) {
        tokens.selectNext();
        expression = new BinOp(Operations.or, [expression, Parser.parseTerm()]);
      }
      // unexpected
      else {
        throw new Error(`Expected "+", "-" or '||' and got ${tokens.current}`);
      }
    }

    return expression;
  }

  static parseTerm() {
    const tokens = Parser.tokenizer;

    let term = Parser.parseFactor();

    while (
      [Operations.multi, Operations.div, Operations.and].includes(
        tokens.current.type
      )
    ) {
      // multi
      if (tokens.current.type === Operations.multi) {
        tokens.selectNext();
        term = new BinOp(Operations.multi, [term, Parser.parseFactor()]);
      }
      // div
      else if (tokens.current.type === Operations.div) {
        tokens.selectNext();
        term = new BinOp(Operations.div, [term, Parser.parseFactor()]);
      }
      // and
      else if (tokens.current.type === Operations.and) {
        tokens.selectNext();
        term = new BinOp(Operations.and, [term, Parser.parseFactor()]);
      }
      // unexpected
      else {
        throw new Error(`Expected "*", "/" or "&&" and got ${tokens.current}`);
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

    if (tokens.current.type === BuiltIns.boolean) {
      const number = new BooleanVal(tokens.current.value as string);
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

      const expression = Parser.parseRelExpression();

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
