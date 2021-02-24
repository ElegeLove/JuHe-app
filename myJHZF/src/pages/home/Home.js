   import React from "react";
   import {
     View,
     Text,
     Image,
     StyleSheet,
     StatusBar,
     TouchableOpacity,
     ImageBackground,
     BackHandler
   } from "react-native";
   import { getUserInfo,GetVoice } from "../http/urlApi";
   import Tts from'react-native-tts';
   import Toast, {DURATION} from 'react-native-easy-toast'

   export default class Home extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
            userInfo:{}
       };
     }
     UNSAFE_componentWillMount(){
         this.getUser();
         this.getTips();
     }
     componentDidMount () {
      // //监听返回键
      BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
    }
       
    componentWillUnmount() {
      //取消对返回键的监听
      console.log(11)
      BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked);
    
    } 
    //BACK物理按键监听
    onBackClicked = () => {
      console.log(this.props.navigation.state)
      const route = this.props.navigation.state.routeName;
      if (route != 'Home') {
        this.props.navigator.goBack();
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
     getTips(){
      GetVoice("").then((res)=>{
        res = JSON.parse(res)
        if(res.code==0){
          Tts.speak(res.msg);
          console.log(res.data.voice_msg)
            // this.setState({
            //   userInfo:res.data
            // })
        }
     })
    //  setInterval(() => {
    //   this.getTips();
    //  }, 2000);
    }
     getUser(){
       getUserInfo("").then((res)=>{
          if(res.code==0){
              this.setState({
                userInfo:res.data
              })
          }
       })
     }
     becones(status){            //申请收款码
        // if(status==-1||status==4){
        //   this.props.navigation.navigate('BecomeBusy')
        // }else{            //扫描二维码

        // }
        this.props.navigation.push('ScanQRCode')
     }
     setApplyNow(){
      // this.props.navigation.navigate('BecomeBusy')
      this.props.navigation.navigate('BecomeBusy', {
        callback: (() => { //回调函数
          this.getUser();
        })
      })
     }
     render() {
       var data = this.state.userInfo
       var status = this.state.userInfo.member_info_status
       return (
             <ImageBackground source={require('../../images/pic_acceptpayment.png')} style={styles.bgs}>
                   <StatusBar
                        animated={true}
                        backgroundColor="rgba(204, 204, 204,0)"
                        hidden={false}
                        translucent={true}
                        //  barStyle="light-content"
                        networkActivityIndicatorVisible ={false}
                        showHideTransition={'fade'}
                    />
                  <View style={styles.tops}>
                      <View style={styles.ops}>
                          <TouchableOpacity activeOpacity={0.6} onPress={()=>{this.props.navigation.push('Payment')}}>
                              <Text style={styles.phone}>{data.show_name}</Text>
                          </TouchableOpacity>
                      </View> 
                      <View style={styles.cont}>
                          <Text style={styles.titles}>【我的收款码】</Text>
                          <Text style={styles.payType}>支持微信支付和支付宝支付</Text>
                          {
                            status!==3?(
                              <View style={styles.cored}>
                                  <Image 
                                  source={status==-1?require("../../images/icon_Apply.png"):status==1||status==2?require("../../images/icon_InAudit.png"):
                                      require("../../images/icon_auditFailure.png")
                                  } 
                                  style={styles.nocode}></Image>
                                  <Text style={styles.sends}>{status==-1?'申请收款码享收益':status==1?'申请审核中~':'资料未通过~'}</Text>
                              </View>
                            ):(
                                <Image source={{uri:data.recqrcode}} style={styles.codes}></Image>
                            )
                          }
                         
                      </View> 
                  </View>
                  {
                    status == -1?(
                      <View style={styles.btns}>
                        <View style={styles.btnsBox}>
                          <TouchableOpacity activeOpacity={0.6} onPress={this.setApplyNow.bind(this,status)}>
                              <Image source={require("../../images/icon_ApplyNow.png")} style={styles.btnsItem}></Image>
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={0.6} onPress={this.becones.bind(this,status)}>
                              <Image source={require("../../images/icon_Scan.png")} style={styles.btnsItem}></Image>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ):null
                  }
                  {
                    (status == 3 || status == 2)?(
                      <TouchableOpacity activeOpacity={0.6} style={styles.btns} onPress={this.becones.bind(this,status)}>
                          <Image source={require("../../images/ones.png")} style={styles.small}></Image>
                      </TouchableOpacity>
                    ):null
                  }
                  {
                    status == 4?(
                      <View style={styles.btns}>
                        <View style={styles.btnsBox}>
                          <TouchableOpacity activeOpacity={0.6} onPress={this.setApplyNow.bind(this,status)}>
                              <Image source={require("../../images/icon_reApplyNow.png")} style={styles.btnsItem}></Image>
                          </TouchableOpacity>
                          <TouchableOpacity activeOpacity={0.6} onPress={this.becones.bind(this,status)}>
                              <Image source={require("../../images/icon_Scan.png")} style={styles.btnsItem}></Image>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ):null
                  }
                  {/* {
                    status!==1||status!==2?(
                      <TouchableOpacity activeOpacity={0.6} style={styles.btns} onPress={this.becones.bind(this,status)}>
                          <Image source={status==-1?require("../../images/pic_erweimaBtn.png"):status==3?require("../../images/rewact.png"):status==3?require("../../images/ones.png"):null} style={styles.small}></Image>
                      </TouchableOpacity>
                    ):null
                  } */}
              <Toast  //提示
                ref="toast"
                style={{backgroundColor:'gray'}}
                positionValue={200}
                opacity={0.6}
                textStyle={{color:'white'}}
            />
            </ImageBackground>
       );
     }
   }
   const styles = StyleSheet.create({
    codes:{
      width:152,
      height:152,
      marginTop:60,
      marginLeft:10
    },  
      payType:{
          fontSize:12,
          color:"#FFFFFF",
          marginTop:5
      },
      btns:{
        width:'100%',
        position:"absolute",
        bottom:23,
        // left:"50%",
        // marginLeft:-123
        flex:1,
        alignItems:'center',
      },
      btnsBox:{
        flex:2,
        flexDirection:'row'
      },
      btnsItem:{
        width:172.5,
        height:63.5
      },
      small:{
        width:246,
        height:63.5,
      },
      sends:{
        fontSize:15,
        color:"#FF2F1D",
        fontWeight:"bold",
        marginTop:15
      },
      nocode:{
        width:73.5,
        height:74,
        marginTop:35
      },
      cored:{
        display:"flex",
        alignItems:'center',
        marginTop:40
      },
      titles:{
        fontSize:18,
        color:'#FFFFFF'
      },
      cont:{
          display:'flex',
          alignItems:"center",
          marginTop:80
      },
      box:{
        flex:1,
        backgroundColor:"#fff"
      },
      bgs:{
        flex:1,
        position:"relative"
      },
      phone:{
         fontSize:24,
         color:'#333333',
         fontWeight:"bold",
         textAlign:"center",
         letterSpacing:2
      },
      ops:{
        position:"relative",
        display:"flex",
        alignItems:'center',
      },
      tops:{
        marginTop:65
      },
      imgs:{
        width:68,
        height:32.5,

      },
      onload:{
        zIndex:999,
        position:'absolute',
        top:0,
        left:"50%",
        marginLeft:50,
        marginTop:-29
      }
   });