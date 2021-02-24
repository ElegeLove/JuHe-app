import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, Dimensions } from 'react-native'

let {width, height, scale} = Dimensions.get('window')

export default class math extends Component {
    constructor(p) {
        super(p)
        this.state = {
            num: 0
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <Button title='-' onPress={ this.rePress.bind(this)} />
                <Text>{this.state.num}</Text>
                <Button title='+' onPress={this.addPress.bind(this)} />
                {/* <Text>屏幕宽：{width}，高：{height}，缩放比：{scale}</Text> */}
            </View>
        )
    }
    rePress(){
        this.setState({
            num:this.state.num - 1
        })
    }
    addPress(){
        this.setState({
            num:this.state.num + 1
        })
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#F1F1F1',
    }
})
