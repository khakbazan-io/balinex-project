export const formatPrice = (str: string | number, round: number = 2) => {
  const stringVal = String(str);
  const lastTwoNumber = stringVal
    ?.split(".")
    ?.join("")
    ?.split("0")
    ?.join("")
    ?.slice(0, 2);
  const shouldFormat = stringVal?.split(".")?.[1]?.at(0) === "0";
  const value = stringVal?.slice(0, stringVal?.indexOf(lastTwoNumber) + 2);

  if (!/[1-9]/.test(stringVal?.split(".")?.[1])) {
    return (
      String(Number(stringVal).toFixed(0))?.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      ) ?? ""
    );
  }

  if (Number(stringVal) === 0) {
    return "-";
  }

  if (Number(stringVal) >= 1 || !shouldFormat) {
    return (
      String(Number(stringVal).toFixed(round))?.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      ) ?? ""
    );
  }

  return value;
};
