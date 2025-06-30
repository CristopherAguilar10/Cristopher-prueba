import { useState, useCallback, useEffect } from 'react';

export const useWheelRotation = () => {
  const [rotation, setRotation] = useState(0);

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault(); // evita scroll vertical de la página
    const delta = e.deltaY;
    setRotation((r) => r + delta * 0.3);
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
    };
  }, [onWheel]);

  return { rotation };
};
