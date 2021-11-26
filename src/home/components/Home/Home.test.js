import { fireEvent, render, screen } from '@testing-library/react'

import Home from './index'
import { mockBalance } from '../../../tests/mocks'

jest.mock('../../../hooks/useTransactions', () => ({
  __esModule: true,
  default: () => ({ balance: mockBalance }),
}))

test('renders Home screen', () => {
  render(<Home />)
  const userElement = screen.getByText(/4c39b8d6-4c89-458d-ba6b-f1ea4a88abf8/i)
  expect(userElement).toBeInTheDocument()
})

test('show detail modal', () => {
  const openHandler = jest.fn()
  render(<Home onPressRow={openHandler} />)
  const userElement = screen.getByText(/4c39b8d6-4c89-458d-ba6b-f1ea4a88abf8/i)
  fireEvent.click(userElement)
  expect(openHandler).toHaveBeenCalledWith('4c39b8d6-4c89-458d-ba6b-f1ea4a88abf8')
})
