import React from 'react';

const ChildrenComponent: React.FC = () => {
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
