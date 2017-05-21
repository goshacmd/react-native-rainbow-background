import React, { Component } from 'react';
import {
  View,
  Animated,
} from 'react-native';

const colors = ['#00ff0d', '#00f2ff', '#0051ff', '#70f', '#f0b', '#ff0015', '#ffea00'];

export default class RainbowBackground extends Component {
  componentWillMount() {
    this._bgColor = new Animated.Value(1);
  }

  componentDidMount() {
    let prevColor = 0;
    let dir = 0;
    const cycleColors = () => {
      if (prevColor === 7 && dir == 0) {
        prevColor = 6;
        dir = 1;
      } else if (prevColor === 1 && dir === 1) {
        prevColor = 2;
        dir = 0;
      } else if (dir === 0) {
        prevColor = prevColor + 1;
      } else {
        prevColor = prevColor - 1;
      }
      Animated.timing(this._bgColor, {
        toValue: prevColor,
        duration: 200,
      }).start(() => cycleColors());
    }
    cycleColors();
  }

  componentWillUnmount() {
  }

  render() {
    const bgColor = this._bgColor.interpolate({
      inputRange: [1, 2, 3, 4, 5, 6, 7],
      outputRange: colors,
    });

    return (
      <Animated.View
        {...this.props}
        style={[{ backgroundColor: bgColor }, this.props.style]}
      />
    );
  }
}
