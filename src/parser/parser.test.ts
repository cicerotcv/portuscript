import { Parser } from ".";

describe("Parser", () => {
  describe("Expression", () => {
    // simple binary operations
    Object.entries({ "1 + 1": 2, "1 - 1": 0, "2 * 3": 6, "6 / 3": 2 }).forEach(
      ([expression, result]) => {
        test(`should parse '${expression}'`, () => {
          expect(Parser.run(expression)).toBe(result);
        });
      }
    );
  });
});
