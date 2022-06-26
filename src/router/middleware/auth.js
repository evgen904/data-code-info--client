export default function auth({ next, store }) {
  if (
    !store._modules.root.state.user.isAuth &&
    !localStorage.getItem("token")
  ) {
    return next({
      name: "DashboardView",
    });
  }

  return next();
}
