import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      green: string;
      lightGreen: string;
      deepGreen: string;
      red: string;
      gray: string[];
      blue: string;
      deepBlue: string;
    };
  }
}
