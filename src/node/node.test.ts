import { Operations } from "../types/operations";
import { BinOp } from "./binop";
import { IntVal } from "./intval";
import { UnOp } from "./unop";

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
      expect(intValOne.evaluate()).toEqual(1);
    });
  });

  describe("BinOp", () => {
    test(`should evaluate '${Operations.plus}'`, () => {
      expect(
        new BinOp(Operations.plus, [intValTwelve, intValThree]).evaluate()
      ).toEqual(15);
    });

    test(`should evaluate '${Operations.minus}'`, () => {
      expect(
        new BinOp(Operations.minus, [intValTwelve, intValThree]).evaluate()
      ).toEqual(9);
    });

    test(`should evaluate '${Operations.multi}'`, () => {
      expect(
        new BinOp(Operations.multi, [intValTwelve, intValThree]).evaluate()
      ).toEqual(36);
    });

    test(`should evaluate '${Operations.div}'`, () => {
      expect(
        new BinOp(Operations.div, [intValTwelve, intValThree]).evaluate()
      ).toEqual(4);
    });
  });

  describe("UnOp", () => {
    test(`should evaluate '${Operations.plus}'`, () => {
      expect(new UnOp(Operations.plus, intValThree).evaluate()).toEqual(3);
    });

    test(`should evaluate '${Operations.minus}'`, () => {
      expect(new UnOp(Operations.minus, intValThree).evaluate()).toEqual(-3);
    });
  });
});
