class Config {
  print: (text: string) => void = console.log;

  setPrint(print: (text: string) => void) {
    this.print = print;
  }
}

export const config = new Config();
