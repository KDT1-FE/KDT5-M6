import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: {
        main: string;
        pressed: string;
        bg: string;
      };
      black: {
        black30: string;
        black50: string;
        black100: string;
      };
      red: string;
      white: string;
      gray: { [key: string] };
    };
  }
}
