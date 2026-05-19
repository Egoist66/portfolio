import "styled-components";
import { ThemeStyleInterface } from "../theme/theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeStyleInterface {}
}
