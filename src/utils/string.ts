export namespace StringUtils {
  export const isChar = (char: string) => {
    return /\w{1}/.test(char);
  };

  export const isAcceptableChar = (char: string) => {
    return /[\w\d_]{1}/.test(char);
  };
}
