import { DefaultApi, Configuration } from '@generatedClient/index';

// const ssrConfig = new Configuration({
//   // первые три - мок-сервер
//   // basePath: 'http://127.0.0.1:4010', // для запуска в vite (в клиенте)
//   // basePath: 'http://host.docker.internal:4010', // в linux может не работать
//   // basePath: 'http://host.docker.internal:5432',
//   basePath: 'http://host.docker.internal:8080', // настоящий бэк
// });
// const ssrClient = new DefaultApi(ssrConfig);

const config = new Configuration({
  basePath: 'http://localhost:8080',
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
