import { Operations } from "../types/operations";
import { BinOp } from "./binop";
import { IntVal } from "./value-number";
import { UnOp } from "./unop";
import { VarDec } from "./vardec";
import { Identifier } from "./identifier";
import { st } from "../symboltable/symbol-table";
import { ConstDec } from "./constdect";
import { StringVal } from "./value-string";

describe("Node", () => {
  let intValOne: IntVal;
  let intValThree: IntVal;
  let intValTwelve: IntVal;

  beforeAll(() => {
    intValTwelve = new IntVal(12);
    intValThree = new IntVal(3);
    intValOne = new IntVal(1);
  });

  describe("IntVal", () => {
    test("should initialize correctly", () => {
      expect(intValOne.value).toEqual(1);
      expect(intValOne.children).toEqual([]);
    });

    test("should evaluate correctly", () => {
      expect(intValOne.evaluate().value).toEqual(1);
    });
  });

  describe("BinOp", () => {
    test(`should evaluate '${Operations.plus}'`, () => {
      expect(
        new BinOp(Operations.plus, [intValTwelve, intValThree]).evaluate().value
      ).toEqual(15);
    });

    test(`should evaluate '${Operations.minus}'`, () => {
      expect(
        new BinOp(Operations.minus, [intValTwelve, intValThree]).evaluate()
          .value
      ).toEqual(9);
    });

    test(`should evaluate '${Operations.multi}'`, () => {
      expect(
        new BinOp(Operations.multi, [intValTwelve, intValThree]).evaluate()
          .value
      ).toEqual(36);
    });

    test(`should evaluate '${Operations.div}'`, () => {
      expect(
        new BinOp(Operations.div, [intValTwelve, intValThree]).evaluate().value
      ).toEqual(4);
    });

    test("should concat string and number", () => {
      expect(
        new BinOp(Operations.plus, [
          new StringVal("string"),
          intValOne,
        ]).evaluate().value
      ).toEqual("string1");
    });
  });

  describe("UnOp", () => {
    test(`should evaluate '${Operations.plus}'`, () => {
      expect(new UnOp(Operations.plus, intValThree).evaluate().value).toEqual(
        3
      );
    });

    test(`should evaluate '${Operations.minus}'`, () => {
      expect(new UnOp(Operations.minus, intValThree).evaluate().value).toEqual(
        -3
      );
    });
  });

  describe("VarDec", () => {
    test("declare number", () => {
      const vardec = new VarDec(new Identifier("number"), intValOne);

      vardec.evaluate();

      const output = st.get("number");

      expect(output.type).toEqual("number");
      expect(output.value).toEqual(1);

      st.clear();
    });
  });

  describe("ConstDec", () => {
    test("declare multiple numbers", () => {
      [
        new ConstDec(new Identifier("number1"), intValOne),
        new ConstDec(new Identifier("number2"), intValOne),
        new ConstDec(new Identifier("number3"), intValOne),
      ].forEach((dec) => dec.evaluate());

      const output1 = st.get("number1");
      const output2 = st.get("number2");
      const output3 = st.get("number3");

      expect(output1.type).toEqual("number");
      expect(output2.type).toEqual("number");
      expect(output3.type).toEqual("number");
      expect(output1.value).toEqual(1);
      expect(output2.value).toEqual(1);
      expect(output3.value).toEqual(1);

      st.clear();
    });
  });
});
