export const storageSave = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
  if (!key) {
    throw new Error("storageSave: No storage key provided");
  }

  if (!value) {
    throw new Error("storageSave: No value provided for " + key);
  }
};

export const storageRead = (key) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    console.log(data);
    return JSON.parse(data);
  }

  return null;
};

export const storageDelete = (key) => {
  sessionStorage.removeItem(key);
};
