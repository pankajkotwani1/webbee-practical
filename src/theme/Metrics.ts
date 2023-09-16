import {Dimensions, Platform, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('screen');
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
const isLessWidth = windowWidth < windowHeight;
const shortDimension = isLessWidth ? windowWidth : windowHeight;
const longDimension = isLessWidth ? windowHeight : windowWidth;

const getNewSize = (size: number): number => {
  const aspectRatio = windowHeight / windowWidth;
  let newSize = 0;
  if (aspectRatio > 1.77) {
    newSize = size;
  } else if (aspectRatio > 1.6) {
    newSize = size * 0.97;
  } else if (aspectRatio > 1.55) {
    newSize = size * 0.95;
  } else if (aspectRatio > 1.5) {
    newSize = size * 0.93;
  } else if (aspectRatio > 1.45) {
    newSize = size * 0.91;
  } else if (aspectRatio > 1.4) {
    newSize = size * 0.89;
  } else if (aspectRatio > 1.35) {
    newSize = size * 0.87;
  } else if (aspectRatio > 1.329) {
    return size;
  } else if (aspectRatio > 1.3) {
    newSize = size * 0.85;
  } else if (aspectRatio > 1.2) {
    newSize = size * 0.84;
  } else if (aspectRatio > 1.185) {
    return size * 0.95;
  } else if (aspectRatio > 1.15) {
    return size * 0.82;
  } else {
    newSize = size * 0.6;
  }
  return newSize;
};
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const deviceWidth = width;

// Do not use scale, verticalScale and moderateScale now onwards. Please use scale with new size, verticalScale with new size and moderateScale with new size as per the requirements
const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const scaleWithNewSize = (
  size: number,
  skipAspectRatio: boolean = false,
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return (shortDimension / guidelineBaseWidth) * changeSize;
};
const verticalScaleWithNewSize = (
  size: number,
  skipAspectRatio: boolean = false,
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return (longDimension / guidelineBaseHeight) * changeSize;
};
const moderateScaleWithNewSize = (
  size: number,
  skipAspectRatio: boolean = false,
  factor: number = 0.5,
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return changeSize + (scale(changeSize) - changeSize) * factor;
};
const moderateVerticalScaleWithNewSize = (
  size: number,
  skipAspectRatio: boolean = false,
  factor: number = 0.5,
): number => {
  const changeSize = skipAspectRatio ? size : getNewSize(size);
  return changeSize + (verticalScale(changeSize) - changeSize) * factor;
};

// Used via Metrics.baseMargin
const Metrics = {
  zero: 0,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  roundCorner: moderateScale(6),
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? verticalScale(64) : verticalScale(54),
  paddingHorizontal: scaleWithNewSize(5),
  paddingVertical: verticalScaleWithNewSize(8),
  profileImage: moderateScaleWithNewSize(100),
  size: {
    s: 5,
    m: 10,
    l: 15,
    xl: 20,
    xxl: 25,
    xxxl: 30,
  },
  keyboardVerticalOffset: Platform.OS == 'ios' ? moderateScale(40) : 0,
  isIOS: Platform.OS === 'ios',
  statusBarHeight: StatusBar.currentHeight,
};

const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (windowHeight === 780 ||
      windowWidth === 780 ||
      windowHeight === 812 ||
      windowWidth === 812 ||
      windowHeight === 844 ||
      windowWidth === 844 ||
      windowHeight === 896 ||
      windowWidth === 896 ||
      windowHeight === 926 ||
      windowWidth === 926)
  );
};

const ifIphoneX = (iphoneXStyle: number, regularStyle: number) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

const responsiveHeight = (h: number) => height * (h / 100);

export {
  deviceWidth,
  scale,
  verticalScale,
  moderateScale,
  Metrics,
  scaleWithNewSize,
  verticalScaleWithNewSize,
  moderateScaleWithNewSize,
  moderateVerticalScaleWithNewSize,
  ifIphoneX,
  responsiveHeight,
};
