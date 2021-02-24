import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert
} from "react-native";
import { RegisterInfo,sendCode } from "../http/urlApi";
import { SafeAreaView } from "react-navigation";
import Toast, {DURATION} from 'react-native-easy-toast'

export default class Register extends React.Component {
  constructor(props) {
       super(props);
       let timeLeft = this.props.timeLeft > 0 ? this.props.timeLeft : 10;
       let begin = 0;
       let press = this.props.press;
       this.afterEnd = this.props.afterEnd || this._afterEnd;
       this.style = this.props.style;
       this.state = {
         phoneVal:'',
         codeVal:'',
         pwdVal:'',
         inviteVal:'',
         setState:'',
         begin:0,
         timeLeft:60,
       };
     }
   countdownfn(timeLeft, callback, begin) {
    if (timeLeft > 0) {
      this.state.begin = 1;
      let that = this;
      let interval = setInterval(function () {
        if (that.state.timeLeft < 1) {
          clearInterval(interval);
          callback(that)
        } else {
          let totalTime = that.state.timeLeft;
          that.setState({
            timeLeft: totalTime - 1
          })
        }
      }, 1000)
    }
   }
 
   _beginCountDown() {
    if (this.state.begin === 1){
      return;
    }
    sendCode({mobile:this.state.phoneVal,type:0}).then(res => {
      var res = JSON.parse(res)
      if(res.code==0){
        let time = this.state.timeLeft;
        let afterEnd = this.afterEnd;
        let begin = this.state.begin;
        this.countdownfn(time, afterEnd, begin)
        // this.props.navigation.navigate('Login');
      }else{
        this.refs.toast.show(res.msg);
      }
    })
    .catch(err =>{
      // reject(err)
      console.log(err)
    })
  }
 
   _afterEnd(that) {
    that.setState({
      begin : 0,
      timeLeft : 60,
    })
   }
 //注册
  register(){
   RegisterInfo({mobile:this.state.phoneVal,password:this.state.pwdVal,code:this.state.codeVal,invi_code:this.state.inviteVal}).then(res => {
    var res = JSON.parse(res)
        if(res.code==0){
          this.refs.toast.show(res.msg);
          this.props.navigation.navigate('Login');
        }else{
          // console.log(res.msg)
          this.refs.toast.show(res.msg)
        }
     })
     .catch(err =>{
         // reject(err)
         console.log(err)
     })
     //alert(this.state.phoneVal,this.state.codeVal,this.state.pwdVal,this.state.inviteVal)
     // if(this.state.pwdVal.length < 12 && this.state.pwdVal.length > 6){
     //     this.props.navigation.navigate('Login');
     // }else{
     //     alert('请输入6-12位登录密码')
     //     //Toast.show('请输入6-12位登录密码',1000)
     // }
  }
      agreement(){
          this.props.navigation.push('RegAgreement');
       }
  render() {
    return (
      <View style={{padding:20,margin:20}}>
           <View>
               <TextInput style={{ height: 40, borderColor: '#E5E5E5', borderBottomWidth: 1 }} placeholder={'请输入手机号'} onChangeText={(value)=>{this.setState({phoneVal: value})}}/>
           </View>
           <View style={{marginTop:40,position: 'relative'}}>
               <Text style={{position: 'absolute',right:0,top:0,color:'red',zIndex:999,textAlign:'center',paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10}} onPress={this._beginCountDown.bind(this)}>{ this.state.begin === 0 ? '获取验证码' : this.state.timeLeft}</Text>
               <TextInput style={{ height: 40, borderColor: '#E5E5E5', borderBottomWidth: 1 }} placeholder={'请输入验证码'} onChangeText={(value)=>{this.setState({codeVal: value})}}/>
           </View>
           <View style={{marginTop:40}}>
               <TextInput style={{ height: 40, borderColor: '#E5E5E5', borderBottomWidth: 1 }} maxLength={12} placeholder={'请输入6-12位登录密码'} secureTextEntry={true} onChangeText={(value)=>{this.setState({pwdVal: value});}}/>
           </View>
           <View style={{marginTop:40}}>
               <TextInput style={{ height: 40, borderColor: '#E5E5E5', borderBottomWidth: 1 }} placeholder={'请输入邀请码'} onChangeText={(value)=>{this.setState({inviteVal: value});}}/>
           </View>
           <View style={styles.textstyle}>
               <Text>注册即表示您同意</Text>
               <TouchableOpacity onPress={this.agreement.bind(this)}>
                  <Text style={{color:'red'}}>《注册协议》</Text>
               </TouchableOpacity>
           </View>
           <TouchableOpacity onPress={this.register.bind(this)}>
              <Text style={{backgroundColor:'rgb(215,134,161)',color:'#fff',textAlign:'center',fontSize:20,padding:8,borderRadius:5}}>注册</Text>
           </TouchableOpacity>
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
     textstyle:{
        marginTop:30,
        marginBottom:50,
        flexDirection:'row',
     },
});