import { Parser } from ".";

const createParserTest = (expression: string, result: number) =>
  test(`should evaluate '${expression}' to '${result}'`, () => {
    expect(Parser.run(expression)).toEqual(result);
  });

describe("Parser", () => {
  describe("Expression", () => {
    createParserTest("1 + 1", 2);
    createParserTest("1 - 1", 0);
    createParserTest("1 + 2 + 3", 6);
    createParserTest("1 + 2 - 3", 0);
  });

  describe("Term", () => {
    createParserTest("2 * 3", 6);
    createParserTest("6 / 3", 2);
    createParserTest("2 * 3 * 4", 24);
    createParserTest("24 / 3 / 2", 4);
  });

  describe("Factor", () => {
    createParserTest("(1 + 2 + 3)", 6);
    createParserTest("(1 + 2 - 3)", 0);
    createParserTest("1 + 2 * 3", 7);
    createParserTest("(1 + 2) * 3", 9);
    createParserTest("2 * 3 + 1", 7);
    createParserTest("2 * (3 + 1)", 8);
    createParserTest("3 + 6 / 3", 5);
    createParserTest("(3 + 6) / 3", 3);
    createParserTest("6 * 4 + 3", 27);
    createParserTest("6 * (4 + 3)", 42);
  });
});
