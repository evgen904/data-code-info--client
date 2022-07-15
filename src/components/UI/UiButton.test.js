import { render } from "@testing-library/vue";
import UiButton from "./UiButton.vue";

test('renders ui button', () => {
  const { debug } = render(UiButton)

  debug()
})
