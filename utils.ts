export const env = (key: string): string => {
  try {
    const value = process.env[key];
    if (!value) throw new Error(`Env var "${key}" is not defined`);
    return value;
  } catch (error) {
    console.error(error);
    return "";
  }
};
