import { DefaultApi, Configuration } from '@generatedClient/index';

const config = new Configuration({
  basePath: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://hexling.ru/api',
  fetchApi: async (url, init) => {
    const token = localStorage.getItem('token');
    const headers = new Headers(init?.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(url, {
      ...init,
      headers,
    });
  },
});
const client = new DefaultApi(config);

export default client;
export * from '@generatedClient/index';
