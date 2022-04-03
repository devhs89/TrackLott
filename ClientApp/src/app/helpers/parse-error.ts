export const parseError = (err: { code: string, description: string } | string): string => {
  let resp = "Something went wrong. Incident reported.";

  if (typeof err !== "string" && err.description) {
    return err.description;
  } else if (typeof err === "string") {
    try {
      return JSON.parse(err).description;
    } catch (e) {
      return resp;
    }
  }
  return resp;
};
