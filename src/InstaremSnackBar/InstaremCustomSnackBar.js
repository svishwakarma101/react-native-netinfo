import React, { Component } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getAdjustedFontSize } from '../utils/Fonts';
import { Fonts, FontSize } from '../utils/InstaremStyleSheet';
import InstaremButton from '../InstaremButton';
import { BUTTON_TYPES, APPLIED_THEME as Themes } from '../utils/Constants';

export default class InstaremCustomSnackBar extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(-10);
  }

  componentDidMount() {
    Animated.timing(this.animation, {
      toValue: 10,
      duration: 500
    }).start();
  }

  actionHandler = () => {
    const { actionHandler } = this.props;
    if (actionHandler && typeof actionHandler === 'function') {
      actionHandler();
    }
  };

  render() {
    const {
      theme,
      visible,
      message,
      isSelfDismiss,
      autoHideDuration,
      snackBarContainerStyle,
      messageTextStyle,
      actionButtonTitle,
      actionButtonStyle,
      actionButtonTitleStyle
    } = this.props;

    if (visible && isSelfDismiss) {
      setTimeout(this.actionHandler, autoHideDuration);
    }

    return visible ? (
      <Animated.View
        accessible={true}
        accessibilityLabel={'SnackbarView'}
        style={[
          styles.container,
          { [this.props.position]: this.animation },
          {
            borderColor: theme.SnackBar.borderColor,
            backgroundColor: theme.SnackBar.backgroundColor,
            shadowColor: theme.SnackBar.shadowColor
          },
          snackBarContainerStyle
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: theme.SnackBar.textColor },
            messageTextStyle
          ]}
        >
          {message}
        </Text>
        {!isSelfDismiss && (
          <InstaremButton
            theme={theme}
            buttonType={BUTTON_TYPES.primary}
            accessibilityLabel={'ok-button'}
            style={[styles.button, actionButtonStyle]}
            onPress={() => this.actionHandler()}
          >
            <Text
              style={[
                styles.buttonTitle,
                { color: theme.SnackBar.buttonTitleColor },
                actionButtonTitleStyle
              ]}
            >
              {actionButtonTitle || 'Ok'}
            </Text>
          </InstaremButton>
        )}
      </Animated.View>
    ) : null;
  }
}

InstaremCustomSnackBar.propTypes = {
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

InstaremCustomSnackBar.defaultProps = {
  theme: Themes,
  visible: false,
  isSelfDismiss: false,
  autoHideDuration: 5000,
  bottom: 0,
  position: 'bottom'
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    position: 'absolute',
    zIndex: 99,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Themes.SnackBar.borderColor,
    backgroundColor: Themes.SnackBar.backgroundColor,
    shadowColor: Themes.SnackBar.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center'
  },
  messageText: {
    flex: 1,
    alignSelf: 'center',
    marginRight: 5,
    color: Themes.SnackBar.textColor,
    fontSize: getAdjustedFontSize(FontSize.Small),
    fontFamily: Fonts.Regular
  },
  button: {
    height: 25,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonTitle: {
    color: Themes.SnackBar.buttonTitleColor,
    fontSize: getAdjustedFontSize(FontSize.Small),
    fontFamily: Fonts.Regular
  }
});
