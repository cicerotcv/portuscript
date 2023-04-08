import { Tokenizer } from ".";
import { Token } from "../token";

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
