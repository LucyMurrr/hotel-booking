// Это сейчас главная стпница. Сюда по идее нужно импортировать основной компонент приложения (типа app). (/)
// В этот же каталог (/routes) вносить дополнительные страницы.

import type { Route } from "./+types/home";
import { Button } from "~/src/components/button/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hotel-booking" },
    { name: "description", content: "Welcome to Hotel-booking!" },
  ];
}

export default function Home() {
  return <Button />;
}
