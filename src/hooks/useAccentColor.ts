import { AccentColorContext } from '@/context/AccentColorContext';
import { useContext } from 'react';

export const useAccentColor = () => {
  const accentColorContext = useContext(AccentColorContext);

  // accentColorContext가 undefined인 경우 === wrapping을 벗어난 곳에서 사용하는 경우
  if (!accentColorContext) {
    throw new Error('래핑 잘해라');
  }
  const { accentColor, handleAccentColor } = accentColorContext;

  return { accentColor, handleAccentColor };
};
