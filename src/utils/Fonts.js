import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;

export const getAdjustedFontSize = size => {
  // eslint-disable-next-line radix
  return (parseInt(size) * deviceWidth * (1.8 - 0.002 * deviceWidth)) / 400;
};
