export const filterObject = (obj, callback) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(key, val))
  );
};

export const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
