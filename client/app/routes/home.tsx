// eslint-disable-next-line max-len
// Это сейчас главная страница. Сюда по идее нужно импортировать основной компонент приложения (типа app). (/)
// В этот же каталог (/routes) вносить дополнительные страницы.

import Button from '@components/button';
import type { Route } from './+types/home';

// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Hotel-booking' },
    { name: 'description', content: 'Welcome to Hotel-booking!' },
  ];
}

const Home = () => <Button />;

export default Home;
