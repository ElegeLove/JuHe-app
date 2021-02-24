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
     Alert
   } from "react-native";
   import { SafeAreaView } from "react-navigation";
   import { LoginIn,authConfig } from "../http/urlApi";
   import AsyncStorage from '@react-native-community/async-storage';
   import Toast, {DURATION} from 'react-native-easy-toast'

//   import Images from "../images/index";
//   import { scaleSizeH, scaleSizeW } from "../size/index";
   export default class Login extends React.Component {
     constructor(props) {
       const { StatusBarManager } = NativeModules;
       const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
       super(props);
       this.state = {
        //  phoneVal:'',
        //  pwdVal:'',
         phoneVal:'15215136975',
         pwdVal:'123456',
        //  pwdVal:'123456',
        //  phoneVal:'15723141857',
         isPhone:'false',
         isPwd:'false',
         stateHeight:STATUSBAR_HEIGHT
       };
     }
     agreement(){
        this.props.navigation.push('UserAgreement');
     }
     userLogin(){
       LoginIn({mobile:this.state.phoneVal,password:this.state.pwdVal}).then((res)=>{
        var data = JSON.parse(res)
        if(data.code==0){
          AsyncStorage.setItem("token",String(data.data.token))
          this.props.navigation.navigate('Home')
        }else{
          this.refs.toast.show(data.msg);
        }
      })
     }
     render() {
       return (
         <View>
            <StatusBar
                 animated={true}
                 backgroundColor="rgba(204, 204, 204,0)"
                 hidden={false}
                 translucent={true}
                 barStyle="light-content"
                 networkActivityIndicatorVisible ={false}
                 showHideTransition={'fade'}
             />
             <View style={{padding:20,paddingTop:20+this.state.stateHeight}}>
                 <View style={styles.imglogo}>
                    <View>
                        <Image source={require('../../images/pic_logo.png')} style={styles.imgstyle}></Image>
                        <Text style={{textAlign:'center',fontSize:30}}>聚合支付</Text>
                    </View>
                 </View>
                <View style={{padding:20,margin:20}}>
                    <View style={{position: 'relative'}}>
                        <Image source={this.state.isPhone == 'true'?require('../../images/ic_phone_active.png'):require('../../images/ic_phone.png')} style={styles.imgInput}></Image>
                        <TextInput style={{ height: 40, borderColor: '#E5E5E5', borderBottomWidth: 1,paddingLeft:20 }} placeholder={'请输入手机号'} onFocus={()=>{this.setState({isPhone: 'true'});}} onBlur={()=>{this.setState({isPhone: 'false'});}} onChangeText={(value)=>{this.setState({phoneVal: value})}}/>
                    </View>
                    <View style={{marginTop:40,position: 'relative'}}>
                        <Image source={this.state.isPwd == 'true'?require('../../images/ic_password_active.png'):require('../../images/ic_password.png')} style={styles.imgInput}></Image>
                        <TextInput style={{ height: 40, borderColor: '#E5E5E5', borderBottomWidth: 1,paddingLeft:20 }} placeholder={'请输入登录密码'} secureTextEntry={true} onFocus={()=>{this.setState({isPwd: 'true'});}} onBlur={()=>{this.setState({isPwd: 'false'});}} onChangeText={(value)=>{this.setState({pwdVal: value});}}/>
                    </View>
                    <View style={styles.textstyle}>
                        <Text>登录即表示您同意</Text>
                        <TouchableOpacity onPress={this.agreement.bind(this)}>
                           <Text style={{color:'red'}}>《用户协议》</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.userLogin.bind(this)}>
                       <Text style={{backgroundColor:'rgb(215,134,161)',color:'#fff',textAlign:'center',fontSize:20,padding:8,borderRadius:5}}>登录</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomSty}>
                    <View style={styles.bottomTextSty}>
                        <Text style={{borderRightWidth:1,borderColor:'#ccc',paddingRight:20}} onPress={()=>{this.props.navigation.push('ForgetPwd')}}>忘记密码？</Text>
                        <Text style={{color:'red',paddingLeft:20}} onPress={()=>{this.props.navigation.push('Register')}}>注册账号</Text>
                    </View>
                </View>
             </View>
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
     imglogo:{
       marginBottom:240,
       marginTop:20,
       flex: 1,
       justifyContent:'center',
       alignItems:'center'
     },
     imgstyle:{
         width:180,
         height:180,
         borderRadius:90
     },
     textstyle:{
        marginTop:20,
        marginBottom:40,
        flexDirection:'row',
     },
     imgInput:{
        width:26,
        height:26,
        position: 'absolute',
        top:8,
        left:-6
     },
     bottomSty:{
        position:'relative',
        bottom:-100,
        left:0,
        justifyContent:'center',
        alignItems:'center'
     },
     bottomTextSty:{
        flexDirection:'row'
     }
   });