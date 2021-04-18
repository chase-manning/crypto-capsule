export const inputToDate = (input: string) => {
  const items = input.split("/");
  return new Date(`${items[2]}/${items[0]}/${items[1]}`);
};
