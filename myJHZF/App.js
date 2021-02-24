//import React from "react";
//import { View, Text } from "react-native";
//import  { createAppContainer }  from  "react-navigation";
//import  { createStackNavigator }  from  "react-navigation-stack";
//class Home extends React.Component {
//  render() {
//    return (
//      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//        <Text onPress={() => this.props.navigation.push('Detail')}>Home Click Me</Text>
//      </View>
//    );
//  }
//};
//class Detail extends React.Component {
//  render() {
//    return (
//      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//        <Text>Detail Screen</Text>
//      </View>
//    )
//  }
//};
//const AppNavigator = createStackNavigator({Home,Detail});
//export default createAppContainer(AppNavigator);

//import React, { Component } from 'react';
//import Router from './src/comfig/routes';
//
//export default class App extends Component {
//  render() {
//    return (
//      <Router />
//    );
//  }
//};

import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import SketchRouter from './src/navigation/index'
import Tts from'react-native-tts';

export default class App extends Component {
  UNSAFE_componentWillMount(){
    Tts.setDefaultLanguage('zh-CMN');
    Tts.getInitStatus().then((res) => {
    }, (err) => {
      if (err.code === 'no_engine') {
        Tts.requestInstallEngine();
      }
    });
    
  }
  render () {
    console.disableYellowBox = true
    return (
        <SketchRouter />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});