import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Colors } from '../utils/InstaremStyleSheet';
import { CIRCLE_SIZES as TICK_SIZES } from '../utils/Constants';

export default class InstaremAnimatedTick extends Component {
  static defaultProps = {
    height: 10,
    borderColor: Colors.instaremWhite,
    borderWidth: 0,
    borderRadius: 0,
    barColor: Colors.blueGradientMid,
    fillColor: Colors.transparent,
    duration: 100,
    size: TICK_SIZES.medium
  };

  constructor(props) {
    super(props);
    this.width = 0;
    switch (this.props.size) {
      case TICK_SIZES.small:
        this.width = 33.33;
        break;
      case TICK_SIZES.large:
        this.width = 100;
        break;
      case TICK_SIZES.max:
        this.width = 133.33;
        break;
      default:
        this.width = 66.66;
        break;
    }
  }

  UNSAFE_componentWillMount() {
    this.animation = this.props.progress;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start();
    }
  }

  render() {
    const {
      height,
      width,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor
    } = this.props;

    this.width = width || this.width;

    const widthInterpolated1 = this.animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp'
    });
    const widthInterpolated2 = this.animation.interpolate({
      inputRange: [0.5, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp'
    });

    return (
      <View
        style={[
          styles.container,
          {
            height,
            width: this.width
          }
        ]}
      >
        <View
          style={[
            styles.leftComponentContainer,
            {
              borderColor,
              borderWidth,
              borderRadius,
              top: -this.width * 0.1,
              right: -this.width * 0.15
            }
          ]}
        >
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: fillColor }]}
          />
          <Animated.View
            style={[
              styles.leftComponent,
              {
                width: widthInterpolated1,
                backgroundColor: barColor
              }
            ]}
          />
        </View>
        <View
          style={[
            styles.rightComponentContainer,
            {
              borderColor,
              borderWidth,
              borderRadius,
              top: -this.width * 0.25
            }
          ]}
        >
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: fillColor }]}
          />
          <Animated.View
            style={[
              styles.rightComponent,
              {
                width: widthInterpolated2,
                backgroundColor: barColor
              }
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  leftComponentContainer: {
    flex: 2,
    borderColor: Colors.transparent,
    borderWidth: 0,
    borderRadius: 20,
    top: 0,
    right: 0,
    backgroundColor: Colors.transparent,
    transform: [{ rotate: '45deg' }]
  },
  leftComponent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 0
  },
  rightComponentContainer: {
    flex: 5,
    borderColor: Colors.transparent,
    borderWidth: 0,
    borderRadius: 20,
    top: 0,
    right: 0,
    backgroundColor: Colors.transparent,
    transform: [{ rotate: '315deg' }]
  },
  rightComponent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 0
  },
  circleContainer: {
    flex: 0
  },
  circlePosition: {
    position: 'absolute'
  }
});
