import { ReservedValues } from "../types/reserved-values";
import { st } from "./symbol-table";

describe("Symbol Table", () => {
  afterEach(() => {
    st.clear();
  });

  describe("Boolean", () => {
    test("true declaration", () => {
      st.declare({
        name: "v",
        isMutable: true,
        type: "boolean",
        value: ReservedValues.boolean.verdadeiro,
      });

      const v = st.get("v");

      expect(v.type).toEqual("boolean");
      expect(v.value).toEqual(ReservedValues.boolean.verdadeiro);
    });

    test("false declaration", () => {
      st.declare({
        name: "f",
        isMutable: true,
        type: "boolean",
        value: ReservedValues.boolean.falso,
      });

      const f = st.get("f");

      expect(f.type).toEqual("boolean");
      expect(f.value).toEqual(ReservedValues.boolean.falso);
    });
  });

  describe("Number", () => {
    test("number declaration", () => {
      st.declare({
        name: "number",
        isMutable: true,
        type: "number",
        value: 1,
      });

      const number = st.get("number");

      expect(number.type).toEqual("number");
      expect(number.value).toEqual(1);
    });
  });
});
