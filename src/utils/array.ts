// 前移一位
export const arrayIndexForward = (arr: any[] = [], index: number) => {
  const validIndex = (index + arr.length) % arr.length;

  if (validIndex !== 0) {
    arr[validIndex] = arr.splice(validIndex - 1, 1, arr[validIndex])[0];
  } else {
    arr.push(arr.shift());
  }

  return arr;
};

// 后移一位
export const arrayIndexBackward = (arr: any[] = [], index: number) => {
  const validIndex = (index + arr.length) % arr.length;

  if (validIndex !== arr.length - 1) {
    arr[validIndex] = arr.splice(validIndex + 1, 1, arr[validIndex])[0];
  } else {
    arr.unshift(arr.pop());
  }

  return arr;
};
