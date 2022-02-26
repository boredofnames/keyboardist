const filterObject = (obj, callback) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(key, val))
  );
};

export { filterObject };
