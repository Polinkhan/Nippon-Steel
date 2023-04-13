const CheckIfObjectIncluded = (arr, obj) => {
  let result = false;
  arr.forEach((element, i) => {
    if (JSON.stringify(element) === JSON.stringify(obj)) {
      result = true;
    }
  });
  return result;
};

export { CheckIfObjectIncluded };
