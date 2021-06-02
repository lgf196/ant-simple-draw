export const overHiddleText = (val: string, number: number) => {
  if (val.length > number) {
    return val.substring(0, number) + '...';
  } else {
    return val;
  }
};
