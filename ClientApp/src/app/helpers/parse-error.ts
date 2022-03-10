export const parseError = (err: string): string => {
  try {
    return JSON.parse(err).title;
  } catch (ex) {
    return err;
  }
};
