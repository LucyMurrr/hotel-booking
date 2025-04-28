import { DefaultApi, Configuration } from '@generatedClient/index';

const config = new Configuration({
  basePath: 'http://127.0.0.1:4010', // для запуска в vite (в клиенте)
  // basePath: 'http://host.docker.internal:4010', // в linux может не работать
});

const client = new DefaultApi(config);

export default client;
export * from '@generatedClient/index';
