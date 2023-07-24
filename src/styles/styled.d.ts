import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    containerBoxColor: string;
    buttonColor: string;
    borderColor: string;
    buttonTextColor: string;
    hoverColor: string;
  }
}
