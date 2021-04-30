export const inputToDate = (input: string): Date => {
  const items = input.split("/");
  return new Date(`${items[2]}/${items[0]}/${items[1]}`);
};
