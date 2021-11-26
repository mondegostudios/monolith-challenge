import { fireEvent, render, screen } from '@testing-library/react'
import UserDetailModal from './index'
import { TransactionsContext } from '../../contexts/TransactionsProvider'
import { mockTransactions } from '../../tests/mocks'

test('renders UserDetailModal', () => {
  render(<UserDetailModal userId="xpto" />)
  const titleElement = screen.getByText(/xpto/i)
  expect(titleElement).toBeInTheDocument()
  const debitLinkElement = screen.getByText(/DEBIT/i)
  expect(debitLinkElement).toBeInTheDocument()
  const creditLinkElement = screen.getByText(/CREDIT/i)
  expect(creditLinkElement).toBeInTheDocument()
  const gbpLinkElement = screen.getByText(/GBP/i)
  expect(gbpLinkElement).toBeInTheDocument()
  const usdLinkElement = screen.getByText(/USD/i)
  expect(usdLinkElement).toBeInTheDocument()
  const eurLinkElement = screen.getByText(/EUR/i)
  expect(eurLinkElement).toBeInTheDocument()
})

test('close modal', () => {
  const closeHandler = jest.fn()
  render(<UserDetailModal userId="xpto" onClose={closeHandler} />)
  const el = document.getElementsByClassName('MuiBackdrop-root')[0]
  fireEvent.click(el)
  expect(closeHandler).toHaveBeenCalledTimes(1)
})

const defaultProps = {
  transactions: mockTransactions,
}

test('show user detail', () => {
  render(
    <TransactionsContext.Provider value={defaultProps}>
      <UserDetailModal userId="b4521412-2eeb-43f3-a50d-be976b23189d" />
    </TransactionsContext.Provider>
  )
  const amountForUserElement = screen.getByText(/886.69/i)
  expect(amountForUserElement).toBeInTheDocument()
})

test('set filter', () => {
  render(
    <TransactionsContext.Provider value={defaultProps}>
      <UserDetailModal userId="b4521412-2eeb-43f3-a50d-be976b23189d" />
    </TransactionsContext.Provider>
  )

  const el = screen.getByText('EUR')
  fireEvent.click(el)

  const amountForUserElement = screen.queryByText(/886.69/i)
  expect(amountForUserElement).not.toBeInTheDocument()
})
