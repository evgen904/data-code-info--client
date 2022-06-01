export default function guest({ next, store }) {
  if (store._modules.root.state.user.isAuth || localStorage.getItem("token")) {
    return next({
      name: "UI",
    });
  }

  return next();
}
