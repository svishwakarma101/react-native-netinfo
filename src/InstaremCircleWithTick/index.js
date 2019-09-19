import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import InstaremAnimatedCircle from './InstaremAnimatedCircle';
import InstaremAnimatedTick from './InstaremAnimatedTick';
import { CIRCLE_SIZES } from '../utils/Constants';
import { Colors } from '../utils/InstaremStyleSheet';

export default class InstaremCircleWithTick extends Component {
  static propTypes = {
    isPrimary: PropTypes.bool,
    isBorderRequired: PropTypes.bool,
    backgroundColor: PropTypes.string,
    duration: PropTypes.number,
    size: PropTypes.string,
    thickness: PropTypes.number,
    color: PropTypes.string,
    unfilledColor: PropTypes.string,
    animationMethod: PropTypes.func
  };

  static defaultProps = {
    isPrimary: true,
    duration: 650,
    size: CIRCLE_SIZES.small,
    thickness: 2,
    color: Colors.blueGradientMid,
    unfilledColor: 'transparent',
    animationConfig: { duration: 200 },
    shouldAnimateFirstValue: false,
    onChange() {},
    onChangeAnimationEnd() {}
  };

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    Animated.timing(this.animatedValue, {
      duration: this.props.duration || 650,
      easing: Easing.linear,
      useNativeDriver: false,
      isInteraction: true,
      toValue: 1
    }).start();
  }

  render() {
    const { thickness, unfilledColor, color, size } = this.props;
    return (
      <InstaremAnimatedCircle
        {...this.props}
        value={this.animatedValue}
        size={size}
        color={color}
        thickness={thickness}
        unfilledColor={unfilledColor}
        animationConfig={{ speed: 4 }}
      >
        <InstaremAnimatedTick
          height={thickness}
          barColor={color}
          size={size}
          progress={this.animatedValue}
          duration={100}
        />
      </InstaremAnimatedCircle>
    );
  }
}
