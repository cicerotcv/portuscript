import { NumberUtils } from "./numbers";

describe("Numbers", () => {
  test("should return true to digits from 0 to 9", () => {
    "0123456789"
      .split("")
      .forEach((d) => expect(NumberUtils.isNumber(d)).toBeTruthy());
  });

  test('should return false to "abcdefghijklmnopqrstuvwxyz"', () => {
    "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .forEach((d) => expect(NumberUtils.isNumber(d)).toBeFalsy());
  });

  test('should return false to "[]{}();.,"', () => {
    "[]{}();.,"
      .split("")
      .forEach((d) => expect(NumberUtils.isNumber(d)).toBeFalsy());
  });
});
