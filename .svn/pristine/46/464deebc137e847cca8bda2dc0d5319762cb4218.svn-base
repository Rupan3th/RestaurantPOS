/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { createAppContainer } from "react-navigation";

import AppNavigator from "./AppNavigator";


class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
        signedIn: false,
        checkedSignIn: false
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    console.log("App Unmounted");
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    // if (!checkedSignIn) {
    //     return null;
    // }

    const AppContainer = createAppContainer(AppNavigator(signedIn));
    return (
        <AppContainer />
    );
  }
};

export default App
