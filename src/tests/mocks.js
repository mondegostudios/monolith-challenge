export const mockTransactions = [
  {
    user_id: 'b4521412-2eeb-43f3-a50d-be976b23189d',
    timestamp: '2020-05-29T16:59:39Z',
    currency: 'GBP',
    amount: '-886.69',
  },
  {
    user_id: '9e92a331-81be-44b2-bf45-1fec891ebe42',
    timestamp: '2019-12-05T18:28:13Z',
    currency: 'EUR',
    amount: '-853.62',
  },
  {
    user_id: '4c39b8d6-4c89-458d-ba6b-f1ea4a88abf8',
    timestamp: '2020-06-10T17:14:25Z',
    currency: 'GBP',
    amount: '-81.71',
  },
  {
    user_id: 'ec28d8b8-1320-4e35-88ef-700c3eec750a',
    timestamp: '2019-10-03T03:42:25Z',
    currency: 'GBP',
    amount: '+690.67',
  },
  {
    user_id: '32138630-53c5-40df-973d-497b306f0576',
    timestamp: '2020-06-28T19:01:45Z',
    currency: 'USD',
    amount: '-618.50',
  },
  {
    user_id: '6f6c005c-bb46-47d3-b560-800a67798e70',
    timestamp: '2020-06-21T16:37:05Z',
    currency: 'EUR',
    amount: '+380.19',
  },
  {
    user_id: '58b906e2-df1e-4b1c-a9c5-eced03801299',
    timestamp: '2019-11-19T16:49:22Z',
    currency: 'EUR',
    amount: '-604.56',
  },
  {
    user_id: 'febdf476-bee6-4337-8347-3b2e501425c6',
    timestamp: '2019-09-14T23:13:41Z',
    currency: 'EUR',
    amount: '-767.01',
  },
  {
    user_id: '308020fa-2074-4ac5-afa6-d514b35c5962',
    timestamp: '2019-11-19T08:42:09Z',
    currency: 'GBP',
    amount: '-538.02',
  },
  {
    user_id: '58b906e2-df1e-4b1c-a9c5-eced03801299',
    timestamp: '2020-03-14T18:40:29Z',
    currency: 'GBP',
    amount: '-751.10',
  },
]

export const mockBalance = {
  '4c39b8d6-4c89-458d-ba6b-f1ea4a88abf8': {
    currencies: {
      GBP: {
        amount: '-81.71',
      },
    },
    last_activity: '2020-05-11T17:14:25Z',
  },
  '231123312-4c89-458d-ba6b-f1ea4a88abf8': {
    currencies: {
      GBP: {
        amount: '+100.71',
      },
      EUR: {
        amount: '-45.71',
      },
    },
    last_activity: '2020-03-20T17:14:25Z',
  },
  'aaaaaaa-4c89-458d-ba6b-f1ea4a88abf8': {
    currencies: {
      GBP: {
        amount: '-8.74',
      },
    },
    last_activity: '2020-04-12T17:14:25Z',
  },
  'bbbbbbb-4c89-458d-ba6b-f1ea4a88abf8': {
    currencies: {
      GBP: {
        amount: '-992.71',
      },
      USD: {
        amount: '1005.00',
      },
    },
    last_activity: '2019-06-10T17:14:25Z',
  },
}
