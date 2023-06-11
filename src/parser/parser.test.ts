import { Parser } from ".";
import { st } from "../symboltable/symbol-table";

const createParserTest = (expression: string, result: number) =>
  test(`should evaluate '${expression}' to '${result}'`, () => {
    expect(Parser.run(`${expression}`)).toEqual(result);
  });

describe("Parser", () => {
  describe("Expression", () => {
    // createParserTest("1 + 1", 2);
    // createParserTest("1 - 1", 0);
    // createParserTest("1 + 2 + 3", 6);
    // createParserTest("1 + 2 - 3", 0);
  });

  describe("Term", () => {
    // createParserTest("2 * 3", 6);
    // createParserTest("6 / 3", 2);
    // createParserTest("2 * 3 * 4", 24);
    // createParserTest("24 / 3 / 2", 4);
  });

  describe("Factor", () => {
    // createParserTest("(1 + 2 + 3)", 6);
    // createParserTest("(1 + 2 - 3)", 0);
    // createParserTest("1 + 2 * 3", 7);
    // createParserTest("(1 + 2) * 3", 9);
    // createParserTest("2 * 3 + 1", 7);
    // createParserTest("2 * (3 + 1)", 8);
    // createParserTest("3 + 6 / 3", 5);
    // createParserTest("(3 + 6) / 3", 3);
    // createParserTest("6 * 4 + 3", 27);
    // createParserTest("6 * (4 + 3)", 42);
  });

  describe("Statement", () => {
    describe("Variable/Constant", () => {
      beforeEach(() => {
        st.clear();
      });

      test("declare variable", () => {
        Parser.run("{ seja abc = 1; }");
        expect(st.get("abc").type).toBe("number");
        expect(st.get("abc").value).toBe(1);
      });

      test("redeclare variable", () => {
        expect(() => Parser.run("{ seja abc = 1; seja abc = 2; }")).toThrow(
          "already declared"
        );
      });

      test("reassign variable", () => {
        Parser.run("{ seja abc = 1; abc = 3; }");
        expect(st.get("abc").type).toBe("number");
        expect(st.get("abc").value).toBe(3);
      });

      test("use variable value", () => {
        Parser.run("{ seja abc = 1; abc = abc + 1; }");
        expect(st.get("abc").type).toBe("number");
        expect(st.get("abc").value).toBe(2);
      });

      test("declare constant", () => {
        Parser.run("{ constante abc = 1; }");
        expect(st.get("abc").type).toBe("number");
        expect(st.get("abc").value).toBe(1);
      });

      test("redeclare constant", () => {
        expect(() =>
          Parser.run("{ constante abc = 1; constante abc = 2; }")
        ).toThrow("already declared");
      });

      test("reassign constant", () => {
        expect(() => Parser.run("{ constante abc = 1; abc = 2; }")).toThrow(
          "is not mutable"
        );
      });
    });
  });
});
