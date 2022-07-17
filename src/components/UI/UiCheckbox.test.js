import { render, prettyDOM, screen } from "@testing-library/vue"
import UiCheckbox from "./UiCheckbox"

test('renders checked base ui-checkbox with label', () => {
  const label = 'Text checkbox'
  const options = {
    props: {
      disabled: false,
      modelValue: true
    },
    slots: {
      default: label
    }
  }
  render(UiCheckbox, options)

  // проверим на совпадение текста в label
  const checkbox = screen.getByLabelText(label);

  // вкл-выкл - chckbox
  expect(checkbox.checked).toBe(true)

  // debug - для отображения что хранится в dom дереве
  screen.debug()
})


test.only('renders unchecked base ui-checkbox without label', () => {
  const options = {
    props: {
      disabled: false,
      modelValue: true
    }
  }
  render(UiCheckbox, options)

  // getByDisplayValue - по значению проверяет
  // getByКщду('checkbox') - поиск по атрибуту type="checkbox"
  const checkbox = screen.getByDisplayValue('true');

  // вкл-выкл - chckbox
  expect(checkbox.checked).toBe(true)

  screen.debug()
})
