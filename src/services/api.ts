import { SERVER_ROOT } from './constants'
import { CallApiType } from './types'

const fullUrl = (endpoint: string) => `${SERVER_ROOT}/${endpoint}`

export const callApi = async (endpoint: string): CallApiType => {
  try {
    const response = await fetch(fullUrl(endpoint))

    if (response.status === 200) {
      const json = await response.json()
      return { response: json }
    }

    return { error: { detail: 'unknown' } }
  } catch (error) {
    return { error: { detail: error } }
  }
}
