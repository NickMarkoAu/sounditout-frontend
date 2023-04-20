import {Unbounded_400Regular, NotoSans_400Regular, useFonts} from "@expo-google-fonts/dev";

export interface Theme {
  colours: {
    primary: string,
    secondary: string,
    background: string,
    text_primary: string,
    text_error: string,
    text_dark: string,
    grey: string
  },
  fonts: {
    primary: string;
  }
}

export const theme = {
  colours: {
    primary: "#F6BD60",
    secondary: "#5D2A42",
    grey: "#727272",
    background: "#0C171C",
    text_primary: "#FFFFFF",
    text_error: "#F9061B",
    text_dark: "#000000"
  },
  fonts: {
    primary: "Unbounded_400Regular",
    secondary: "NotoSans_400Regular"
  }
}