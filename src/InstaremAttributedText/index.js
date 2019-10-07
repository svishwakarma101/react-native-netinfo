import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { APPLIED_THEME as Theme } from '../utils/Constants';
export default class InstaremAttributedText extends Component {
  constructor(props) {
    super(props);
    this.endString = '';
    this.finalAttributedComponent = [];
  }

  static proptypes = {
    theme: PropTypes.object,
    text: PropTypes.string.isRequired,
    textStyle: PropTypes.shape({
      ...Text.propTypes.style
    }),
    attributedText: PropTypes.array,
    attributedTextStyle: PropTypes.shape({
      ...Text.propTypes.style
    }),
    aboutLinks: PropTypes.object,
    didTapAttributedText: PropTypes.func
  };

  static defaultProps = {
    theme: Theme,
    attributedTextStyle: {
      color: Theme.AttributedText.attributedTextColor
    }
  };

  createAttributedText = (text, attributedText, index) => {
    const {
      theme,
      textStyle,
      attributedTextStyle,
      didTapAttributedText
    } = this.props;
    const lowerCaseText = text.toLowerCase();
    const lowerCaseAttributedText = attributedText.toLowerCase();

    let initialString = text;
    let searchString = '';
    let endString = '';

    if (lowerCaseText.indexOf(lowerCaseAttributedText) > -1) {
      const startIndex = lowerCaseText.indexOf(lowerCaseAttributedText);
      initialString = text.slice(0, startIndex);
      searchString = text.slice(startIndex, startIndex + attributedText.length);
      endString = text.slice(startIndex + attributedText.length, text.length);
    }

    this.finalAttributedComponent.push(
      <Text
        key={`initialStringComponent ${index}`}
        style={[TextLabelStyles.simpleText, textStyle]}
      >
        {initialString}
      </Text>
    );
    this.finalAttributedComponent.push(
      <Text
        key={`finalStringComponent ${index}`}
        style={StyleSheet.flatten([
          TextLabelStyles.simpleText,
          { color: theme.AttributedText.attributedTextColor },
          attributedTextStyle
        ])}
        onPress={() => didTapAttributedText(searchString)}
      >
        {searchString}
      </Text>
    );

    this.endString = endString;
  };

  createAttributedMessage() {
    this.finalAttributedComponent = [];

    this.endString = this.props.text;
    this.props.attributedText.map((val, index) => {
      this.createAttributedText(this.endString, val, index);
    });

    this.finalAttributedComponent.push(
      <Text
        key={'finalString'}
        style={[TextLabelStyles.simpleText, this.props.textStyle]}
      >
        {this.endString}
      </Text>
    );
    return this.finalAttributedComponent;
  }

  render() {
    return (
      <View style={{ flexDirection: 'column' }} testID={'AttributedTextLabel'}>
        <Text style={{ flexDirection: 'row' }}>
          {this.createAttributedMessage()}
        </Text>
      </View>
    );
  }
}

const TextLabelStyles = StyleSheet.create({
  simpleText: {
    color: Theme.AttributedText.textColor
  }
});
