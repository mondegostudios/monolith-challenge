import { useCallback, useContext, useEffect, useState } from 'react'
import TransactionsService from '../services/TransactionService/'
import { Balance, Transaction } from '../services/TransactionService/types'
import { isSuccessType } from '../services/types'
import { TransactionsContext } from '../contexts/TransactionsProvider'

const useTransactions = () => {
  const { transactions, setTransactions } = useContext(TransactionsContext)
  const [balance, setBalance] = useState<Record<string, Balance>>()

  const getTransactions = async () => {
    const data = await TransactionsService.requestTransactions()

    const trans: Transaction[] = []
    let blc: Record<string, Balance> = {}

    if (data && isSuccessType(data) && data.response.length) {
      data.response.map((item: Transaction) => trans.push(item))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const sortedTransactions = trans.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      setTransactions(sortedTransactions)

      blc = generateBalances(data.response)
    }

    setBalance(blc)
  }

  const generateBalances = useCallback((data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return data.reduce((acc, tr: Transaction) => {
      // prettier-ignore
      acc[tr.user_id] = acc[tr.user_id] || []

      if (acc[tr.user_id].last_activity) {
        const balance: Balance = acc[tr.user_id]
        const currencyBalance = balance.currencies[tr.currency]
        if (currencyBalance) {
          let amnt = Number(currencyBalance.amount)
          amnt += Number(tr.amount)
          currencyBalance.amount = amnt.toFixed(2).toString()
          balance.currencies[tr.currency] = currencyBalance
        } else {
          balance.currencies[tr.currency] = { amount: tr.amount }
        }

        if (new Date(balance.last_activity) < new Date(tr.timestamp))
          balance.last_activity = tr.timestamp

        acc[tr.user_id] = balance
      } else {
        const balance: Balance = {
          last_activity: tr.timestamp,
          currencies: {},
        }

        balance.currencies[tr.currency] = { amount: tr.amount }
        acc[tr.user_id] = balance
      }

      return acc
    }, [])
  }, [])

  useEffect(() => {
    getTransactions()
  }, [])

  return { balance, transactions }
}

export default useTransactions
