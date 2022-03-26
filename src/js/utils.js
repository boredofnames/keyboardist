export const filterObject = (obj, callback) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(key, val))
  );
};

export const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
