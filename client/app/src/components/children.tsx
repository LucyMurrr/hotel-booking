import { useEffect } from 'react';

import client from '@api';

const fetch = async () => {
  try {
    const resp = await client.amenitiesListAmenities();
    console.log(resp); // eslint-disable-line no-console
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
};

const ChildrenComponent = () => {
  useEffect(() => {
    fetch(); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, []);

  return (
    <div
      style={{
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <h3>Выберите отель:</h3>
      <ul>
        <li>Overlook</li>
        <li>Отель у погибшего альпиниса</li>
        <li>Bates</li>
        <li>Chelsea Hotel</li>
        <li>Laguna negra</li>
        <li>Cecil Hotel</li>
        <li>Hotel Cortez</li>
        <li>Англетер</li>
        <li>Dolphin Hotel (1408)</li>
        <li>Hotel del coronado</li>
        <li>Mysterio</li>
      </ul>
    </div>
  );
};

export default ChildrenComponent;
