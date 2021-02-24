   import React from "react";
   import {
     View,
     Text,
     Image,
     StyleSheet,
     StatusBar,
     TouchableOpacity,
     Platform,
     NativeModules,
     Clipboard,
     BackHandler
   } from "react-native";
   import { SafeAreaView,navigation } from "react-navigation";
   import { getUserInfo } from "../http/urlApi";
   import Toast, {DURATION} from 'react-native-easy-toast'
   import SketchRouter from '../../navigation/index'
//   import Images from "../images/index";
//   import { scaleSizeH, scaleSizeW } from "../size/index";

   export default class My extends React.Component {
     constructor(props) {
     const { StatusBarManager } = NativeModules;
     const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
       super(props);
       this.state = {
         isBusiness:true,
         stateHeight:STATUSBAR_HEIGHT,
         userName:'',
         userIcon:'',
         rewardNum:'',
         teamNum:'',
         inviCode:'',
       };
       
     }
     UNSAFE_componentWillMount(){
        this.getUser();
        
    }
    componentDidMount () {
        // //监听返回键
        BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);
    }

    componentWillUnmount() {
        //取消对返回键的监听
        BackHandler.removeEventListener('hardwareBackPress', this.onBackClicked);
    }
    //BACK物理按键监听
    onBackClicked = () => {
        console.log(this.props.navigation.state.routeName)
        const route = this.props.navigation.state.routeName;
        if (route != 'My') {
            // goback();
            // this.props.navigator.goBack();
            // this.props.navigator.pop(-1)
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
     getUser(){
        getUserInfo({}).then(res => {
            if(res.code == 0){
             //    console.log(res)
                if(res.data.member_info_status == -1){
                     this.setState({
                         isBusiness:true
                     })
                }else{
                     this.setState({
                         isBusiness:false
                     })
                }
                this.setState({
                     userName:res.data.show_name,
                     userIcon:res.data.show_img,
                     rewardNum:res.data.reward_num,
                     teamNum:res.data.team_num,
                     inviCode:res.data.invi_code,
                })
            }
         }).catch(err =>{
             console.log(err)
         })
      }
     setApplyNow(){
        // this.props.navigation.navigate('BecomeBusy')
        this.props.navigation.navigate('BecomeBusy', {
          callback: (() => { //回调函数
            this.getUser();
          })
        })
       }
       async copy(){
        this.refs.toast.show('复制成功',1000)
        Clipboard.setString(this.state.inviCode);
        let  str = await Clipboard.getString();
    }
     render() {
       return (
         <View style={{position: 'relative',paddingTop:this.state.stateHeight}}>
            <View style={{position: 'absolute',top:0,}}>
                <Image style={{width:375,height:191}} source={require('../../images/me_bg.png')}></Image>
            </View>
            <View style={{width:'100%',position: 'absolute',top:10+this.state.stateHeight,padding:10}}>
                <TouchableOpacity activeOpacity={1} style={{position: 'absolute',right:10}} onPress={()=>{this.props.navigation.navigate('Notice')}}>
                   <Image style={{width:20,height:24}} source={require('../../images/Icon_notification.png')}></Image>
                </TouchableOpacity>
                <View style={{marginTop:20,flexDirection:'row',alignItems:'center'}}>
                    <View style={{marginRight:12,backgroundColor:'#fff',borderRadius:35}}>
                        <Image style={{width:70,height:70}} source={{uri:this.state.userIcon}}></Image>
                    </View>
                    <View>
                        <Text style={{fontSize:18,color:'#fff',marginBottom:10}}>{this.state.userName}</Text>
                        {this.state.isBusiness?<TouchableOpacity activeOpacity={1} style={{flexDirection:'row',alignItems:'center'}} onPress={this.setApplyNow.bind(this)}>
                                                                                                           <Image style={{width:12,height:12,marginRight:6}} source={require('../../images/Icon_merchant.png')}></Image>
                                                                                                           <Text style={{fontSize:10,color:'#fff'}}>申请收款码</Text>
                                                                                                       </TouchableOpacity>:<View></View>
                                                }
                    </View>
                </View>
            </View>
            <View style={{position: 'absolute',top:150+this.state.stateHeight,left:0,width:'100%',backgroundColor:'#fff',borderTopLeftRadius:15,borderTopRightRadius:15,paddingTop:28,paddingLeft:15,paddingRight:15,paddingBottom:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderLeftWidth:4,borderColor:'#EE1122',paddingLeft:8}}>
                    <Text style={{fontSize:18,color:'#333333'}}>我的团队</Text>
                    <TouchableOpacity activeOpacity={1} style={{flexDirection:'row',alignItems:'center'}} onPress={()=>{this.props.navigation.navigate('MyTeam')}}>
                        <Text style={{fontSize:12,color:'#999999'}}>查看</Text>
                        <Image style={{width:7,height:12,marginLeft:6}} source={require('../../images/ic_more.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',padding:20,backgroundColor:'#fafafa',marginTop:18,borderRadius:15}}>
                    <View style={{borderRightWidth:1,borderColor:'#E5E5E5',paddingLeft:32,paddingRight:32}}>
                        <Text style={{fontSize:24,color:'#323232'}}>&yen;{this.state.rewardNum}</Text>
                        <Text style={{fontSize:12,color:'#666'}}>累计奖励</Text>
                    </View>
                    <View style={{paddingLeft:32,paddingRight:32}}>
                        <Text style={{fontSize:24,color:'#323232'}}>{this.state.teamNum}人</Text>
                        <Text style={{fontSize:12,color:'#666'}}>团队成员</Text>
                    </View>
                </View>
                <View style={{borderLeftWidth:4,borderColor:'#EE1122',paddingLeft:8,marginTop:40,marginBottom:30}}>
                    <Text style={{fontSize:18,color:'#333333'}}>我的邀请码</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{fontSize:24,color:'#EE1122'}}>{this.state.inviCode}</Text>
                    <Text style={{fontSize:12,color:'#EE1122',borderWidth:1,borderColor:'#EE1122',borderRadius:15,paddingLeft:20,paddingRight:20,paddingTop:6,paddingBottom:6}} onPress={this.copy.bind(this)}>复制</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:40}}>
                    <Image style={{width:345,height:100}} source={require('../../images/pic_banner.png')}></Image>
                </View>
            </View>
            
            <Toast  //提示
                ref="toast"
                style={{backgroundColor:'gray'}}
                positionValue={200}
                opacity={0.6}
                textStyle={{color:'white'}}
            />
         </View>
       );
     }
   }
   const styles = StyleSheet.create({
   });