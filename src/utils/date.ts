export const apiFormatDate = (date: string): string => date.split('T')[0]

export const convertToDateTime = (date: string): string =>
  date.split('T')[0] + ' (' + date.split('T')[1].slice(0, -1) + ')'
