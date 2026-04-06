declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      dark: string;
      main: string;
      light: string;
      bodyBg: string;
      trackBg: string;
      avatarBg: string;
      darkPaperBg: string;
      lightPaperBg: string;
      tableHeaderBg: string;
      placeText: string;
      primary100: string;
      primary200: string;
      primary300: string;
      primary400: string;
      primary500: string;
      primary600: string;
      primary700: string;
      primary800: string;
      primary900: string;
      primary1000: string;
      inputBorder: string;
      colorf6f6f6: string;
      colore8e8e8: string;
      darkTextColor?: string;
      lightPurple?: string;
      tabrootBorder: string;
      tabTableBorder: string;
      colorFFF4F4: string;
      lightBorderColor?: string;
      colorF7F7F7?: string;
      colorFFF9F3?: string;
      lightPrimaryBorder: string;
      colorfcfbff?: string;
      colore9dbff?: string;
      colorD0B3FF?: string;
      colorF0E7FF?: string;
      colorDCDBFF?: string;
      colorF0F7FF?: string;
      colorF8F4FF?: string;
      colorFBF9FF?: string;
      colorF2EAFF?: string;
      colorD5BEFF?: string;
      colorF9F5FF?: string;
      colorDCDCDC?: string;
      colorE7E7E7?: string;
      color515151?: string;
      msgActiveBg?: string;
      color1C1B1F?: string;
      color7879F1?: string;
      colorF8F8F8?: string;
      color878787?: string;
      chipBg?: string;
      chatBorder?: string;
      color225DFF?: string;
      colorEBDFFF?: string;
      borderColor?: string;
      colorFD2420?: string;
      colordec9ff?: string;
      color383838?: string;
      colorDFFBFF?: string;
      colorFFF0EF?: string;
      colorFF4C35?: string;
      colorF7F2FF?: string;
      colorE8DAFF?: string;
      btnBg?: string;
      chatBgLight?: string;
      placholderColor?: string;
      redText?: string;
      borderColor2?: string;
      ratingBgColor?: string;
      colorD7D7D7?: string;
      borderColor3?: string;
      color2A9F7C?: string;
      colorDCFDF3?: string;
      borderColor4?: string;
      color5F57E7?: string;
      borderColor5?: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      dark?: string;
      main?: string;
      light?: string;
      bodyBg?: string;
      trackBg?: string;
      avatarBg?: string;
      darkPaperBg?: string;
      lightPaperBg?: string;
      tableHeaderBg?: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    tonal: true;
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    tonal: true;
  }
}

export {};
