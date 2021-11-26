import React, { useState, useCallback, ReactNode } from 'react'
import { Balance, Transaction } from '../services/TransactionService/types'

interface TransactionsContextProps {
  transactions: Transaction[]
  setTransactions: (transactions: Transaction[]) => void
}

export const TransactionsContext = React.createContext<TransactionsContextProps>({
  transactions: [],
  setTransactions: (transactions: Transaction[]) => {},
})

interface Props {
  children: ReactNode
}

export default function TransactionsProvider(props: Props) {
  const { children } = props

  const [trans, setTrans] = useState<Transaction[]>([])

  const setTransactions = useCallback((transactions: Transaction[]) => {
    setTrans(transactions)
  }, [])

  const contextValue = {
    transactions: trans,
    setTransactions,
  }

  return (
    <TransactionsContext.Provider value={contextValue}>{children}</TransactionsContext.Provider>
  )
}
