import { CallApiType } from '../types'
import { callApi } from '../api'

const requestTransactions = async (): CallApiType => await callApi('transactions-large.json')

export default { requestTransactions }
