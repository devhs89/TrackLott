export const parseError = (err: { code: string, description: string } | string): string => {
  return (typeof err !== "string" && err.description) ? err.description : "Something went wrong. Incident reported.";
};
