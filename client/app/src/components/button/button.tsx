import { Collapse } from './collapse'
import { useState } from 'react';
import ChildrenComponent from './children';

const Button: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={toggleCollapse}
        style={{
          marginBottom: '16px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {isOpen ? 'Close' : 'Booking-Hotels'}
      </button>
      {/* <SomeElement></SomeElement> */}
      <Collapse opened={isOpen} timeout={200}>
        <ChildrenComponent />
      </Collapse>
    </div>
  );
};

export { Button };
