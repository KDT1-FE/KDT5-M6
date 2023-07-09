import { DefaultTheme } from 'styled-components';

//상세 디자인 스타일은 우주부동산 피그마에 정리되어 있습니다.
export const theme: DefaultTheme = {
  colors: {
    blue: {
      main: '#4464FF', //프로젝트 메인 컬러, 수입 항목 + 플러스 값
      pressed: '#2C3D8F', //버튼 클릭 상태 컬러
      bg: '#CDDEFF' //버튼 클릭하지 않은 상태, input,list등 넓은 면적 또는 bg
    },
    red: '#FF6969', //소비 항목 + 마이너스 값
    black: '#1F1F1F', //기본 블랙, 텍스트 + 배경 사용
    white: '#FFFFFF', // Box bg
    // green: '#41EE53', //사용안하게 된 녹색 값^^
    gray: [
      '#6A6E83', //[0] 현재 사용되지 않음
      '#A8B1CE', //[1] 현재 사용되지 않음
      '#F8F9FD' //[2] input 박스 배경
    ]
  }
};
