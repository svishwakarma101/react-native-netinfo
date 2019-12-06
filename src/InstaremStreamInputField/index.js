import React from 'react';
import { StyleSheet, View, TextInput, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import {
  APPLIED_THEME as Theme,
  STREAM_INPUT_FIELD_TYPES,
  TEXTFIELD_SHAPES
} from '../utils/Constants';
import { Colors } from '../utils/InstaremStyleSheet';

class InstaremStreamInputField extends React.Component {
  static propTypes = {
    theme: PropTypes.object,
    length: PropTypes.number,
    style: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    inputFieldStyle: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    inputBoxType: PropTypes.oneOf(Object.keys(STREAM_INPUT_FIELD_TYPES)),
    inputBoxShape: PropTypes.oneOf(Object.keys(TEXTFIELD_SHAPES)),
    inputMaxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool
  };

  state = { value: [], selectedIndex: 0 };
  valueTextInput = [];
  isEditing = true;

  static defaultProps = {
    theme: Theme,
    length: 4,
    inputBoxType: 'underline',
    inputMaxLength: 1,
    keyboardType: 'numeric'
  };
  componentDidMount() {
    this.isEditing = true;
  }

  isEditing() {
    return this.isEditing;
  }

  renderInputs() {
    let {
      theme,
      length,
      style,
      inputFieldStyle,
      inputMaxLength,
      keyboardType,
      secureTextEntry
    } = this.props;
    let { inputStyle, inputShape } = this.getInputStyle();

    const inputs = Array(length).fill(0);
    const text = inputs.map((item, index) => (
      <View
        key={index}
        style={[
          styles.inputBox,
          inputStyle,
          inputShape,
          (index === this.state.selectedIndex ||
            (this.state.value[index] && this.state.value[index] !== '')) && {
            borderColor: theme.StreamInputField.activeBorderColor
          },
          style
        ]}
      >
        <View>
          <TextInput
            style={[
              styles.inputText,
              { color: theme.StreamInputField.textColor },
              inputFieldStyle
            ]}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            onFocus={v => this.onFocus(index, v)}
            onChangeText={v => this.focusNext(index, v)}
            onKeyPress={e => this.focusPrevious(e.nativeEvent.key, index)}
            ref={ref => (this.valueTextInput[index] = ref)}
            maxLength={inputMaxLength}
          />
        </View>
      </View>
    ));
    return text;
  }

  getButtonBackgroundColor() {
    const buttonTheme = this.getThemeForButtonType();
    if (this.state.buttonPressedIn) {
      return buttonTheme.activeBackgroundColor;
    }
    return buttonTheme.backgroundColor;
  }

  focusPrevious(key, index) {
    if (key === 'Backspace' && index !== 0) {
      this.valueTextInput[index - 1].focus();
    }
  }

  onFocus = (index, inputValue) => {
    this.isEditing = true;
    this.setState({ selectedIndex: index });
  };

  focusNext(index, inputValue) {

    const value = this.state.value;
    value[index] = inputValue;
    this.setState({ value });    
    if (index < this.valueTextInput.length - 1 && inputValue) {
      if (this.props.onStreamvalueChange) {
        this.props.onStreamvalueChange(value.join(''));
      }
      this.valueTextInput[index + 1].focus();
    }
    if (index === this.valueTextInput.length - 1) {
      if (this.props.getstreamValue) {
        this.props.getstreamValue(value.join(''));
      }
      this.valueTextInput[index].blur();
      this.isEditing = false;
    }    
  }

  getInputStyle = () => {
    let inputStyle;
    let inputShape;

    let { theme } = this.props;
    switch (this.props.inputBoxType) {
      case STREAM_INPUT_FIELD_TYPES.solid:
        inputStyle = styles.solid;
        inputStyle = {
          ...inputStyle,
          backgroundColor: theme.StreamInputField.activeBackgroundColor
        };
        break;
      case STREAM_INPUT_FIELD_TYPES.boxed:
        inputStyle = styles.boxed;
        inputStyle = {
          ...inputStyle,
          backgroundColor: Colors.transparent,
          borderColor: theme.StreamInputField.borderColor
        };
        break;
      case STREAM_INPUT_FIELD_TYPES.solidBoxed:
        inputStyle = styles.solidBoxed;
        inputStyle = {
          ...inputStyle,
          backgroundColor: theme.StreamInputField.backgroundColor,
          borderColor: theme.StreamInputField.borderColor
        };
        break;
      default:
        inputStyle = styles.underLine;
        break;
    }

    switch (this.props.inputBoxShape) {
      case TEXTFIELD_SHAPES.rounded:
        inputShape = styles.round;
        break;
      case TEXTFIELD_SHAPES.roundedEdge:
        inputShape = styles.roundedEdge;
        break;
      default:
        inputShape = styles.defaultShape;
        break;
    }

    let buttonAttributes = { inputStyle, inputShape };
    return buttonAttributes;
  };

  render() {
    return (
      <View>
        <View style={styles.inputContainer}>{this.renderInputs()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  inputBox: {
    width: 30,
    height: 30,
    margin: 15,
    justifyContent: 'center'
  },
  underLine: {
    borderBottomWidth: 1,
    borderColor: Theme.StreamInputField.borderColor
  },
  solid: {
    backgroundColor: Theme.StreamInputField.backgroundColor
  },
  boxed: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.StreamInputField.borderColor
  },
  solidBoxed: {
    backgroundColor: Theme.StreamInputField.backgroundColor,
    borderWidth: 1,
    borderColor: Theme.StreamInputField.borderColor
  },
  roundedEdge: {
    borderRadius: 5
  },
  round: {
    borderRadius: 15
  },
  defaultShape: {
    borderRadius: 0
  },
  inputText: {
    height: 30,
    padding: 0,
    textAlign: 'center',
    color: Theme.StreamInputField.textColor
  }
});

export default InstaremStreamInputField;