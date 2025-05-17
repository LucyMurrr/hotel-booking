import fs from 'fs/promises';
import path from 'path';

const counter_file = path.resolve('./', 'counter_file.json');

let counter = 0;

export default async () => {
  try {
    const data = await fs.readFile(counter_file, 'utf8');
    counter = JSON.parse(data).value || 0;
  } catch (e) {
    console.log('Файл счетчика не найден.');
  }
  counter++;
  await fs.writeFile(counter_file, JSON.stringify({ value: counter }));
  return counter;
};
  