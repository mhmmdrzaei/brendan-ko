'use client';

import { useEffect, useState } from 'react';

const COLORS = ['blue', 'orange', 'yellow'];

export default function PageTitle({ children }) {
  const [color, setColor] = useState('blue');

  useEffect(() => {
    const random = COLORS[Math.floor(Math.random() * COLORS.length)];
    setColor(random);
  }, []);

  return (
    <h2 className="page-title" data-color={color}>
      {children}
    </h2>
  );
}
