export const loadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key: string, item: any) => {
  try {
    const serializedState = JSON.stringify(item);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};