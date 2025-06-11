export const getLengthErrorMessage = (max: number, min = 1) => {
  return `must be between ${min} and ${max} characters`;
};

export const isTrue = (value: boolean | string) => {
  switch (typeof value) {
    case "boolean":
      return value === true;

    case "string":
      return value.toLowerCase() === "true";

    default:
      return false;
  }
};
