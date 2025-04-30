// eslint-disable-next-line react/function-component-definition
export default function Hotel() {
  return (
    <h1>HOTEL</h1>
  );
}
// import React from 'react';
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   LoaderFunction,
//   useLoaderData,
//   useSearchParams,
// } from 'react-router-dom';

// // Определение типов данных
// type Item = {
//   id: number;
//   name: string;
// };

// // Загрузчик элементов, поддерживающий фильтрацию
// const fetchItems: LoaderFunction = async ({ request }) => {
//   const url = new URL(request.url);
//   const filter = url.searchParams.get('filter') || '';
//   const response = await fetch(`/api/items?filter=${encodeURIComponent(filter)}`);
//   if (!response.ok) {
//     throw new Response('Не удалось загрузить элементы', { status: 404 });
//   }
//   return await response.json();
// };
// // Компонент фильтрации
// const FilterForm = ({ onFilterChange }: { onFilterChange: (filter: string) => void }) => {
//   const handleFilter = (event: React.FormEvent) => {
//     event.preventDefault();
//     const filterValue = (event.target as HTMLFormElement).elements.filter.value;
//     onFilterChange(filterValue); // Вызов функции из родительского компонента
//   };

//   return (
//     <form onSubmit={handleFilter}>
//       <input type="text" name="filter" placeholder="Фильтр" />
//       <button type="submit">Применить фильтр</button>
//     </form>
//   );
// };

// // Компонент списка элементов
// const ItemList = ({ items }: { items: Item[] }) => (
//   <div>
//     <h2>Список элементов</h2>
//     <ul>
//       {items.map((item) => (
//         <li key={item.id}>{item.name}</li>
//       ))}
//     </ul>
//   </div>
// );

// // Основной компонент с маршрутизацией
// const BaseLayout = () => {
//   const items = useLoaderData(); // Получаем элементы из загрузчика
//   const [searchParams, setSearchParams] = useSearchParams();
//   const handleFilterChange = (filterValue: string) => {
//     setSearchParams({ filter: filterValue }); // Изменяем параметры поиска
//   };

//   return (
//     <div style={{ display: 'flex', gap: '20px' }}>
//       <FilterForm onFilterChange={handleFilterChange} /> {/* Передаем функцию как пропс */}
//       <ItemList items={items} />
//     </div>
//   );
// };

// // Определение маршрутов
// const routes = [
//   {
//     path: '/',
//     element: <BaseLayout />,
//     loader: fetchItems,
//   },
// ];

// const router = createBrowserRouter(routes);

// const App = () => <RouterProvider router={router} />;

// export default App;
