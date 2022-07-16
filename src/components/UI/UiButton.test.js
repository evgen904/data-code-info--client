import { render, prettyDOM, screen } from "@testing-library/vue"
import UiButton from "./UiButton"

// prettyDOM - отображает дом дерево
// screen - тоже что и prettyDOM
// {
//   debug: [Function: debug],
//   logTestingPlaygroundURL: [Function: logTestingPlaygroundURL],
//   findAllByLabelText: [Function: bound ],
//   findByLabelText: [Function: bound ],
//   getAllByLabelText: [Function: bound ],
//   getByLabelText: [Function: bound ],
//   queryAllByLabelText: [Function: bound ],
//   queryByLabelText: [Function: bound ],
//   findAllByPlaceholderText: [Function: bound ],
//   findByPlaceholderText: [Function: bound ],
//   getAllByPlaceholderText: [Function: bound ],
//   getByPlaceholderText: [Function: bound ],
//   queryAllByPlaceholderText: [Function: bound ],
//   queryByPlaceholderText: [Function: bound ],
//   findAllByText: [Function: bound ],
//   findByText: [Function: bound ],
//   getAllByText: [Function: bound ],
//   getByText: [Function: bound ],
//   queryAllByText: [Function: bound ],
//   queryByText: [Function: bound ],
//   findAllByDisplayValue: [Function: bound ],
//   findByDisplayValue: [Function: bound ],
//   getAllByDisplayValue: [Function: bound ],
//   getByDisplayValue: [Function: bound ],
//   queryAllByDisplayValue: [Function: bound ],
//   queryByDisplayValue: [Function: bound ],
//   findAllByAltText: [Function: bound ],
//   findByAltText: [Function: bound ],
//   getAllByAltText: [Function: bound ],
//   getByAltText: [Function: bound ],
//   queryAllByAltText: [Function: bound ],
//   queryByAltText: [Function: bound ],
//   findAllByTitle: [Function: bound ],
//   findByTitle: [Function: bound ],
//   getAllByTitle: [Function: bound ],
//   getByTitle: [Function: bound ],
//   queryAllByTitle: [Function: bound ],
//   queryByTitle: [Function: bound ],
//   findAllByRole: [Function: bound ],
//   findByRole: [Function: bound ],
//   getAllByRole: [Function: bound ],
//   getByRole: [Function: bound ],
//   queryAllByRole: [Function: bound ],
//   queryByRole: [Function: bound ],
//   findAllByTestId: [Function: bound ],
//   findByTestId: [Function: bound ],
//   getAllByTestId: [Function: bound ],
//   getByTestId: [Function: bound ],
//   queryAllByTestId: [Function: bound ],
//   queryByTestId: [Function: bound ]
// }

// 1й параметр описание теста, 2й параметр логика теста
test('renders ui-button', () => {
  // given (arrange) - 1я часть, подготовка перед тестированием
  const options = {
    slots: {
      default: 'Test button'
    }
  }

  //when (act) - 2я часть, выполняем определенные действия, код который тестируем
  render(UiButton, options)
  // render(UiButton)
  // render(UiButton)


  // then (assert) - 3я часть, проверяем совпадает ли действительное с ожидаемым
  // /Test/i - регулярка
  screen.getByText(/Test butto/i)
  //console.log(prettyDOM());
})
