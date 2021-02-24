   import React from "react";
   import {
     View,
     Text,
     Image,
     Alert,
     TextInput,
     StyleSheet,
     TouchableOpacity,
     Platform,
     NativeModules,
     BackHandler
   } from "react-native";
   import {MemberWechat,MemberInfo,withdrawAdd,memberAliloginparam,MemberAlip,authConfig} from "../http/urlApi"
   import * as WeChat from 'react-native-wechat';
   import Common from "../../static/js/common"         //公共js
   import qs from "qs"
   import {
    Provider,
    Toast
  } from '@ant-design/react-native';

   class BackImage extends React.Component { //创建一个返回按钮的组件
     render() {
        return (
          <Image
            source={require('../../images/Icon_return.png')}
            style={{ width: 10, height: 20}}
          />
        );
    }
}
   export default class CashSurplus extends React.Component {
     constructor(props) {
       const { StatusBarManager } = NativeModules;
       const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
       super(props);
       this.state = {
           moneyVal:'',
           moneySum:'',
           stateHeight:STATUSBAR_HEIGHT,
           userInfo:{},              //用户信息
           postData:{
             type:"",
             plat:1,           //2是支付宝
             amount:""
           },
           aliyun:"",       //支付宝登录参数
           rule:{},          //提现规则
           show:false           //显示隐藏
       };
       this.aliyun = this.aliyun.bind(this)
     }
     UNSAFE_componentWillMount(){
          this.setState({
             postData:{
               ...this.state.postData,
               type:this.props.navigation.state.params.id
             }
          })
          this.getUserInfo()
          this.getMemberAliloginparam()
          this.getAuthConfig()
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
     getAuthConfig(){          //获取配置信息
        authConfig("").then((res)=>{
            let data = JSON.parse(res)
           if(data.code==0){
             this.setState({
               rule:data.data
             })
           }
        })
     }
     getMemberAliloginparam(){          //获取支付宝登录参数
        memberAliloginparam("").then((res)=>{
          var data = JSON.parse(res)
          if(data.code==0){
              this.setState({
                aliyun:data.data
              })
          }
        })
     }
     getUserInfo(){        //获取用户信息
          MemberInfo("").then((res)=>{
            var data = JSON.parse(res)
            if(data.code==0){
              this.setState({
                userInfo:data.data
              },()=>{
                  this.setState({
                    show:true
                  })
              })
            }
         })
     }
     componentDidMount(){         //初始化微信
        WeChat.registerApp('wx17b7990e46e7651a');
     }
     wechatLogin(code){            //微信授权
       MemberWechat({code}).then((res)=>{
          var data = JSON.parse(res)
          if(data.code==0){
            Toast.info("绑定成功",1,'',false)
            this.getUserInfo()
          }
       })
     }
     async wechat(){         //微信授权操作
       try {
          let appOr = await WeChat.isWXAppInstalled();
          if(!appOr){
            return Alert.alert( '没有安装微信软件，请您安装微信之后再试' );
          }
          let data = await WeChat.sendAuthRequest("snsapi_userinfo","ares");
          this.wechatLogin(data.code)
       } catch (error) {
          setTimeout(()=>{
            Alert.alert("绑定失败") 
          },100)
       } 
     }
     aliyunLogin(result){          //支付宝授权
         var code = (qs.parse(result)).auth_code
         MemberAlip({code}).then((res)=>{
          var data = JSON.parse(res)
          if(data.code==0){
            Toast.info("绑定成功",1,'',false)
            this.getUserInfo()
          }
       })
     }
     async aliyun(){          //支付宝授权操作
        // NativeModules.Alipay.setAlipaySandbox(false)      //沙箱
        NativeModules.Alipay.authWithInfo(this.state.aliyun).then((data)=>{
          if(data.resultStatus==9000){
              this.aliyunLogin(data.result)
          }else{
             this.refs.toast.show(data.memo);
          }
        })
  
     }
     _showPop(type){
        Alert.alert(
          type==1?"绑定微信":"绑定支付宝",
          `绑定${type==1?'微信':"支付宝"}仅做提现使用，是否绑定？`,
          [
            {
              text: "取消",
              onPress: () => {},
              style: "cancel"
            },
            {
              text: "确定",
              onPress: () => {
                 if(type==1){
                    this.wechat()
                 }else{
                    this.aliyun()
                 }
              }
            }
          ],
          {
              cancelable: true,
              onDismiss: () => {}
          }
        );
     }
     submits(){          //确定
        if(this.state.postData.amount==""){
            return Toast.info("请输入金额",1,'',false)
        }
        let data = JSON.parse(JSON.stringify(this.state.postData))
        withdrawAdd(data).then((res)=>{
          Toast.info(res.msg,1,'',false)
            if(res.code==0){
              this.getUserInfo()
              this.setState({
                  postData:{
                    ...this.state.postData,
                    amount:""
                  }
              })
            }
        })
     }
     checkPay(plat){        //切换支付方式
        this.setState({
            postData:{
              ...this.state.postData,
              plat
            }
        })
     }
     _iptMoney(value){            //输入金额双向绑定
         var txt = Common.moneyReg(value);
        this.setState({
          postData:{
            ...this.state.postData,
            amount:txt
          }
        })
     }
     static navigationOptions = ({navigation}) => ({
         //title: navigation.state.params.title,
         title: navigation.state.params.title,
         headerBackImage:()=>(<Image source={require('../../images/Icon_return.png')} style={{ width: 10, height: 20}}/>),
         headerStyle:{
             borderBottomWidth: 0,
             elevation: 0,
             paddingTop:27,
         },
         headerTitleStyle: {
             alignSelf:'center',
             textAlign: 'center',
             flex:1,
         },
         headerRight:React.createElement(View, null, null),
     })
     render() {
       let info = this.state.userInfo
       let type = this.props.navigation.state.params.id
       return (
         <Provider>
         <View style={{paddingLeft:20,paddingRight:20}}>
           {this.state.show?(
             <View>
            <View style={{justifyContent:'center',alignItems:'center',position: 'relative'}}>
              <Image style={{height:100}} source={require('../../images/Balance_background.png')}></Image>
              <View style={{position: 'absolute',top:18,left:0}}>
                  <Text style={{color:'#dfebff'}}>收款金额</Text>
                  <View style={{width:320,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                   <Text style={{fontSize:30,color:'#FFFFFF'}}>&yen;{type==1?info.rec_balance:info.pay_balance}</Text>
                      <Text style={{color:'#FFFFFF',borderWidth:1,borderColor:'#fff',borderRadius:20,padding:10}} onPress={()=>{this.props.navigation.navigate('PresentationDetails',{type:this.props.navigation.state.params.id})}}>提现明细</Text>
                  </View>
              </View>
          </View>
          <Text style={{fontSize:16,marginTop:20}}>提现金额</Text>
          <View style={{position: 'relative',marginTop:20}}>
              <Text style={styles.imgInput}>&yen;</Text>
              <TextInput style={{borderWidth: 0,paddingLeft:30,backgroundColor:'#F5F5F5',borderRadius:5}} 
                placeholder={'请输入付款金额'} onChangeText={this._iptMoney.bind(this)}
                value={this.state.postData.amount} 
                keyboardType='decimal-pad' 
              />
              <Text style={{marginTop:10,fontSize:14,color:'#999999'}}>提现规则：{type==1?this.state.rule.wd_rec_rule:this.state.rule.wd_pay_rule}</Text>
          </View>
          <Text style={{fontSize:15,marginTop:60}}>提现至</Text>
          <View style={{marginTop:30}}>
              <TouchableOpacity activeOpacity={1} style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} onPress={this.checkPay.bind(this,1)}>
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{width:26,height:26}} source={require('../../images/ic_WeChat.png')}></Image>
                    <Text style={{marginLeft:10}}>微信支付</Text>
                    {
                      info.wx_openid==null||info.wx_openid==""?(
                          <Text style={{marginLeft:10,fontSize:12,color:'#EE1122',borderWidth:1,borderColor:'#EE1122',borderRadius:20,paddingLeft:10,paddingRight:10}} onPress={this._showPop.bind(this,1)}>立即绑定</Text>
                      ):null
                    }
                 </View>
                 <Image style={{width:18,height:18}} source={this.state.postData.plat == 1?require('../../images/Icon_selected.png'):require('../../images/Icon_notselected.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={{marginTop:30,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} onPress={this.checkPay.bind(this,2)}>
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{width:26,height:26}} source={require('../../images/ic_alipay.png')}></Image>
                    <Text style={{marginLeft:10}}>支付宝支付</Text>
                    {
                      info.ali_openid==null||info.ali_openid==""?(
                        <Text style={{marginLeft:10,fontSize:12,color:'#EE1122',borderWidth:1,borderColor:'#EE1122',borderRadius:20,paddingLeft:10,paddingRight:10}} onPress={this._showPop.bind(this,2)}>立即绑定</Text>
                      ):null
                    }
                 </View>
                 <Image style={{width:18,height:18}} source={this.state.postData.plat == 2?require('../../images/Icon_selected.png'):require('../../images/Icon_notselected.png')}></Image>
              </TouchableOpacity>
          </View>
          <TouchableOpacity style={{marginTop:60}} onPress={this.submits.bind(this)}>
             <Text style={{backgroundColor:'#EE1122',color:'#fff',textAlign:'center',fontSize:20,padding:8,borderRadius:5}}>确定</Text>
          </TouchableOpacity>
            </View>
           ):null
          }
           
         </View>
         </Provider>
       );
     }
   }
   const styles = StyleSheet.create({
      imgInput:{
          position: 'absolute',
          top:4,
          left:10,
          fontSize:30,
          zIndex:2,
          color:'red'
      }
   });