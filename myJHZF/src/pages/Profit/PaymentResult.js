   import React from "react";
   import {
     View,
     Text,
     Image,
     StyleSheet,
     StatusBar,
     TouchableOpacity,
     BackHandler
   } from "react-native";
   import { SafeAreaView } from "react-navigation";
//   import Images from "../images/index";
//   import { scaleSizeH, scaleSizeW } from "../size/index";

   export default class PaymentResult extends React.Component {
     constructor(props) {
       super(props);
       let timeLeft = this.props.timeLeft > 0 ? this.props.timeLeft : 10;
      let begin = 0;
      let press = this.props.press;
      this.afterEnd = this.props.afterEnd || this._afterEnd;
      this.style = this.props.style;
       this.state = {
        isPwd:false,
        backTime:3
       };
       let that = this;
       let interval = setInterval(function () {
         if (that.state.backTime < 1) {
           clearInterval(interval);
                  // that.props.navigation.goBack();
                  that.props.navigation.navigate('Home')
         } else {
           let backTime = that.state.backTime;
           that.setState({
             backTime: backTime - 1
           })
         }
        }, 1000)
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
     render() {
       return (
         <View style={{position: 'relative'}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20}}>
                <Text onPress={()=>{this.setState({isPwd: !this.state.isPwd});}}>向{this.props.navigation.getParam("name")}</Text>
                <Text style={{color:'red'}}>付款&yen;{this.props.navigation.getParam("num")}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
                <View>
                    <Image source={this.props.navigation.getParam("isPwd") == true?require('../../images/payment_successful.png'):require('../../images/payment_failed.png')}></Image>
                    <Text style={{textAlign:'center',marginTop:20,fontSize:15}}>{this.props.navigation.getParam("isPwd") == true?'支付成功':'支付失败'}</Text>
                    <Text style={{color:'red',textAlign:'center',paddingTop:10}}>{ this.state.backTime}s</Text>
                </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:50}}>
                <Text style={{width:120,textAlign:'center',marginTop:20,fontSize:15,color:'red',borderWidth:1,borderColor:'red',borderRadius:20,paddingTop:10,paddingBottom:10}} onPress={()=>{this.props.navigation.navigate('Home')}}>返回收付款</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:200,padding:10}}>
                <Image source={require('../../images/pic_01.png')}></Image>
            </View>
         </View>
       );
     }
   }
   const styles = StyleSheet.create({

   });