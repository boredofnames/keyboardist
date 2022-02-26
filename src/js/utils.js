const filterObject = (obj, callback) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(key, val))
  );
};

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export { filterObject, randomFrom };
