//TODO: Needs fixing

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const startTimer = () => {
    this.interval = setInterval(() => {
      this.setState((state: { time: number; }) => ({
        time: state.time + 1,
      }));
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(this.interval);
  };

export default class Timer extends React.Component {
    render() {
      return (
        <View>
        <Text>{this.state.time}</Text>
        </View>
      );
    }
  }