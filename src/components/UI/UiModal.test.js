import { render, prettyDOM, screen, fireEvent } from "@testing-library/vue"
import UiModal from "./UiModal"

test('renders modal with body and header', () => {
  const body = 'Thie is modal body'
  const header = 'Thie is modal header'

  const options = {
    slots: {
      default: body,
      header
    }
  }

  render(UiModal, options)

  screen.getByText(body)
  screen.getByText(header)
})

test.only('closes modal when clicking close button', async () => {
  const body = 'Thie is modal body'
  const options = {
    slots: {
      default: body,
    }
  }

  render(UiModal, options)

  await fireEvent.click(screen.getByTestId('ui-dialog--close'))

  screen.debug()

  expect(screen.queryByText(body)).toBeNull()
  expect(screen.queryByTestId('ui-dialog--content')).toBeNull()
})

