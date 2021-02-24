import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'

export default class flexmode extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}></View>
                <View style={styles.box1}></View>
                <View style={styles.box2}></View>
                <TouchableOpacity>
                    <View>
                        <Text>121</Text>
                    </View>
                </TouchableOpacity>
                <Image source={{ uri: 'img1' } } style={styles.img} />
                <Image style={styles.img} source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556271609629&di=d0bd0c0680e5acf74f380e1f503185b3&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F11%2F96%2F52%2F59645d628f5eb.png' }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    img:{
        width: 100,
        height: 100,
    },
    container:{
        // flex: 1,
        // height: '100%',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // justifyContent: 'space-around',
        // alignItems: 'center',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    },
    box1: {
        width: 100,
        height: 100,
        backgroundColor: 'green'
    },
    box2: {
        width: 100,
        height: 100,
        backgroundColor: 'blue'
    }
})
