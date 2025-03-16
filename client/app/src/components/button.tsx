import { useState } from 'react';
import Collapse from '@components/collapse';
import ChildrenComponent from '@components/children';

const Button = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div style={{ padding: '20px' }}>
      <button
        type="button"
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
      <Collapse opened={isOpen}>
        <ChildrenComponent />
      </Collapse>
    </div>
  );
};

export default Button;
