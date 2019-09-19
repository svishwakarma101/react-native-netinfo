import React, { Component } from 'react';
import { View, Animated, StyleSheet, ViewPropTypes } from 'react-native';
import { Colors } from '../utils/InstaremStyleSheet';
import PropTypes from 'prop-types';
import { CIRCLE_SIZES } from '../utils/Constants';

export default class InstaremAnimatedCircle extends Component {
  static propTypes = {
    isPrimary: PropTypes.bool,
    isBorderRequired: PropTypes.bool,
    value: PropTypes.object,
    size: PropTypes.string,
    thickness: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    unfilledColor: PropTypes.string,
    style: PropTypes.shape({
      ...ViewPropTypes.style
    }),
    animationMethod: PropTypes.func,
    shouldAnimateFirstValue: PropTypes.bool
  };

  static defaultProps = {
    isPrimary: true,
    value: {},
    size: CIRCLE_SIZES.medium,
    thickness: 2,
    color: Colors.blueGradientMid,
    unfilledColor: 'transparent',
    style: {},
    animationMethod: null,
    animationConfig: { duration: 200 },
    shouldAnimateFirstValue: false,
    onChange() {},
    onChangeAnimationEnd() {}
  };

  constructor(props) {
    super(props);
    this.circleSize = 0;
    this.width = 0;

    switch (this.props.size) {
      case CIRCLE_SIZES.small:
        this.circleSize = 50;
        break;
      case CIRCLE_SIZES.large:
        this.circleSize = 150;
        break;
      case CIRCLE_SIZES.max:
        this.circleSize = 200;
        break;
      default:
        this.circleSize = 100;
        break;
    }
    this.state = {
      animatedValue:
        props.value.constructor.name === 'AnimatedValue'
          ? null
          : new Animated.Value(props.shouldAnimateFirstValue ? 0 : props.value)
    };
  }

  componentDidMount() {
    if (
      this.props.value.constructor.name !== 'AnimatedValue' &&
      this.props.shouldAnimateFirstValue &&
      this.animationMethod
    ) {
      this.animateChange(this.props.value);
    }
  }

  UNSAFE_componentWillReceiveProps({ value }) {
    this.handleChange(value);
  }

  render() {
    const {
      isPrimary,
      thickness,
      unfilledColor,
      style,
      children,
      backgroundColor
    } = this.props;
    return (
      <View
        style={[
          this.fullCircleStyle,
          styles.row,
          !isPrimary && { backgroundColor: backgroundColor },
          style
        ]}
      >
        <View
          pointerEvents='box-none'
          style={[
            {
              ...this.fullCircleStyle,
              borderWidth: thickness,
              borderColor: unfilledColor
            },
            styles.circlePosition
          ]}
        >
          <View
            style={[
              styles.circleContainer,
              {
                marginTop: this.circleSize * 0.6,
                marginLeft: this.circleSize * 0.12
              }
            ]}
          >
            {children}
          </View>
        </View>
        {this.renderHalfCircle()}

        {this.renderHalfCircle({ isFlipped: true })}
      </View>
    );
  }

  get fullCircleStyle() {
    return {
      width: this.circleSize,
      height: this.circleSize,
      borderRadius: this.circleSize / 2
    };
  }

  get halfCircleContainerStyle() {
    return {
      width: this.circleSize / 2,
      height: this.circleSize,
      overflow: 'hidden'
    };
  }

  ANIMATION_TYPES = ['timing', 'spring', 'decay'];
  get animationMethod() {
    return this.ANIMATION_TYPES.includes(this.props.animationMethod)
      ? this.props.animationMethod
      : null;
  }

  handleChange = (value = this.props.value) => {
    this.props.onChange();
    if (value.constructor.name === 'AnimatedValue') {
      return;
    }

    if (this.animationMethod) {
      this.animateChange(value);
    } else {
      this.state.animatedValue.setValue(value);
    }
  };

  animateChange = value =>
    Animated[this.animationMethod](this.state.animatedValue, {
      toValue: value,
      useNativeDriver: true,
      ...this.props.animationConfig
    }).start(this.props.onChangeAnimationEnd);

  renderHalfCircle = ({ isFlipped = false } = {}) => {
    const { color, thickness, value, style } = this.props;
    const valueToInterpolate =
      value.constructor.name === 'AnimatedValue'
        ? value
        : this.state.animatedValue;

    return (
      <Animated.View
        pointerEvents='none'
        style={[
          {
            ...this.halfCircleContainerStyle,
            transform: [{ scaleX: isFlipped ? -1 : 1 }]
          },
          style
        ]}
      >
        <Animated.View
          style={{
            width: this.circleSize,
            height: this.circleSize,
            transform: [
              {
                rotate: valueToInterpolate.interpolate({
                  inputRange: isFlipped ? [0, 0.5] : [0.5, 1],
                  outputRange: isFlipped
                    ? ['180deg', '0deg']
                    : ['-180deg', '0deg'],
                  extrapolate: 'clamp'
                })
              }
            ]
          }}
        >
          <View style={this.halfCircleContainerStyle}>
            <View
              style={{
                ...this.fullCircleStyle,
                borderWidth: thickness,
                borderColor:
                  this.props.isBorderRequired || this.props.isPrimary
                    ? color
                    : 'transparent'
              }}
            />
          </View>
        </Animated.View>
      </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  circleContainer: {
    flex: 0
  },
  circlePosition: {
    position: 'absolute'
  }
});
