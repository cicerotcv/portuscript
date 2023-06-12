import { Tokenizer } from ".";
import { Token } from "../token";
import { Delimiters } from "../types/delimiters";
import { Operations } from "../types/operations";
import { Reserved } from "../types/reserved";
import { Special } from "../types/special";

const createIdentifierTest = (identifier: string) =>
  test(`should recognize identifier '${identifier}'`, () => {
    const token = new Tokenizer(identifier).current;
    expect(token).toEqual(new Token(Special.identifier, identifier));
  });

describe("Tokenizer", () => {
  describe("Operations", () => {
    test("should recognize 'plus' token", () => {
      const token = new Tokenizer("+").current;
      expect(token).toEqual(Token.plus());
    });

    test("should recognize 'minus' token", () => {
      const token = new Tokenizer("-").current;
      expect(token).toEqual(Token.minus());
    });

    test("should recognize 'multi' token", () => {
      const token = new Tokenizer("*").current;
      expect(token).toEqual(Token.multi());
    });

    test("should recognize 'div' token", () => {
      const token = new Tokenizer("/").current;
      expect(token).toEqual(Token.div());
    });

    test("should recognize 'assign' token", () => {
      const token = new Tokenizer("=").current;
      expect(token).toEqual(new Token(Operations.assign, null));
    });

    test("should recognize 'equal' token", () => {
      const token = new Tokenizer("==").current;
      expect(token).toEqual(new Token(Operations.compare_equal, null));
    });

    test("should recognize 'greater than' token", () => {
      const token = new Tokenizer(">").current;
      expect(token).toEqual(new Token(Operations.compare_greater, null));
    });

    test("should recognize 'less than' token", () => {
      const token = new Tokenizer("<").current;
      expect(token).toEqual(new Token(Operations.compare_less, null));
    });

    test("should recognize 'and (&&)' token", () => {
      const token = new Tokenizer("&&").current;
      expect(token).toEqual(new Token(Operations.and, null));
    });
    test("should recognize 'or (||)' token", () => {
      const token = new Tokenizer("||").current;
      expect(token).toEqual(new Token(Operations.or, null));
    });
  });

  describe("Delimiters", () => {
    test("should recognize '(' token", () => {
      const token = new Tokenizer("(").current;
      expect(token).toEqual(new Token(Delimiters.openingParentheses, null));
    });
    test("should recognize ')' token", () => {
      const token = new Tokenizer(")").current;
      expect(token).toEqual(new Token(Delimiters.closingParentheses, null));
    });

    test("should recognize '{' token", () => {
      const token = new Tokenizer("{").current;
      expect(token).toEqual(new Token(Delimiters.openingCurlyBrackets, null));
    });
    test("should recognize '}' token", () => {
      const token = new Tokenizer("}").current;
      expect(token).toEqual(new Token(Delimiters.closingCurlyBrackets, null));
    });

    test("should recognize ';' token", () => {
      const token = new Tokenizer(";").current;
      expect(token).toEqual(new Token(Delimiters.semiColon, null));
    });

    test("should recognize ',' token", () => {
      const token = new Tokenizer(",").current;
      expect(token).toEqual(new Token(Delimiters.comma, null));
    });
  });

  describe("Built-in types", () => {
    describe("Numbers", () => {
      test("should recognize one digit number", () => {
        const token = new Tokenizer("7").current;
        expect(token).toEqual(Token.number(7));
      });

      test("should recognize an aribitrary number", () => {
        const token = new Tokenizer("123").current;
        expect(token).toEqual(Token.number(123));
      });
    });
  });

  describe("Reserved", () => {
    test("should recognize 'seja'", () => {
      const token = new Tokenizer("seja").current;
      expect(token).toEqual(new Token(Reserved.seja, null));
    });

    test("should recognize 'constante'", () => {
      const token = new Tokenizer("constante").current;
      expect(token).toEqual(new Token(Reserved.constante, null));
    });

    test("should recognize 'imprima'", () => {
      const token = new Tokenizer("imprima").current;
      expect(token).toEqual(new Token(Reserved.imprima, null));
    });
  });

  describe("Special", () => {
    createIdentifierTest("a");
    createIdentifierTest("__a__");
    createIdentifierTest("abc");
    createIdentifierTest("abc_123");
    createIdentifierTest("abc123");
    createIdentifierTest("ABC123");
  });

  describe("Miscellaneous", () => {
    test("shoud ignore spaces", () => {
      const tokenizer = new Tokenizer("1    +    1");
      expect(tokenizer.current).toEqual(Token.number(1));
      expect(tokenizer.selectNext()).toEqual(Token.plus());
      expect(tokenizer.selectNext()).toEqual(Token.number(1));
    });

    test("shoud recognize end of expression", () => {
      const tokenizer = new Tokenizer("");
      expect(tokenizer.current).toEqual(Token.eof());
    });
  });
});
