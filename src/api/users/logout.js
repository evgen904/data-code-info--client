import HTTP from "../http-common";

export default () => {
  return HTTP.post("/logout");
};
