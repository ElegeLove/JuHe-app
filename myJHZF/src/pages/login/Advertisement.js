import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import SplashScreen from 'react-native-splash-screen';
import { AdverPage } from "../http/urlApi";

export default class Advertisement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        icon_url:'',
        timeNum:4
    };
    this.times()
  }
  componentDidMount() {
    SplashScreen.hide(); // 关闭启动页
  }
  UNSAFE_componentWillMount(){
      AdverPage().then((res)=>{
        res = JSON.parse(res)
           if(res.code==0){
               this.setState({
                icon_url:res.data.index.icon_url
               })
           }
        })
  }
  userLogin(){
    clearInterval(this.timeInterval);
      this.props.navigation.navigate('Login')
  }
    times(){
        let that = this;
        this.timeInterval = setInterval(() => {
            if(that.state.timeNum <= 0){
                clearInterval(that.timeInterval);
                this.props.navigation.navigate('Login')
            }else{
                let num = that.state.timeNum;
                that.setState({
                    timeNum:num - 1
                })
            }
        }, 1000);
    }
  render() {
    return (
          <ImageBackground source={{uri:this.state.icon_url}}  style={styles.bgs}>
          {/* <ImageBackground source={require('../../images/pic_acceptpayment.png')} style={styles.bgs}> */}
            <TouchableOpacity activeOpacity={1} style={styles.btns} onPress={this.userLogin.bind(this)}>
                <Text>{this.state.timeNum}s</Text>
                <Text>跳过</Text>
            </TouchableOpacity>

         </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
   bgs:{
     flex:1,
     position:"relative"
   },
   btns:{
       width:56,
       height:56,
       borderRadius:28,
       padding:8,
       display:'flex',
       alignItems:'center',
       backgroundColor:'#ccc',
       position:'absolute',
       top:5,
       right:10,
   }
   
});