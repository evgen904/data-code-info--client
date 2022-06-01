export default function auth({ next, store }) {
  if (
    !store._modules.root.state.user.isAuth &&
    !localStorage.getItem("token")
  ) {
    return next({
      name: "JsView",
    });
  }

  return next();
}
