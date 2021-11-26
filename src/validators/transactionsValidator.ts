import { Transaction } from '../services/TransactionService/types'

export const isTransactionValid = (transaction: Transaction): boolean =>
  ['GBP', 'EUR', 'USD'].includes(transaction?.currency) ||
  !transaction.amount ||
  !transaction.timestamp
