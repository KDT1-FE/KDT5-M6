/* eslint-disable no-unused-vars */
import getAccentColorFromLocalStorage from '@/utils/getAccentColorFromLocalStorage';
import React, { createContext, useState } from 'react';

// AccentColorContext 객체에 들어갈 요소들의 타입을 지정
export interface AccentColorContextType {
  // hex값으로 표시될 강조색
  accentColor: string;
  // 강조색을 변경하는 함수
  handleAccentColor: (color: string) => void;
}

// AccentColorContext의 초기값을 지정
// 해당 값의 타입은 당연히 AccentColorContextType
// 그리고 undefined로 지정
export const AccentColorContext = createContext<
  AccentColorContextType | undefined
>(undefined);

export default function AccentColorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 강조색 useState
  const [accentColor, setAccentColor] = useState(() =>
    // 로컬저장소에 accentColor가 있으면 가져와서 accentColor에 지정, 없으면 '#87e4ac' 지정
    getAccentColorFromLocalStorage(),
  );

  const handleAccentColor = (color: string) => {
    setAccentColor(color);
  };

  // 전역에서 사용하고 싶은 값들
  const accentColorContextValue: AccentColorContextType = {
    accentColor,
    handleAccentColor,
  };

  return (
    <AccentColorContext.Provider value={accentColorContextValue}>
      {children}
    </AccentColorContext.Provider>
  );
}
