export const isLocalStorageSet = (key) => {
    const item = localStorage.getItem(key);
    return item !== null && item !== undefined && item !== '';
  };