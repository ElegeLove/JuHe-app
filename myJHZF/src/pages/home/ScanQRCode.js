
import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  NativeModules,
  Alert,
  Animated,
  Easing,
  BackHandler
} from "react-native";
import axios from 'axios'; 
import { SafeAreaView } from "react-navigation";
import { LoginIn } from "../http/urlApi";
import AsyncStorage from '@react-native-community/async-storage';
import { RNCamera } from 'react-native-camera'
import Toast, {DURATION} from 'react-native-easy-toast'
import {Decrypt,Encrypt} from "../http/util/secret"
//   import Images from "../images/index";
//   import { scaleSizeH, scaleSizeW } from "../size/index";
export default class ScanQRCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        moveAnim: new Animated.Value(0)
    };
  }
  componentWillMount() {
    // //监听返回键
    BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
  }
      
  componentWillUnmount() {
      //取消对返回键的监听
      BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked);
  } 
  //BACK物理按键监听
  onBackClicked = () => {
      const route = this.props.navigation.state.routeName;
      if (route != 'My' || route != 'Profit' || route != 'Home') {
          this.props.navigation.pop();
          return true;//true 表示返回上一页
      }else {
          if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
          //最近0.5秒内按过back键，可以退出应用。
          BackHandler.exitApp();
          return false;
          }
          this.lastBackPressed = Date.now();
          this.refs.toast.show('再按一次退出应用',1000)
          return true;
      }
  }
  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    this.state.moveAnim.setValue(0);
    Animated.timing(
        this.state.moveAnim,
        {
            toValue: -200,
            duration: 1500,
            easing: Easing.linear
        }
    ).start(() => this.startAnimation());
  };
  //  识别二维码
  onBarCodeRead = (result) => {
    const { navigate } = this.props.navigation;
    const {data} = result;
    // data = JSON.parse(Decrypt(data))
    // console.log(data)
    axios.post(data,{}).then((res)=>{
      res = JSON.parse(Decrypt(res.data))
      if(res.code == 0){
        navigate('Payment', {
          id: res.data.id
        })
      }else{
        this.refs.toast.show(res.msg,1000)
        setTimeout(function(){navigate('Home')},1500)
        
        // navigate('Home')
        // this.props.history.go(-1)
        // this.props.navigation.pop(1)
      }
      // resolve(Decrypt(res.data));
    }).catch(err =>{
      err = JSON.parse(Decrypt(err))
          // reject(err)
      console.log(err)
    })
    // navigate('Sale', {
    //     url: data
    // })
  };

  render() {
    return (
        <View style={styles.container}>
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                onBarCodeRead={this.onBarCodeRead}
            >
              <View style={styles.rectangleContainer}>
                  <View style={styles.rectangle}/>
                  <Animated.View style={[
                      styles.border,
                      {transform: [{translateY: this.state.moveAnim}]}]}/>
                  <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
              </View>
            </RNCamera>
          <Toast  //提示
            ref="toast"
            style={{backgroundColor:'gray'}}
            position='center'
            positionValue={200}
            opacity={0.6}
            textStyle={{color:'white'}}
          />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row'
  },
  preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  rectangleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
  },
  rectangle: {
      height: 200,
      width: 200,
      borderWidth: 1,
      borderColor: '#00FF00',
      backgroundColor: 'transparent'
  },
  rectangleText: {
      flex: 0,
      color: '#fff',
      marginTop: 10
  },
  border: {
      flex: 0,
      width: 200,
      height: 2,
      backgroundColor: '#00FF00',
  }
});