import React, { Component } from 'react'
import { Text, StyleSheet, View , WebView} from 'react-native'

export default class WebViewDemo extends Component {
  render() {
    return (
      <WebView source={ {uri: 'https://m.jd.com/'} } ></WebView>
    )
  }
}

const styles = StyleSheet.create({})
