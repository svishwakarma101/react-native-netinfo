/**
 * An Alert box is a basic UI component for showing alerts.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ViewPropTypes,
  Animated,
  Easing
} from 'react-native';
import PropTypes from 'prop-types';
import renderIf from '../utils/InstaremRenderIf';
import {
  BUTTON_TYPES,
  BUTTON_SHAPES,
  APPLIED_THEME as Theme
} from '../utils/Constants';
import { Colors, Fonts, FontSize } from '../utils/InstaremStyleSheet';
import InstaremButton from '../InstaremButton';
import cancelImage from '../../assets/images/button/cancelIcon.png';
import InstaremCircleWithTick from '../InstaremCircleWithTick';

export default class InstaremAlert extends Component {
  static proptypes = {
    theme: PropTypes.object,
    isIconRequired: PropTypes.bool,
    isIconPrimary: PropTypes.bool,
    headerIconColor: PropTypes.string,
    headerIconBackgroundColor: PropTypes.string,
    headerIconImage: PropTypes.string,
    headerIconStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    isDismissButtonRequired: PropTypes.bool,
    dismissButtonImage: PropTypes.string,
    dismissButtonStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.string,
    description: PropTypes.string,
    customDescription: PropTypes.element,
    primaryButtonTitle: PropTypes.string,
    primaryButtonStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    primaryButtonAction: PropTypes.func,
    primaryButtonType: PropTypes.oneOf(BUTTON_TYPES),
    primaryButtonShape: PropTypes.oneOf(BUTTON_SHAPES),
    secondaryButtonTitle: PropTypes.string,
    secondaryButtonStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    secondaryButtonAction: PropTypes.func,
    secondaryButtonType: PropTypes.oneOf(BUTTON_TYPES),
    secondaryButtonShape: PropTypes.oneOf(BUTTON_SHAPES)
  };

  static defaultProps = {
    theme: Theme,
    isIconPrimary: true,
    primaryButtonType: BUTTON_TYPES.gradient,
    primaryButtonShape: BUTTON_SHAPES.rounded,
    secondaryButtonType: BUTTON_TYPES.gradient,
    secondaryButtonShape: BUTTON_SHAPES.rounded
  };

  constructor(props) {
    super(props);
    this._animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    Animated.timing(this._animatedValue, {
      duration: 650,
      easing: Easing.linear,
      useNativeDriver: false,
      isInteraction: true,
      toValue: 1
    }).start();
  }

  headerIcon = () => {
    let {
      isIconPrimary,
      headerIconColor,
      headerIconBackgroundColor,
      theme
    } = this.props;
    if (this.props.headerIconImage) {
      return (
        <Image
          resizeMode='contain'
          source={headerIconImage}
          style={[styles.headerIconImage, this.props.headerIconStyle]}
        />
      );
    } else {
      return (
        <InstaremCircleWithTick
          {...this.props}
          color={
            headerIconColor || isIconPrimary
              ? theme.Alert.primaryTickColor
              : theme.Alert.secondaryTickColor
          }
          isPrimary={isIconPrimary}
          backgroundColor={
            headerIconBackgroundColor ||
            theme.Alert.secondaryTickBackgroundColor
          }
          value={this._animatedValue}
          size={'small'}
          unfilledColor={'transparent'}
          animationConfig={{ speed: 4 }}
        />
      );
    }
  };

  render() {
    const {
      theme,
      title,
      titleStyle,
      description,
      descriptionStyle,
      style,
      isIconRequired,
      isDismissButtonRequired,
      primaryButtonTitle,
      primaryButtonStyle,
      primaryButtonType,
      primaryButtonAction,
      primaryButtonShape,
      secondaryButtonTitle,
      secondaryButtonStyle,
      secondaryButtonType,
      secondaryButtonAction,
      secondaryButtonShape
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        {renderIf(isDismissButtonRequired)(
          <View style={styles.dismissButtonContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={primaryButtonAction}
              style={styles.alertDismissButton}
            >
              <Image
                resizeMode='contain'
                source={this.props.dismissButtonImage || cancelImage}
                style={[
                  styles.alertDismissButtonImage,
                  this.props.dismissButtonStyle
                ]}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.alertMessageContainer}>
          {renderIf(isIconRequired)(<View>{this.headerIcon()}</View>)}
          <Text
            style={[styles.title, { color: theme.Alert.textColor }, titleStyle]}
          >
            {title}
          </Text>
          <Text style={[styles.description, descriptionStyle]}>
            {description}
          </Text>
          {this.props.children}

          <View style={styles.buttonContainer}>
            {renderIf(secondaryButtonTitle !== undefined)(
              <InstaremButton
                theme={theme}
                buttonType={secondaryButtonType}
                buttonShape={secondaryButtonShape}
                onPressIn={secondaryButtonAction}
                // onPressOut={this.navigateToNext.bind(this)}
                content={secondaryButtonTitle}
                style={[
                  styles.button,
                  secondaryButtonStyle,
                  { marginRight: 10 }
                ]}
              />
            )}

            <InstaremButton
              theme={theme}
              buttonType={primaryButtonType}
              buttonShape={primaryButtonShape}
              onPressIn={primaryButtonAction}
              // onPressOut={this.navigateToNext.bind(this)}
              content={primaryButtonTitle}
              style={[styles.button, primaryButtonStyle]}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    backgroundColor: Colors.instaremWhite,
    borderRadius: 15,
    borderColor: Colors.grayShadeText,
    borderWidth: 0.1,
    padding: 20
  },
  dismissButtonContainer: {
    flex: 0,
    alignItems: 'flex-end'
  },
  alertMessageContainer: {
    flex: 0,
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    marginTop: 20
  },
  title: {
    color: Colors.instaremDenimBlue,
    fontFamily: Fonts.Roman,
    fontSize: FontSize.Large1,
    marginTop: 25
  },
  description: {
    color: Colors.grayShadeText,
    fontFamily: Fonts.Roman,
    fontSize: FontSize.Small
  },
  alertDismissButton: {
    height: 44,
    width: 44,
    alignItems: 'flex-end'
  },
  alertDismissButtonImage: {
    height: 16,
    width: 16
  },
  headerIconImage: {
    height: 50,
    width: 50
  },
  alertHeaderIcon: {
    height: 52,
    width: 52
  },
  button: {
    flex: 1
  }
});
