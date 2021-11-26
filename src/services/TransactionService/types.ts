export type Currency = 'EUR' | 'GBP' | 'USD'

export interface Transaction {
  amount: string
  currency: Currency
  timestamp: string
  user_id: string
}

interface CurrencyAmount {
  amount: string
}

export interface Balance {
  last_activity: string
  currencies: {
    GBP?: CurrencyAmount
    EUR?: CurrencyAmount
    USD?: CurrencyAmount
  }
}
