export namespace NumberUtils {
  export const isNumber = (char: string) => {
    return /\d{1}/.test(char);
  };
}
