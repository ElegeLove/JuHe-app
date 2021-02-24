   import React from "react";
   import {
     View,
     Text,
     Image,
     TextInput,
     StyleSheet,
     StatusBar,
     TouchableOpacity,
     Alert,
     NativeModules
   } from "react-native";
   import { SafeAreaView } from "react-navigation";
   import *as wechat from 'react-native-wechat'
   import { placeOrder,Paybark,RecmemberInfo } from "../http/urlApi";
   import Toast, {DURATION} from 'react-native-easy-toast'
// If you register here

//   import Images from "../images/index";
//   import { scaleSizeH, scaleSizeW } from "../size/index";

   export default class Payment extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         shopName:'',
         moneyVal:'',
         moneySum:'',
         barkVal:'',
         isWeChat:0,
       };
     }
      UNSAFE_componentWillMount(){
         console.log(this.props.navigation.getParam("id"))
         if(this.props.navigation.getParam("id")){
            RecmemberInfo({mid:this.props.navigation.getParam("id")}).then((res)=>{
               res = JSON.parse(res)
               if(res.code == 0){
                  this.setState({
                     shopName:res.data.show_name
                  })
               }else{
                  this.refs.toast.show(res.msg);
               }
             }).catch((err)=>{
               err = JSON.parse(err)
                this.refs.toast.show(err.msg);
             })
         }
      }
     componentDidMount (){
      wechat.registerApp('wx17b7990e46e7651a')
    }
    payAmount(val){
       Paybark({amount:val}).then((res)=>{
         res = JSON.parse(res)
         if(res.code == 0){
            this.setState({
               barkVal:res.data.return_amount
            })
         }
       }).catch((err)=>{
         err = JSON.parse(err)
          this.refs.toast.show(err.msg);
       })
    }
     paySure(){
      // onPress={()=>{this.props.navigation.navigate('PaymentResult')}}
      //   console.log(this.state.isWeChat)
      // console.log(JSON.parse("token\u5df2\u5931\u6548\u8bf7\u91cd\u65b0\u767b\u5f55"))
        if(this.state.isWeChat == 1){
            placeOrder({s_mid:JSON.stringify(this.props.navigation.getParam("id")),plat:'1',amount:this.state.moneyVal}).then((res)=>{
               var res = JSON.parse(res)
               if(res.code==0){
                  console.log(res)
                  // let payObject = {
                  //    appId: WXAppId,  //appid
                  //    partnerId: SHId,   //商户号
                  //    prepayId: payData.prepayId, //商家预支付id
                  //    nonceStr: noceStr,  //随机字符串
                  //    timeStamp: currentTimestamp, //时间戳
                  //    package: "Sign=WXPay", //商家指定签名
                  //    sign: signMd5 //签名
                  // }
                  WeChat.pay(res.data.order_string).then((success) => {
                     this.props.navigation.navigate('PaymentResult',{
                        name: this.state.shopName,
                        isPwd:true,
                        num:this.state.moneyVal
                     })
                  }).catch((error) => {
                     this.props.navigation.navigate('PaymentResult',{
                        name: this.state.shopName,
                        isPwd:false,
                        num:this.state.moneyVal
                     })
                     // if (error.errCode == -2) {
                     //    // Toast.fail('支付失败:用户取消');
                     //    Alert.alert('','支付失败:用户取消')
                     // }else{
                     //    // Toast.fail('支付失败');
                     //    Alert.alert('','支付失败')
                     // }
                  })
               }else{
                  this.refs.toast.show(res.msg);
               }
            }).catch((error) => {
               console.log(error)
               this.refs.toast.show(error.msg);
            })
         }else{
            placeOrder({s_mid:JSON.stringify(this.props.navigation.getParam("id")),plat:'2',amount:this.state.moneyVal}).then((res)=>{
               var res = JSON.parse(res)
               console.log(res)
               if(res.code==0){
                  NativeModules.Alipay.pay(res.data.order_string).then((data)=>{
                     if(data.resultStatus==9000){
                        this.props.navigation.navigate('PaymentResult',{
                           name: this.state.shopName,
                           isPwd:true,
                           num:this.state.moneyVal
                        })
                     }else{
                        this.props.navigation.navigate('PaymentResult',{
                           name: this.state.shopName,
                           isPwd:false,
                           num:this.state.moneyVal
                        })
                     }
                  })
               }else{
                  // console.log(res)
                  this.refs.toast.show(res.msg);
               }
            }).catch((error) => {
               //  console.log(JSON.parse(error))
                this.refs.toast.show(error.msg);
            })
        }
     }
     render() {
       return (
         <View style={{paddingLeft:20,paddingRight:20}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:16}}>向</Text><Text style={{color:'red',fontSize:16}}>{this.state.shopName}</Text><Text style={{fontSize:16}}>付款</Text></View>
            <Text style={{fontSize:16,marginTop:40}}>付款金额</Text>
            <View style={{position: 'relative',marginTop:40}}>
                <Text style={styles.imgInput}>&yen;</Text>
                <TextInput style={{ lineHeight: 80, borderWidth: 0,paddingLeft:30,backgroundColor:'#F5F5F5',borderRadius:5 }} placeholder={'请输入付款金额'} onChangeText={(value)=>{this.setState({moneyVal: value});this.payAmount(value)}}/>
                <Text style={{marginTop:10,fontSize:14,color:'red'}}>{this.state.moneyVal.length>0?'*您将节省￥'+this.state.barkVal:''}</Text>
            </View>
            <Text style={{fontSize:15,marginTop:10}}>付款方式</Text>
            <View style={{marginTop:30}}>
                <TouchableOpacity activeOpacity={1} style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} onPress={()=>{this.setState({isWeChat: 1})}}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Image style={{width:26,height:26}} source={require('../../images/ic_WeChat.png')}></Image>
                      <Text style={{marginLeft:10}}>微信支付</Text>
                   </View>
                   <Image style={{width:18,height:18}} source={this.state.isWeChat == 1?require('../../images/Icon_selected.png'):require('../../images/Icon_notselected.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{marginTop:30,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} onPress={()=>{this.setState({isWeChat: 2})}}>
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                      <Image style={{width:26,height:26}} source={require('../../images/ic_alipay.png')}></Image>
                      <Text style={{marginLeft:10}}>支付宝支付</Text>
                   </View>
                   <Image style={{width:18,height:18}} source={this.state.isWeChat == 2?require('../../images/Icon_selected.png'):require('../../images/Icon_notselected.png')}></Image>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{marginTop:60}} onPress={this.paySure.bind(this)}>
               <Text style={{backgroundColor:'#EE1122',color:'#fff',textAlign:'center',fontSize:20,padding:8,borderRadius:5}}>确定</Text>
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
      imgInput:{
          position: 'absolute',
          top:4,
          left:10,
          fontSize:30,
          zIndex:2,
          color:'red'
      },
   });