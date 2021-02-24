   import React from "react";
   import {
     View,
     Text,
     Image,
     StyleSheet,
     Platform,
     NativeModules,
     ScrollView,
     RefreshControl,
     BackHandler
   } from "react-native";
   import Toast, {DURATION} from 'react-native-easy-toast'
   import {PaydeIndex} from "../../pages/http/urlApi"      //请求

   export default class Profit extends React.Component {
     constructor(props) {
       super(props);
       const { StatusBarManager } = NativeModules;

       const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
       this.state = {
          stateHeight:STATUSBAR_HEIGHT,
          allData:{
            total_rec:0,
            balance:0,
            rec_balance:0,
            total_pay:0,
            pay_balance:0
          },
          refresh:false,         //下拉
       };
     }
     UNSAFE_componentWillMount(){
        this.getData()
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
        if (route != 'Profit') {
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
     getData(){
        PaydeIndex("").then((res)=>{
            var data = JSON.parse(res)
              if(data.code==0){
                  this.setState({
                      allData:data.data,
                      refresh:false
                  })
              } 
        })
     }
     _onRefresh(){          //下拉刷新
        this.setState({
          refresh:true
        },()=>{
          this.getData()
        })
     }
     render() {
         var datas = this.state.allData
       return (
         <View style={{paddingTop:this.state.stateHeight}}>
            <Text style={{fontSize:18,textAlign:'center',paddingTop:10}}>收益</Text>
            <ScrollView  refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={this._onRefresh.bind(this)} tintColor="#ff0000"
                                            title="Loading..."
                                            titleColor="#00ff00"/>}>
            <View style={{position: 'relative',paddingLeft:10,paddingRight:10,justifyContent:'center',alignItems: 'center'}}>
                <Image source={require('../../images/pic_payment.png')} style={{justifyContent:'center',alignItems: 'center'}}/>
                <View style={{position: 'absolute',top:0,left:0,padding:20}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontSize:24,color:'#fff',marginRight:10}}>收款</Text>
                        <View style={{width:236,height:1,borderStyle:'dashed',borderColor:'#fff',borderWidth:1,borderRadius:1}}></View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:20}}>
                        <View>
                            <Text style={styles.textTitle}>累计收款</Text>
                           <Text style={styles.textTitle}>&yen;{datas.total_rec}</Text>
                            <Text style={styles.textButton} onPress={()=>{this.props.navigation.navigate('ReceiptsDetails')}}>收款明细</Text>
                        </View>
                        <View>
                            <Text style={styles.textTitle}>收款及分享奖励</Text>
                           <Text style={styles.textTitle}>&yen; {datas.rec_balance}</Text>
                            <Text style={styles.textButton} onPress={()=>{let date = {title:'收款分享奖励',id:1};this.props.navigation.navigate('CashSurplus',date)}}>提现</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{position: 'relative',paddingLeft:10,paddingRight:10,justifyContent:'center',alignItems: 'center'}}>
                <Image source={require('../../images/pic_payment2.png')} style={{justifyContent:'center',alignItems: 'center'}}/>
                <View style={{position: 'absolute',top:0,left:0,padding:20}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontSize:24,color:'#fff',marginRight:10}}>付款</Text>
                        <View style={{width:236,height:1,borderStyle:'dashed',borderColor:'#fff',borderWidth:1,borderRadius:1}}></View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:20}}>
                        <View>
                            <Text style={styles.textTitle}>累计付款</Text>
                            <Text style={styles.textTitle}>&yen;{datas.total_pay}</Text>
                            <Text style={styles.textButton} onPress={()=>{this.props.navigation.navigate('PaymentDetails')}}>付款明细</Text>
                        </View>
                        <View>
                            <Text style={styles.textTitle}>付款及分享奖励</Text>
                                <Text style={styles.textTitle}>&yen; {datas.pay_balance}</Text>
                            <Text style={styles.textButton} onPress={()=>{let date = {title:'付款分享奖励',id:2};this.props.navigation.navigate('CashSurplus',date)}}>提现</Text>
                        </View>
                    </View>
                </View>
            </View>
            </ScrollView>
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
      textTitle:{
        fontSize:12,
        color:'#fff',
        lineHeight:30,
        textAlign:'center'
      },
      textButton:{
        paddingLeft:10,
        paddingRight:10,
        fontSize:11,
        color:'#fff',
        lineHeight:30,
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:20,
        textAlign:'center'
      }
   });