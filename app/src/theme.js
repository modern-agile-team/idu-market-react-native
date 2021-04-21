import { color } from "react-native-reanimated";

const colors = {
    white: '#ffffff',
    black: '#000000',
    grey_0: '#d5d5d5',
    grey_1: '#a6a6a6',
    red: '#e84118',
    blue: '#3679fe',
    idu: '#c4a48c',
    idu2: '#eee5de',
    idu3: '#c97f4e',
  };
  
  export const theme = {
    background: colors.white,
    text: colors.black,
    errorText: colors.red,
    imageBackground: colors.idu,
    label: colors.grey_1,
    inputPlaceholder: colors.grey_1,
    inputBorder: colors.grey_1,
    errorText: colors.red,
    buttonBackground: colors.idu,
    buttonTitle: colors.white,
    buttonUnfilledTitles: colors.red,
    buttonUnfilledTitle: colors.blue,
    spinnerBackground: colors.black,
    spinnerIndicator: colors.white,
    tabActiveColor: colors.idu,
    tabInactiveColor: colors.grey_1,
    buttonLogout: colors.idu,
    inputDisabledBackground: colors.grey_0,
    actionsbgc: colors.idu2,
    actionscircle: colors.idu3,
  }