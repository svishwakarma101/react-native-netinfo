import React, { Component } from 'react';
import { Text, Animated, StyleSheet, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { getAdjustedFontSize } from '../utils/Fonts';
import { Fonts, FontSize } from '../utils/InstaremStyleSheet';
import { APPLIED_THEME as Themes } from '../utils/Constants';
import { Touchable, noop } from './Touchable';

const easing_values = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 1, 1)
};

export default class InstaremNativeSnackBar extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(-100);
  }

  componentDidMount() {
    Animated.timing(this.animation, {
      toValue: -100,
      duration: 1000
    }).start();
  }

  actionHandler = () => {
    const { actionHandler } = this.props;
    if (actionHandler && typeof actionHandler === 'function') {
      actionHandler();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      Animated.timing(this.animation, {
        duration: 1000,
        toValue: 0,
        easing: easing_values.entry
      }).start();
    } else if (!nextProps.visible && this.props.visible) {
      Animated.timing(this.animation, {
        duration: 1000,
        toValue: -100,
        easing: easing_values.exit
      }).start();
    }
  }

  render() {
    const {
      theme,
      message,
      isSelfDismiss,
      autoHideDuration,
      snackBarContainerStyle,
      messageTextStyle,
      actionButtonStyle,
      actionButtonTitleStyle
    } = this.props;

    if (isSelfDismiss) {
      setTimeout(this.actionHandler, autoHideDuration);
    }

    return (
      <Animated.View
        style={[
          styles.container,
          { [this.props.position]: this.animation },
          { backgroundColor: theme.SnackBar.nativeBackgroundColor },
          snackBarContainerStyle
        ]}
      >
        <Animated.View
          style={[styles.contentContainer]}
          onLayout={event => {
            this.setState({ hideDistance: event.nativeEvent.layout.height });
          }}
        >
          <Text
            style={[
              styles.messageText,
              { color: theme.SnackBar.nativeTextColor },
              messageTextStyle
            ]}
          >
            {message}
          </Text>
          {this.props.actionButtonTitle && (
            <Touchable
              style={actionButtonStyle}
              onPress={() => {
                this.actionHandler();
              }}
            >
              <Text
                style={[
                  styles.buttonTitle,
                  { color: theme.SnackBar.nativeButtonTitleColor },
                  actionButtonTitleStyle
                ]}
              >
                {this.props.actionButtonTitle.toUpperCase()}
              </Text>
            </Touchable>
          )}
        </Animated.View>
      </Animated.View>
    );
  }
}

InstaremNativeSnackBar.propTypes = {
  theme: PropTypes.object,
  visible: PropTypes.bool,
  isSelfDismiss: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  snackBarContainerStyle: PropTypes.object,
  message: PropTypes.string,
  messageTextStyle: PropTypes.object,
  actionButtonTitle: PropTypes.string,
  actionButtonStyle: PropTypes.object,
  actionButtonTitleStyle: PropTypes.object,
  actionHandler: PropTypes.func,
  distanceCallback: PropTypes.func,
  bottom: PropTypes.number,
  position: PropTypes.string // bottom (default), top
};

InstaremNativeSnackBar.defaultProps = {
  theme: Themes,
  visible: false,
  isSelfDismiss: false,
  autoHideDuration: 1000,
  distanceCallback: noop,
  bottom: 0,
  position: 'top'
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 100,
    backgroundColor: Themes.SnackBar.nativeBackgroundColor
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // position: 'absolute',
    padding: 16
  },
  messageText: {
    flex: 1,
    alignSelf: 'center',
    marginRight: 5,
    color: Themes.SnackBar.nativeTextColor,
    fontSize: getAdjustedFontSize(FontSize.Small),
    fontFamily: Fonts.Regular
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Themes.SnackBar.nativeButtonTitleColor
  }
});
