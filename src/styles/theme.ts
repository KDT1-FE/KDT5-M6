import { DefaultTheme } from 'styled-components';

//상세 디자인 스타일은 우주부동산 피그마에 정리되어 있습니다.
export const theme: DefaultTheme = {
  colors: {
    blue: {
      main: '#4464FF', // Blue : 프로젝트 메인 컬러, 수입 항목 + 플러스 값
      pressed: '#2C3D8F', // Deep blue : 버튼 클릭 상태 컬러
      bg: '#CDDEFF' // Light blue : 버튼 클릭하지 않은 상태, input,list등 넓은 면적 또는 bg
    },
    black: '#1F1F1F', //기본 블랙, 텍스트 + 배경 사용
    white: '#FFFFFF', // Box bg
    red: '#FF6969', //소비 항목 + 마이너스 값
    // green: '#41EE53'
    gray: [
      '#6A6E83', //[0] Dark Gray
      '#A8B1CE', //[1] Light Gray
      '#F8F9FD' //[2] White Gray
    ]
  }
};

