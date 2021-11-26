import { useContext, useMemo } from 'react'
import { TransactionsContext } from '../contexts/TransactionsProvider'

interface Params {
  userId?: string
}

const useUserDetails = (params: Params) => {
  const { userId } = params
  const { transactions } = useContext(TransactionsContext)

  const userDetails = useMemo(() => {
    if (userId && transactions.length > 0) {
      return transactions.filter((item) => item.user_id === userId)
    }

    return undefined
  }, [userId, transactions])

  return { userDetails }
}

export default useUserDetails
