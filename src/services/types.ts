interface Success {
  response: Record<string, any>
}

interface Failed {
  error: Record<string, any>
}

export type CallApiType = Promise<Success | Failed | undefined>

export const isSuccessType = (item: Success | Failed): item is Success => {
  return (item as Success).response !== undefined
}
