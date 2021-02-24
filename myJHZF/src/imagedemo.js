import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

export default class imagedemo extends Component {
  render() {
    return (
      <View>
            <Image source={ { uri: 'img1' } } style={styles.img} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100
    }
})
