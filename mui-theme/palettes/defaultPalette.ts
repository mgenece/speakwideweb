// ** Type Imports
import { Palette } from '@mui/material';

export const defaultPalette = (mode: Palette['mode']): Palette => {
  // ** Vars
  const whiteColor = '#FFFFFF';
  const lightColor = '#3A3A3A'; // Hex equivalent of '47, 43, 61'
  const darkColor = '#333333'; // Hex equivalent of '208, 212, 241'
  const darkPaperBgColor = '#2F3349';
  const mainColor = mode === 'light' ? darkColor : darkColor;
  const defaultBgColor = whiteColor;
  const PrimaryMain = '#8142E9';

  // Convert RGBA to Hex with opacity
  const hexWithOpacity = (hex: string, opacity: number) => {
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0');

    return `${hex}${alpha}`;
  };

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      bodyBg: mode === 'light' ? '#F8F7FA' : '#25293C', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#F1F0F2' : '#363B54',
      avatarBg: mode === 'light' ? '#DBDADE' : '#4A5072',
      tableHeaderBg: mode === 'light' ? '#F6F6F7' : '#4A5072',
      placeText: '#9EA0A4',
      primary100: '#D7BFFF',
      primary200: '#F1E9FF',
      primary300: '#C9A8FF',
      primary400: '#8841FF',
      primary500: '#E1CFFF',
      primary600: '#EFE6FF',
      primary700: '#F7F3FF',
      primary800: '#FBF8FF',
      primary900: '#F3EBFF',
      primary1000: '#F1E8FF',
      colorf6f6f6: '#f6f6f6',
      colore8e8e8: '#e8e8e8',
      inputBorder: hexWithOpacity(PrimaryMain, 0.04),
      darkTextColor: '#292D32',
      lightPurple: '#C7A4FF',
      tabrootBorder: '#ECE1FF',
      tabTableBorder: '#EFE5FF',
      colorFFF4F4: '#FFF4F4',
      lightBorderColor: '#F4E3FF',
      colorF7F7F7: '#F7F7F7',
      colorFFF9F3: '#FFF9F3',
      lightPrimaryBorder: '#E6DFFF',
      colorfcfbff: '#FCFBFF',
      colore9dbff: '#e9dbff',
      colorD0B3FF: '#D0B3FF',
      colorF0E7FF: '#F0E7FF',
      colorDCDBFF: '#DCDBFF',
      colorF0F7FF: '#F0F7FF',
      colorF8F4FF: '#F8F4FF',
      colorFBF9FF: '#FBF9FF',
      colorF2EAFF: '#F2EAFF',
      colorD5BEFF: '#D5BEFF',
      colorF9F5FF: '#F9F5FF',
      colorDCDCDC: '#DCDCDC',
      colorE7E7E7: '#E7E7E7',
      color515151: '#515151',
      msgActiveBg: '#F9F9F9',
      color1C1B1F: '#1C1B1F',
      color7879F1: '#7879F1',
      colorF8F8F8: '#F8F8F8',
      color878787: '#878787',
      chipBg: '#EFEFEF',
      chatBorder: '#A5A6F6',
      color225DFF: '#225DFF',
      colorEBDFFF: '#EBDFFF',
      borderColor: '#ECECEC',
      colorFD2420: '#FD2420',
      colordec9ff: '#dec9ff',
      color383838: '#383838',
      btnBg: '#FAF7FF',
      chatBgLight: '#B588FF',
      placholderColor: '#C1C1C1',
      redText: '#FF7361',
      borderColor2: '#F0E6FF',
      ratingBgColor: '#F8F8FA',
      colorDFFBFF: '#DFFBFF',
      colorFFF0EF: '#FFF0EF',
      colorFF4C35: '#FF4C35',
      colorF7F2FF: '#F7F2FF',
      colorE8DAFF: '#E8DAFF',
      colorD7D7D7: '#D7D7D7',
      borderColor3: '#E6E6E6',
      color2A9F7C: '#2A9F7C',
      colorDCFDF3: '#DCFDF3',
      borderColor4: '#D9D9D9',
      color5F57E7: '#5F57E7',
      borderColor5: '#EADDFF',
    },
    mode: mode,
    common: {
      black: '#000000',
      white: whiteColor,
    },
    primary: {
      light: '#F8F3FF',
      main: PrimaryMain,
      dark: '#C7ABF5',
      contrastText: whiteColor,
    },
    secondary: {
      light: '#B2B4B8',
      main: '#DFFF00',
      dark: '#C0F060',
      contrastText: whiteColor,
    },
    error: {
      light: '#ED6F70',
      main: '#FF2828',
      dark: '#FF4A47',
      contrastText: whiteColor,
    },
    warning: {
      light: '#FFAB5A',
      main: '#FFBE79',
      dark: '#E08C3B',
      contrastText: whiteColor,
    },
    info: {
      light: '#1FD5EB',
      main: '#00879B',
      dark: '#00B6CC',
      contrastText: whiteColor,
    },
    success: {
      light: '#42CE80',
      main: '#28C76F',
      dark: '#23AF62',
      contrastText: whiteColor,
    },
    grey: {
      50: '#FBFBFB',
      100: '#AAAAAA',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#14181F',
      A100: '#F1F1F1',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#777777',
    },
    text: {
      primary: '#120248',
      secondary: hexWithOpacity(mainColor, 0.68),
      disabled: hexWithOpacity(mainColor, 0.42),
    },
    divider: hexWithOpacity(mainColor, 0.16),
    background: {
      paper: mode === 'light' ? whiteColor : darkPaperBgColor,
      default: defaultBgColor,
    },
    action: {
      active: hexWithOpacity(mainColor, 0.54),
      hover: hexWithOpacity(mainColor, 0.04),
      selected: hexWithOpacity(mainColor, 0.06),
      selectedOpacity: 0.06,
      disabled: hexWithOpacity(mainColor, 0.26),
      disabledBackground: hexWithOpacity(mainColor, 0.12),
      focus: hexWithOpacity(mainColor, 0.12),
    },
  } as Palette;
};
