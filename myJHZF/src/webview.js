import React, { Component } from 'react'
import { Text, StyleSheet, View, WebView } from 'react-native'

export default class webview extends Component {
    render() {
        return (
            <WebView source={ {uri: 'https://m.dianping.com/'} } ></WebView>
        )
    }
}

const styles = StyleSheet.create({})
