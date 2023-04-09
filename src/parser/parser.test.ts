import { Parser } from ".";

describe("Parser", () => {
  describe("Expression", () => {
    // simple binary operations
    Object.entries({
      "1 + 1": 2,
      "1 - 1": 0,
      "1 + 2 + 3": 6,
      "1 + 2 - 3": 0,
    }).forEach(([expression, result]) => {
      test(`should parse '${expression}'`, () => {
        expect(Parser.run(expression)).toEqual(result);
      });
    });
  });

  describe("Term", () => {
    // simple binary operations
    Object.entries({
      "2 * 3": 6,
      "6 / 3": 2,
      "2 * 3 * 4": 24,
      "24 / 3 / 2": 4,
    }).forEach(([expression, result]) => {
      test(`should parse '${expression}'`, () => {
        expect(Parser.run(expression)).toEqual(result);
      });
    });
  });

  describe("Factor", () => {
    // simple binary operations
    Object.entries({
      "(1 + 2 + 3)": 6,
      "(1 + 2 - 3)": 0,
      "1 + 2 * 3": 7,
      "(1 + 2) * 3": 9,
      "2 * 3 + 1": 7,
      "2 * (3 + 1)": 8,
      "3 + 6 / 3": 5,
      "(3 + 6) / 3": 3,
      "6 * 4 + 3": 27,
      "6 * (4 + 3)": 42,
    }).forEach(([expression, result]) => {
      test(`should parse '${expression}'`, () => {
        expect(Parser.run(expression)).toEqual(result);
      });
    });
  });
});
