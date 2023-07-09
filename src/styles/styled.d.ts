import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: {
        main: string;
        pressed: string;
        bg: string;
      };
      red: string;
      white: string;
      black: string;
      gray: { [key: string] };
    };
  }
}
