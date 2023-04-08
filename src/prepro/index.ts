class PrePro {
  static validate(expression: string) {
    if (expression.length === 0)
      throw new Error("Expression should not be empty");

    if (
      expression.includes(" ") &&
      !expression.includes("+") &&
      !expression.includes("-")
    )
      throw new Error("Expression should contain at least one operation");
  }
}
