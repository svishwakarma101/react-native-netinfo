import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  ViewPropTypes,
  Platform
} from 'react-native';

const { Version, OS } = Platform;
const IS_ANDROID = OS === 'android';
const IS_LT_LOLLIPOP = Version < 21;

export const noop = () => {};

export const Touchable = ({ onPress, style, children }) => {
  if (IS_ANDROID && !IS_LT_LOLLIPOP) {
    return (
      <TouchableNativeFeedback
        accessibilityLabel={'touchablenativefeedback'}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        onPress={onPress}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity
        accessibilityLabel={'touchableopacity'}
        onPress={onPress}
        style={style}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

Touchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired
};

Touchable.defaultProps = {
  onPress: noop,
  style: {}
};
