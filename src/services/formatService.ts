export const capitalize = (text: string, key?: string) => {
  if (key === "email") return text;
  if (key === "description")
    return text.charAt(0).toUpperCase() + text.slice(1);

  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatArrayOfStrings = (array: string[]) => {
  return array.map((item) => capitalize(item));
};

export const formatObject = <T extends Record<string, any>>(object: T): T => {
  const formattedObject: Record<string, any> = { ...object };

  for (const key in formattedObject) {
    if (Object.prototype.hasOwnProperty.call(formattedObject, key)) {
      let value = formattedObject[key];
      if (typeof value === "string") {
        formattedObject[key] = capitalize(value, key);
      } else if (
        Array.isArray(value) &&
        value.every((item) => typeof item === "string")
      ) {
        formattedObject[key] = formatArrayOfStrings(value);
      } else if (
        Array.isArray(value) &&
        value.every((item) => typeof item === "object")
      ) {
        formattedObject[key] = value.map(formatObject);
      } else if (typeof value === "object" && value !== null) {
        formattedObject[key] = formatObject(value);
      }
    }
  }
  return formattedObject as T;
};
