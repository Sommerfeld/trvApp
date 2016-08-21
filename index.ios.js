/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import HotelView from './js/HotelView';

class TrivagoApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HotelView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
});

AppRegistry.registerComponent('TrivagoApp', () => TrivagoApp);
