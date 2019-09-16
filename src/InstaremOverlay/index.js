import React, { Component } from 'react';
import { Modal, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { APPLIED_THEME as Theme } from '../utils/Constants';

export default class InstaremOverlay extends Component {
  static propTypes = {
    overlayColor: PropTypes.string,
    shouldDismissOnTap: PropTypes.bool,
    dismiss: PropTypes.func,
    delay: PropTypes.number
  };

  static defaultProps = {
    delay: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      shouldDismissOnTap:
        this.props.shouldDismissOnTap !== undefined
          ? this.props.shouldDismissOnTap
          : false
    };
  }

  render() {
    return (
      <Modal
        {...this.props}
        animationType={'fade'}
        visible={this.state.visible}
        transparent
        shouldDismissOnTap={false}
        onRequestClose={this.onPressOverlay.bind(this)}
      >
        <TouchableOpacity
          style={[
            styles.container,
            this.props.style,
            this.props.overlayColor && {
              backgroundColor: this.props.overlayColor
            }
          ]}
          activeOpacity={1}
          onPress={this.onPressOverlay.bind(this)}
        >
          {this.props.children}
        </TouchableOpacity>
      </Modal>
    );
  }

  onPressOverlay() {
    if (this.state.shouldDismissOnTap && this.state.visible) {
      if (this.props.dismiss) {
        this.props.dismiss();
      }
      setTimeout(() => {
        this.dismiss();
      }, this.props.delay);
    }
  }

  dismiss() {
    this.state.visible = false;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Overlay.backgroundColor
  }
});
