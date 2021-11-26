import React from 'react'
import HomeScreen from './home/containers/HomeScreen'
import TransactionsProvider from './contexts/TransactionsProvider'

const App = () => {
  return (
    <TransactionsProvider>
      <HomeScreen />
    </TransactionsProvider>
  )
}

export default App
