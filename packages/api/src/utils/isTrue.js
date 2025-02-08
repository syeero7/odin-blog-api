export const isTrue = (value) => {
  switch (typeof value) {
    case "boolean":
      return value === true;

    case "string":
      return value.toLowerCase() === "true";
  }

  return false;
};
