/**
 *
 */

export const Fonts = {
  Roman: 'AvenirLTStd-Roman',
  Heavy: 'AvenirLTStd-Heavy',
  Light: 'AvenirLTStd-Light',
  Medium: 'AvenirLTStd-Medium',
  Black: 'AvenirLTStd-Black',
  Book: 'AvenirLTStd-Book',

  BrandBlack: 'Averta-Black',
  BrandBold: 'Averta-Bold',
  BrandExtrabold: 'Averta-Extrabold',
  BrandSemibold: 'Averta-Semibold',
  BrandLight: 'Averta-Light',
  BrandRegular: 'Averta-Regular',
  BrandThin: 'Averta-Thin',
  BrandExtraThin: 'Averta-ExtraThin'
};

export const FontSize = {
  Micro: 8,
  Mini: 10,
  XSmall: 12,
  Small: 14,
  Medium: 16,
  Large1: 18,
  Large2: 20,
  Large3: 22,
  Large4: 23,
  XLarge: 24,
  XXLarge: 28,
  XXXLarge: 32,
  Huge: 36
};
export const Colors = {
  /* COMMON */
  /* screen background color */
  screenBgColor: '#fff',
  separatorColor: '#efefef',
  creamColor: '#f4f4f4',
  searchPlaceholderGray: '#a7a7a7',

  /*form elements color*/
  radioBtnBorderColor: '#3b98fc',
  inputBgColor: '#fff',
  fieldPlaceholderColor: '#86888A',
  fieldTextColor: '#86888A',
  darkGray: '#6a6c6e',

  /* button style */
  buttonBgColor: '#202859',
  buttonTextColor: '#fff',

  /* link text style */
  linkColor: '#70cff3',

  noteColor: '#888888',

  formTitleColor: '#000',

  disabledBtnBgColor: '#f2f2f2',
  disabledBtnTextColor: '#bfbfc0',

  errMessageColor: '#d40000',

  /*text input colors*/
  borderColor: '#E4E7EA',

  backBtnColor: '#52A8DC',
  sectionTitleColor: '#181C47',
  sectionSeparatorLineColor: '#202859',

  transparent: 'transparent',

  /*Screen Specific*/

  /*onboarding screen*/
  registerBtnBgColor: '#52a8dd',
  cyanBtnColor: '#00DAF9',

  /*Login and Sign Up screen*/
  disabledGray: '#f8f8f8',
  normalTextColor: '#a2a0a0',
  instaremRed: '#f92929',
  instaremLightestGray: '#f5f5f5',
  instaremLightGray: '#b6b6b6',
  instaremGreen: '#57b578',
  instaremBlue: '#202859',
  instaremBlueLight: '#52a8dd',
  instaremGray: '#e4e4e4',
  instaremDisable: '#9b9b9b',
  instaremWhite: '#ffffff',
  instaremDenimBlue: '#354087',
  instaremTextBg: '#46aeee',
  instaremDarkBlue: '#354087',
  instaremSkyBlue: '#46aeee',
  instaremBlack: '#000',
  instaremPageTitle: '#354087',
  instaremBtnBgColor: '#354087',
  instaremBorderSeparatorColor: '#bfbfbf',
  currencyConverterTextColor: '#46aeee',
  instaremSecondaryButtonBg: '#fff',
  instaremSecondaryButtonText: '#46aeee',
  instaremCurrencyText: '#354087',
  instaremSuccessMsg: '#57b578',
  textFieldValue: '#354087',
  labelColor: '#202859',
  overlay: 'rgba(0, 0, 0, 0.5)',
  activityIndicator: '#b6b6b6',
  instaremOrange: '#f7a454',
  instaremErrRed: '#f77961',
  instaremFieldBlueColor: '#46aeee',
  instaremTextColor: '#a7a7a7',
  timelineDotLight: '#08abdf',
  instaLightText: '#c1c1c1',
  timeLineBorderColor: '#ebebeb',
  transactionSummarySeparator: '#efefef',
  cardBorder: '#efefef',
  transparent: 'rgba(0,0,0,0)',

  /* Send Money */
  infoText: '#949494',
  transactionSummaryText: '#a7a7a7',
  transactionSummaryHighBr: '#354087',

  optionDotColor: '#00a9df',

  myInfoText: '#9b9b9b',

  gray: '#979797',
  grayShadeText: '#9b9b9b',
  blinkerColor: '#7ed321',

  /*Card */

  blueGradientStart: '#2974D2',
  blueGradientMid: '#253494',
  blueGradientEnd: '#1F2C80',
  blueGray: '#8FA3C1',
  blueGrayBorderLight: '#E6E9F0',
  headerGray: '#E9EAF4',
  cardOverlay: 'rgba(0, 19, 45, 0.8)',

  /*AmazeCard */
  purpleDark: '#300551',
  purpleMild: '#AC37EB',
  purpleGradientStart: '#AF37EB',
  purpleGradientEnd: '#8500CD',
  greyMid: '#746F9F',
  greenSuccess: '#00A8A6',
  purpleLight: '#E7BAFF',
  grayMild: '#746F9F',
  grayDark: '#393939',
  grayLight: '#DFDEEA',
  brandPurple: '#752EFF',
  brandGreen: '#00DBD8',
  brandYellow: '#FED931',
  brandPink: '#00DBD8'
};

export const Themes = {
  Light: {
    PrimaryButton: {
      textColor: Colors.instaremWhite,
      backgroundColor: Colors.buttonBgColor,
      borderColor: Colors.buttonBgColor,
      activeTextColor: Colors.instaremWhite,
      activeBackgroundColor: Colors.buttonBgColor,
      activeBorderColor: Colors.buttonBgColor
    },
    SecondaryButton: {
      textColor: Colors.buttonBgColor,
      backgroundColor: Colors.transparent,
      borderColor: Colors.buttonBgColor,
      activeTextColor: Colors.buttonBgColor,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.buttonBgColor
    },
    DisabledButton: {
      textColor: Colors.greyMid,
      backgroundColor: Colors.transparent,
      borderColor: Colors.greyMid,
      activeTextColor: Colors.greyMid,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.greyMid
    },
    GradientButton: {
      textColor: Colors.instaremWhite,
      backgroundColorGradientStart: Colors.blueGradientStart,
      backgroundColorGradientMid: Colors.blueGradientMid,
      backgroundColorGradientEnd: Colors.blueGradientEnd,
      activeTextColor: Colors.instaremWhite,
      activeBackgroundColor: Colors.buttonBgColor,
      activeBorderColor: Colors.buttonBgColor
    },
    DefaultButton: {
      textColor: Colors.instaremDenimBlue,
      backgroundColor: Colors.instaremWhite,
      borderColor: Colors.instaremWhite,
      activeTextColor: Colors.instaremDenimBlue,
      activeBackgroundColor: Colors.instaremWhite,
      activeBorderColor: Colors.instaremWhite
    },

    Overlay: {
      backgroundColor: Colors.cardOverlay
    },
    Swiper: {
      pageIndicatorTintColor: Colors.greyMid,
      currentPageIndicatorTintColor: Colors.blueGradientMid
    },
    TabBar: {
      backgroundColor: Colors.instaremWhite,
      inactiveTintColor: Colors.greyMid,
      activeTintColor: Colors.blueGradientMid
    },
    Onboarding: {
      textColor: Colors.instaremWhite,
      backgroundColor: Colors.blueGradientMid,
      pageIndicatorTintColor: Colors.instaremWhite,
      currentPageIndicatorTintColor: Colors.instaremWhite
    },
    TextField: {
      backgroundColor: Colors.transparent,
      borderColor: Colors.blueGrayBorderLight,
      underLineColor: Colors.blueGrayBorderLight,
      underLineColorFocus: Colors.blueGrayBorderLight,
      placeholderTextColor: Colors.blueGray,
      textColor: Colors.instaremDenimBlue
    },
    Alert: {
      textColor: Colors.blueGradientMid,
      backgroundColor: Colors.transparent,
      primaryTickColor: Colors.blueGradientMid,
      secondaryTickColor: Colors.blueGradientMid,
      secondaryTickBackgroundColor: Colors.blueGradientMid
    }
  },

  Dark: {
    PrimaryButton: {
      textColor: Colors.blueGradientMid,
      backgroundColor: Colors.instaremWhite,
      borderColor: Colors.instaremWhite,
      activeTextColor: Colors.blueGradientMid,
      activeBackgroundColor: Colors.instaremWhite,
      activeBorderColor: Colors.instaremWhite
    },
    SecondaryButton: {
      textColor: Colors.instaremWhite,
      backgroundColor: Colors.transparent,
      borderColor: Colors.instaremWhite,
      activeTextColor: Colors.instaremWhite,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.instaremWhite
    },
    DisabledButton: {
      textColor: Colors.instaremWhite,
      backgroundColor: Colors.transparent,
      borderColor: Colors.greyMid,
      activeTextColor: Colors.instaremWhite,
      activeBackgroundColor: Colors.transparent,
      activeBorderColor: Colors.greyMid
    },
    GradientButton: {
      textColor: Colors.instaremWhite,
      backgroundColorGradientStart: Colors.blueGradientStart,
      backgroundColorGradientMid: Colors.blueGradientMid,
      backgroundColorGradientEnd: Colors.blueGradientEnd,
      activeTextColor: Colors.instaremWhite,
      activeBackgroundColor: Colors.buttonBgColor,
      activeBorderColor: Colors.buttonBgColor
    },
    DefaultButton: {
      textColor: Colors.instaremWhite,
      backgroundColor: Colors.blueGradientMid,
      borderColor: Colors.blueGradientMid,
      activeTextColor: Colors.instaremWhite,
      activeBackgroundColor: Colors.blueGradientMid,
      activeBorderColor: Colors.blueGradientMid
    },
    Overlay: {
      backgroundColor: Colors.cardOverlay
    },
    Swiper: {
      pageIndicatorTintColor: Colors.greyMid,
      currentPageIndicatorTintColor: Colors.blueGradientMid
    },
    TabBar: {
      backgroundColor: Colors.instaremBlack,
      inactiveTintColor: Colors.greyMid,
      activeTintColor: Colors.instaremWhite
    },
    Onboarding: {
      textColor: Colors.instaremWhite,
      backgroundColor: Colors.blueGradientMid,
      pageIndicatorTintColor: Colors.instaremWhite,
      currentPageIndicatorTintColor: Colors.instaremWhite
    },
    TextField: {
      backgroundColor: Colors.transparent,
      borderColor: Colors.blueGrayBorderLight,
      underLineColor: Colors.blueGrayBorderLight,
      underLineColorFocus: Colors.blueGrayBorderLight,
      placeholderTextColor: Colors.blueGray,
      textColor: Colors.blueGradientMid
    },
    Alert: {
      textColor: Colors.blueGradientMid,
      backgroundColor: Colors.transparent,
      primaryTickColor: Colors.blueGradientMid,
      secondaryTickColor: Colors.blueGradientMid,
      secondaryTickBackgroundColor: Colors.blueGradientMid
    }
  }
};
