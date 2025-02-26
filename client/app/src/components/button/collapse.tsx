import React, { useState, useEffect, useRef } from 'react';

type CollapseProps = {
  opened: boolean;
  children: React.ReactNode;
};

const Collapse: React.FC<CollapseProps> = ({ opened, children }) => {
  const [maxHeight, setMaxHeight] = useState<number | string>(opened ? 'none' : 0);
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (opened) {
      const contentHeight = el.current?.scrollHeight || 0;
      setMaxHeight(contentHeight);
    } else {
      setMaxHeight(0);
    }
  }, [opened]);

  return (
      <div
        style={{
          overflow: 'hidden',
          maxHeight: maxHeight,
          transition: `max-height ${200}ms ease`,
        }}
      >
        <div ref={el}>{children}</div>
      </div>
  );
};

export { Collapse };
