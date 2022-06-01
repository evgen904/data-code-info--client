import HTTP from "../http-common";

export default (payload) => {
  return HTTP.post("post/edit", payload);
};
