import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'

let { width, height, scale } = Dimensions.get('window')
let getRandomNum = () => Math.ceil(Math.random() * 255)

export default class gezi extends Component {
  render() {
    return (
      <View style={styles.container}>
        {
          this.createGezi()
        }
      </View>
    )
  }

  createGezi(){
    let arr = []
    for(let i = 0; i < 9; i++){
      arr.push(<View style={{ width: width / 3, height: height / 3, backgroundColor: `rgb(${getRandomNum()},${getRandomNum()},${getRandomNum()})`} }>
        {/* <Text>{i}</Text> */}
      </View>)

    }
    
    return arr
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})
