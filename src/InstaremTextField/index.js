import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Platform,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import { TextField } from 'react-native-material-textfield';
import { Colors, Fonts, FontSize } from '../utils/InstaremStyleSheet';
import {
  APPLIED_THEME as Theme,
  TEXTFIELD_TYPES,
  TEXTFIELD_SHAPES,
  TEXTFIELD_UNDERLINESTYLE
} from '../utils/Constants';
import cancelIcon from '../../assets/images/button/cancelIcon.png';
import showButton from '../../assets/images/button/hideIconGray.png';
import hideButton from '../../assets/images/button/hideIconGray.png';

class InstaremTextField extends Component {
  inputRef = React.createRef();

  static propTypes = {
    theme: PropTypes.object,
    type: PropTypes.oneOf(TEXTFIELD_TYPES),
    shape: PropTypes.oneOf(TEXTFIELD_SHAPES),
    isFloating: PropTypes.bool,
    underlineType: PropTypes.oneOf(TEXTFIELD_UNDERLINESTYLE),
    errorMessage: PropTypes.string,
    descriptionMessage: PropTypes.string,
    descriptionStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    textStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    textColor: PropTypes.string,
    floatingLabel: PropTypes.string,
    placeholder: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    underLineColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    numberOfLines: PropTypes.number,
    multiline: PropTypes.bool,
    returnKeyType: PropTypes.string,
    onChangeText: PropTypes.func,
    onSecureTextModeChange: PropTypes.func,
    containerStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    inputContainerStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    underlineStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    leftAccessoryImage: PropTypes.shape({
      source: PropTypes.any,
      resizeMode: PropTypes.string,
      style: PropTypes.shape({
        ...Image.propTypes.style
      })
    }),
    showClearButton: PropTypes.bool,
    showShowHideButton: PropTypes.bool,
    clearButtonStyle: PropTypes.shape({
      ...TouchableOpacity.propTypes.style
    }),
    autoFocus: PropTypes.bool,
    clearButtonImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    showButtonImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    hideButtonImage: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  };

  static defaultProps = {
    theme: Theme,
    type: TEXTFIELD_TYPES.default,
    shape: TEXTFIELD_SHAPES.rectangular,
    underlineType: TEXTFIELD_UNDERLINESTYLE.textMatch,
    numberOfLines: 1,
    isFloating: true,
    editable: true,
    autoCorrect: false,
    returnKeyType: 'done',
    autoFocus: false,
    placeholderColor: Theme.TextField.placeholderTextColor,
    showClearButton: false,
    showShowHideButton: false,
    leftAccessoryImage: {
      source: '',
      resizeMode: 'center'
    },
    blurOnSubmit:false
  };

  constructor(props) {
    super(props);
    this.state = {
      autoFocusEnabled: this.props.autoFocus || false,
      shouldEncryptedTextBeVisible: this.props.isSecureText || false,
      showPlaceHolderForFloating: false
    };
  }

  render() {
    const {
      theme,
      floatingLabel,
      placeholder,
      placeholderColor,
      multiline,
      numberOfLines,
      returnKeyType,
      isFloating,
      textColor,
      underlineType,
      descriptionMessage,
      errorMessage,
      descriptionStyle,
      textStyle,
      labelPadding,
      labelHeight,
      inputContainerPadding,
      blurOnSubmit,
      input: {value: preProcessedValue},
    } = this.props;

    const value = preProcessedValue && preProcessedValue.toString();
    let isTintedUnderlineRequired =
      underlineType === TEXTFIELD_UNDERLINESTYLE.textMatch &&
      this.props.shape === TEXTFIELD_SHAPES.rectangular;

    return (
      <View style={this.getTextFieldStyle()}>
        <View style={styles.underlineContainerView}>
          <View style={[styles.textInputContainerView]}>
            <TextField
              {...this.props}
              labelTextStyle={[styles.text, textStyle]}
              style={[styles.text, textStyle]}
              labelPadding={!isFloating ? 0 : labelPadding || 4}
              labelHeight={!isFloating ? 0 : labelHeight || 32}
              inputContainerPadding={
                !isFloating ? 0 : inputContainerPadding || 8
              }
              titleTextStyle={[styles.descriptionStyle, descriptionStyle]}
              label={isFloating ? floatingLabel || '' : null}
              textColor={textColor || theme.TextField.textColor}
              tintColor={textColor || theme.TextField.placeholderTextColor}
              baseColor={
                placeholderColor || theme.TextField.placeholderTextColor
              }
              lineWidth={isTintedUnderlineRequired ? 1 : 0}
              activeLineWidth={isTintedUnderlineRequired ? 1 : 0}
              placeholder={
                !isFloating ||
                (isFloating && this.state.showPlaceHolderForFloating)
                  ? placeholder
                  : null
              }
              error={errorMessage || null}
              title={descriptionMessage || null}
              renderAccessory={() => this.getAccessoryView()}
              ref={this.inputRef}
              placeholderTextColor={!isFloating ? placeholderColor || '' : null}
              underlineColorAndroid='transparent'
              multiline={multiline}
              secureTextEntry={this.state.shouldEncryptedTextBeVisible}
              numberOfLines={multiline ? numberOfLines : 1}
              returnKeyType={returnKeyType}
              onChangeText={this.onTextChanged.bind(this)}
              value={value}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              responsive={false}
              blurOnSubmit={blurOnSubmit}
              autoCapitalize='none'
              autoCorrect={false}
              autoCompleteType={'off'}
              maxLength={
                this.props.maxLength || this.getMaxLength(this.props.type)
              }
            >
              {this.props.children}
            </TextField>
          </View>
          {this.getTextFieldUnderline()}
        </View>
      </View>
    );
  }

  getMaxLength = type => {
    let length = 0;
    switch (type) {
      case TEXTFIELD_TYPES.date:
        length = 10;
        break;
      case TEXTFIELD_TYPES.shortDate:
        length = 8;
        break;
      case TEXTFIELD_TYPES.monthYearDate:
        length = 7;
        break;
      case TEXTFIELD_TYPES.monthYearShortDate:
        length = 5;
        break;
      default:
        length = 100;
        break;
    }
    return length;
  };

  handleChange = text => {
    var { type } = this.props;
    let textTemp = text;
    let singleSeperatorRequired =
      type === TEXTFIELD_TYPES.monthYearDate ||
      type === TEXTFIELD_TYPES.monthYearShortDate;

    if (type !== TEXTFIELD_TYPES.default) {
      if (
        textTemp.length === 2 ||
        (!singleSeperatorRequired && textTemp.length === 5)
      ) {
        if (
          this.props.value.length === 1 ||
          (!singleSeperatorRequired && this.props.value.length === 4)
        ) {
          textTemp += '/';
        } else {
          textTemp = textTemp[0];
        }
      }
    }
    return textTemp;
  };

  getTextFieldStyle = () => {
    return StyleSheet.flatten([
      styles.containerView,
      this.props.shape === TEXTFIELD_SHAPES.rounded
        ? styles.rounded
        : styles.rectangular,
      this.props.containerStyle,
      {
        backgroundColor:
          this.props.backgroundColor ||
          this.props.theme.TextField.backgroundColor,
        borderColor:
          this.props.borderColor || this.props.theme.TextField.borderColor
      }
    ]);
  };

  getTextFieldUnderline() {
    if (
      this.props.shape === TEXTFIELD_SHAPES.rectangular &&
      this.props.underlineType === TEXTFIELD_UNDERLINESTYLE.custom
    ) {
      const backgroundColor =
        this.props.autoFocus === false
          ? this.props.theme.TextField.underLineColor
          : this.props.theme.TextField.underLineColor;
      return (
        <View
          style={[
            styles.underline,
            { backgroundColor },
            { backgroundColor: this.props.underLineColor },
            this.props.underlineStyle
          ]}
        />
      );
    }
    return null;
  }

  getAccessoryView = () => {

    if (this.props.showClearButton && this.props.showShowHideButton) {
      return <View style={{flexDirection: 'row'}}>
        {this.getRightSideShowButton()}
        {this.getRightSideClearButton()}        
      </View>
    } else if (this.props.showClearButton) {
      return this.getRightSideClearButton();
    } else if (this.props.showShowHideButton) {
      return this.getRightSideShowButton();
    }     
    else {
      return null;
    }
  };

  getRightSideClearButton = () => {
    const { value } = this.props;
    const textFieldNotEmpty = value && value !== '';
    if (this.props.showClearButton && textFieldNotEmpty) {
      let clearButtonSource = this.props.clearButtonImage || cancelIcon;

      return (
        <TouchableOpacity style={[styles.rightAccessory, this.props.rightAccessoryStyle]} onPress={this.clearText}>
          <Image
            style={[styles.image, this.props.clearButtonStyle]}
            source={clearButtonSource}
            resizeMode='contain'
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  getRightSideShowButton = () => {
    const { value } = this.props;
    const textFieldNotEmpty = value && value !== '';

    if (this.props.showShowHideButton && textFieldNotEmpty) {
      let hideButtonSource = this.props.hideButtonImage || hideButton;
      let showButtonSource = this.props.showButtonImage || showButton;

      return (
        <TouchableOpacity style={[styles.rightAccessory, this.props.rightAccessoryStyle]} onPress={this.showHideSecureText}>
          <Image
            style={[styles.image, this.props.clearButtonStyle]}
            source={
              this.state.shouldEncryptedTextBeVisible
                ? hideButtonSource
                : showButtonSource
            }
            resizeMode='contain'
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    } else {
      this.setState({ showPlaceHolderForFloating: true });
    }
  };
  onBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    } else {
      this.setState({ showPlaceHolderForFloating: false });
    }
  };

  onTextChanged(text) {
    const {input: {onChange}} = this.props;
    let refinedText = this.handleChange(text);
    onChange(text);
    if (this.props.onChangeText) {
      this.props.onChangeText(refinedText);
    }
  }

  clearText = () => {
    if (this.props.showClearButton !== 1) { // If the entered text is valid then avoid the text clear action. 
      this.inputRef.current.clear();
      if (this.props.onChangeText) {
        this.props.onChangeText('');
      }
    }        
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  showHideSecureText = () => {
    this.setState({
      shouldEncryptedTextBeVisible: !this.state.shouldEncryptedTextBeVisible
    });
    if (this.props.onSecureTextModeChange) {
      this.props.onSecureTextModeChange(
        this.state.shouldEncryptedTextBeVisible
      );
    }
  };
}

const styles = StyleSheet.create({
  containerView: {
    flex: 0,
    height: 60,
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: Theme.TextField.backgroundColor
  },
  underlineContainerView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.transparent
  },
  textInputContainerView: {
    flex: 1
  },
  rounded: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Theme.TextField.borderColor
  },
  rectangular: {
    alignContent: 'flex-end'
  },
  text: {
    fontFamily: Fonts.Light,
    fontSize: FontSize.Large1,
    ...Platform.select({
      android: {
        paddingTop: -10,
        paddingBottom: -10
      }
    }),
    marginHorizontal: 2
  },
  descriptionStyle: {
    fontFamily: Fonts.Light,
    fontSize: FontSize.Mini,
    ...Platform.select({
      android: {
        paddingTop: -10,
        paddingBottom: -10
      }
    })
  },
  underline: {
    flex: 0.01
  },
  image: {
    marginTop: 0,
  },
  rightAccessory: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default InstaremTextField;
