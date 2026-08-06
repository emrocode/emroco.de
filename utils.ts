export const env = (key: string): string => {
  try {
    const value = Deno.env.get(key);
    if (!value) throw new Error(`Env var "${key}" is not defined`);
    return value;
  } catch (error) {
    console.error(error);
    return "";
  }
};
