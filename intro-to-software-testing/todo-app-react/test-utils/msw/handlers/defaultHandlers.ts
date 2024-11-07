import { delay, HttpResponse } from 'msw';

export default {
  500: () =>
    HttpResponse.json({ statusCode: 500, message: 'Internal server error' }, { status: 500 }),
  ERR_NETWORK: () => HttpResponse.error(),
  LOADING: async () => {
    await delay('real');
    return HttpResponse.json([]);
  },
  INFINITE_LOADING: async () => {
    await delay('infinite');
  },
};
