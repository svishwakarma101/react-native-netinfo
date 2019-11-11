/**
 * A basic button component that should render nicely on any platform.
 * Supports some level of customization since it is based on Touchable Opacity,
 * hence props from Touchable Opacity class can be used as is.
 * By default, the button state is enabled. To disable button action, you need to set disbaled prop.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import renderIf from '../utils/InstaremRenderIf';
import { Fonts, FontSize } from '../utils/InstaremStyleSheet';
import {
  BUTTON_TYPES,
  BUTTON_SHAPES,
  APPLIED_THEME as Theme
} from '../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

export default class InstaremButton extends Component {
  static propTypes = {
    theme: PropTypes.object,
    disabled: PropTypes.bool,
    buttonType: PropTypes.oneOf(Object.keys(BUTTON_TYPES)),
    buttonShape: PropTypes.oneOf(Object.keys(BUTTON_SHAPES)),
    titleStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    gradientStyle: PropTypes.shape({
      ...ViewPropTypes.style
    })
  };

  static defaultProps = {
    theme: Theme
  };

  constructor(props) {
    super(props);
    this.state = {
      buttonPressedIn: false,
      isDisabled: this.props.disabled || false
    };
  }

  render() {
    let buttonStyle;
    let buttonShape;
    const isGradient = this.props.buttonType === BUTTON_TYPES.gradient;

    switch (this.props.buttonType) {
      case BUTTON_TYPES.primary:
        buttonStyle = ButtonStyles.primaryButton;
        break;
      case BUTTON_TYPES.secondary:
        buttonStyle = ButtonStyles.secondaryButton;
        break;
      case BUTTON_TYPES.disabled:
        buttonStyle = ButtonStyles.secondaryButton;
        break;
      case BUTTON_TYPES.gradient:
        buttonStyle = ButtonStyles.gradientButton;
        break;
      case BUTTON_TYPES.transparent:
        buttonStyle = ButtonStyles.transparentButton;
        break;
      default:
        buttonStyle = ButtonStyles.defaultButtonType;
        break;
    }

    switch (this.props.buttonShape) {
      case BUTTON_SHAPES.square:
        buttonShape = ButtonStyles.squareButton;
        break;
      case BUTTON_SHAPES.rounded:
        buttonShape = ButtonStyles.roundButton;
        break;
      case BUTTON_SHAPES.roundedEdge:
        buttonShape = ButtonStyles.roundedEdgeButton;
        break;
      default:
        buttonShape = ButtonStyles.defaultShapeButton;
        break;
    }

    const textColor = this.getTextColor();
    let buttonAttributes = { buttonStyle, buttonShape, textColor };

    if (!isGradient) {
      const buttonBackgroundColor = this.getButtonBackgroundColor();
      const buttonBorderColor = this.getButtonBorderColor();
      buttonAttributes = {
        ...buttonAttributes,
        buttonBackgroundColor,
        buttonBorderColor
      };
    }

    return isGradient
      ? this.getGradientButton(buttonAttributes)
      : this.getNormalButton(buttonAttributes);
  }

  getThemeForButtonType() {
    let { theme, buttonType } = this.props;
    if (buttonType === BUTTON_TYPES.primary) {
      return theme.PrimaryButton;
    } else if (buttonType === BUTTON_TYPES.secondary) {
      return theme.SecondaryButton;
    } else if (buttonType === BUTTON_TYPES.disabled) {
      return theme.DisabledButton;
    } else if (buttonType === BUTTON_TYPES.gradient) {
      return theme.GradientButton;
    } else if (buttonType === BUTTON_TYPES.transparent) {
      return theme.TransparentButton;
    }
    return theme.DefaultButton;
  }

  getGradientButton(buttonAttributes) {
    let { theme } = this.props;
    const { buttonStyle, buttonShape, textColor } = buttonAttributes;
    return (
      <TouchableOpacity
        {...this.props}
        style={[buttonStyle, buttonShape, this.props.style]}
        disabled={this.props.disabled || false}
        activeOpacity={1.0}
        delayPressIn={100}
        delayPressOut={100}
        onPressIn={this.buttonPressedIn.bind(this)}
        onPressOut={this.buttonPressedOut.bind(this)}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            theme.GradientButton.backgroundColorGradientStart,
            theme.GradientButton.backgroundColorGradientMid,
            theme.GradientButton.backgroundColorGradientEnd
          ]}
          style={[
            buttonStyle,
            buttonShape,
            this.props.gradientStyle
            // { height: this.props.style.height, width: this.props.style.width }
          ]}
        >
          {renderIf(this.props.content)(
            <Text
              style={[
                ButtonStyles.title,
                { color: textColor },
                this.props.titleStyle
              ]}
              numberOfLines={1}
            >
              {this.props.content}
            </Text>
          )}
          {this.props.children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  getNormalButton(buttonAttributes) {
    const {
      buttonStyle,
      buttonShape,
      textColor,
      buttonBackgroundColor,
      buttonBorderColor
    } = buttonAttributes;
    return (
      <TouchableOpacity
        {...this.props}
        style={[
          buttonStyle,
          buttonShape,
          {
            backgroundColor: buttonBackgroundColor,
            borderColor: buttonBorderColor,
            opacity: this.props.buttonType === BUTTON_TYPES.disabled ? 0.5 : 1
          },
          this.props.style
        ]}
        disabled={this.props.disabled ? this.props.disabled : false}
        activeOpacity={1.0}
        delayPressIn={100}
        delayPressOut={100}
        onPressIn={this.buttonPressedIn.bind(this)}
        onPressOut={this.buttonPressedOut.bind(this)}
      >
        {renderIf(this.props.content)(
          <Text
            style={[
              ButtonStyles.title,
              { color: textColor },
              this.props.titleStyle
            ]}
            numberOfLines={1}
          >
            {this.props.content}
          </Text>
        )}
        {this.props.children}
      </TouchableOpacity>
    );
  }

  getButtonBackgroundColor() {
    const buttonTheme = this.getThemeForButtonType();
    if (this.state.buttonPressedIn) {
      return buttonTheme.activeBackgroundColor;
    }
    return buttonTheme.backgroundColor;
  }

  getButtonBorderColor() {
    const buttonTheme = this.getThemeForButtonType();
    if (this.state.buttonPressedIn) {
      return buttonTheme.activeBorderColor;
    }
    return buttonTheme.borderColor;
  }

  getTextColor() {
    const buttonTheme = this.getThemeForButtonType();
    let textColor = buttonTheme.textColor;
    if (this.state.buttonPressedIn) {
      textColor = buttonTheme.activeTextColor;
    }
    return textColor;
  }

  buttonPressedIn() {
    if (!this.props.disabled) {
      this.setState({ buttonPressedIn: true });
    }
    if (this.props.onPressIn !== undefined) {
      this.props.onPressIn();
    }
  }

  buttonPressedOut() {
    if (!this.props.disabled) {
      this.setState({ buttonPressedIn: false });
    }
    if (this.props.onPressOut !== undefined) {
      this.props.onPressOut();
    }
  }
}

const ButtonStyles = StyleSheet.create({
  primaryButton: {
    height: 60,
    backgroundColor: Theme.PrimaryButton.backgroundColor,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  secondaryButton: {
    height: 60,
    backgroundColor: Theme.SecondaryButton.backgroundColor,
    borderWidth: 1,
    borderColor: Theme.SecondaryButton.borderColor,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  gradientButton: {
    height: 60,
    backgroundColor: Theme.GradientButton.backgroundColorGradientStart,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  transparentButton: {
    flex: 0,
    backgroundColor: Theme.TransparentButton.backgroundColor,
    borderWidth: 0,
    borderColor: Theme.TransparentButton.borderColor,
    borderRadius: 0,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  defaultButtonType: {
    height: 60,
    backgroundColor: Theme.DefaultButton.backgroundColor,
    borderWidth: 1,
    borderColor: Theme.DefaultButton.borderColor,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  defaultShapeButton: {
    borderRadius: 30
  },
  roundedEdgeButton: {
    borderRadius: 10
  },
  roundButton: {
    borderRadius: 30
  },
  squareButton: {
    borderRadius: 0
  },
  title: {
    marginTop: Platform.OS == 'ios' ? 3 : 0,
    textAlign: 'center',
    fontFamily: Fonts.Heavy,
    fontSize: FontSize.Large2,
    backgroundColor: 'transparent'
  }
});
