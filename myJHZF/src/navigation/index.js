import React, { Component } from 'react'
import {
     View,
     Text,
     Image,
     StyleSheet,
     StatusBar,
     TouchableOpacity,
     AppRegistry
   } from "react-native";
import {
  createAppContainer,
} from 'react-navigation'
import  { createStackNavigator }  from  "react-navigation-stack";
import  { createBottomTabNavigator }  from  "react-navigation-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  Advertisement,
  Login,
  UserAgreement,
  RegAgreement,
  ForgetPwd,
  Register,
  Home,
  Profit,
  My,
  Payment,
  PaymentResult,
  ReceiptsDetails,
  PaymentDetails,
  PresentationDetails,
  CashSurplus,
  Notice,
  MyTeam,
  BecomeBusy,
  ScanQRCode,
} from '../pages/index'
// index.js文件操作
import SplashScreen from 'react-native-splash-screen';

import App from '../../App';
import { name as appName } from '../../app';
AppRegistry.registerComponent(appName, () => {
  SplashScreen.hide();
  return App;
});
const TabNavigator = createBottomTabNavigator({
          Home: {
              screen: Home,
              navigationOptions: ({ navigation }) => ({
                  title:'收付款',
              }),
          },
          Profit: {
              screen: Profit,
              navigationOptions: {
                  title: '收益',
              },
          },
          My: {
              screen: My,
              navigationOptions: {
                  title:'我的',
              }
          },
      }, { //tab的一些配置
             defaultNavigationOptions: ({ navigation }) => ({
                 tabBarIcon: ({ focused, horizontal, tintColor }) => {//处理tab icon
                     const { routeName } = navigation.state;
                     let iconUrl;
                     switch (routeName) {
                         case 'Home':
                             iconUrl = focused ? require('../images/ic_acceptpayment_selected.png') : require('../images/ic_acceptpayment_notselected.png');
                             break;
                         case 'Profit':
                             iconUrl = focused ? require('../images/ic_revenue_selected.png') : require('../images/ic_revenue_notselected.png');
                             break;
                         default:
                             iconUrl = focused ? require('../images/ic_me_selected.png') : require('../images/ic_me_notselected.png');
                             break;
                     }
                     return <Image source={iconUrl} style={{ width: 26, height: 26 }} />;
                 },
             }),
             tabBarOptions: {
                 activeTintColor: '#fd0',
                 inactiveTintColor: '#666',
                 labelStyle: {
                     fontSize: 14
                 },
                 style: {
                     backgroundColor: '#fafafa',
                 }
             }
         });

class BackImage extends React.Component { //创建一个返回按钮的组件
  render() {
    return (
      <Image
        source={require('../images/Icon_return.png')}
        style={{ width: 10, height: 20}}
      />
    );
  }
}
const SketchRouter = createStackNavigator(
  {
    Advertisement: {
      screen: Advertisement,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Tab: {
        screen: TabNavigator,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    ForgetPwd: {
      screen: ForgetPwd,
      navigationOptions: ({ navigation }) => ({
        headerBackImage:<BackImage/>,
        headerTitle:'忘记密码',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }),
    },
    Register: {
      screen: Register,
        navigationOptions: {
          headerBackImage:<BackImage/>,
          title: '新用户注册',
          headerStyle:{
              borderBottomWidth: 0,
              elevation: 0,
              paddingTop:27
          },
          headerTitleStyle: {
              alignSelf:'center',
              textAlign: 'center',
              flex:1,
          },
          headerRight:React.createElement(View, null, null),
        }
      },
    UserAgreement: {
      screen: UserAgreement,
        navigationOptions: {
          headerBackImage:<BackImage/>,
          title: '用户协议',
          headerStyle:{
              borderBottomWidth: 0,
              elevation: 0,
              paddingTop:27
          },
          headerTitleStyle: {
              alignSelf:'center',
              textAlign: 'center',
              flex:1,
          },
          headerRight:React.createElement(View, null, null),
        }
    },
    RegAgreement: {
      screen: RegAgreement,
        navigationOptions: {
          headerBackImage:<BackImage/>,
          title: '注册协议',
          headerStyle:{
              borderBottomWidth: 0,
              elevation: 0,
              paddingTop:27
          },
          headerTitleStyle: {
              alignSelf:'center',
              textAlign: 'center',
              flex:1,
          },
          headerRight:React.createElement(View, null, null),
        }
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        headerBackImage:<BackImage/>,
        title: '付款',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }
    },
    PaymentResult: {
      screen: PaymentResult,
      navigationOptions: {
        headerBackImage:<BackImage/>,
        title: '付款成功',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }
    },
    ReceiptsDetails: {
      screen: ReceiptsDetails,
      navigationOptions: {
        headerBackImage:<BackImage/>,
        title: '收款明细',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }
    },
    PaymentDetails: {
      screen: PaymentDetails,
      navigationOptions: {
        headerBackImage:<BackImage/>,
        title: '支付明细',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }
    },
    PresentationDetails: {
      screen: PresentationDetails,
      navigationOptions: {
        headerBackImage:<BackImage/>,
        title: '提现明细',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }
    },
    CashSurplus: CashSurplus,
    MyTeam: {
      screen: MyTeam,
      navigationOptions: {
        headerBackImage:<BackImage/>,
        title: '我的团队',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }
    },
    Notice: {
      screen: Notice,
      navigationOptions: {
        headerBackImage:<BackImage/>,
        title: '通知',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }
    },
    BecomeBusy: {
      screen: BecomeBusy,
      navigationOptions: {
        headerBackImage:<BackImage/>,
        title: '申请收款码',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27,
            paddingBottom:12
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }
    },
    ScanQRCode: {
      screen: ScanQRCode,
      navigationOptions: {
        headerBackImage:<BackImage/>,
        title: '扫一扫',
        headerStyle:{
            borderBottomWidth: 0,
            elevation: 0,
            paddingTop:27,
            paddingBottom:12
        },
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            flex:1,
        },
        headerRight:React.createElement(View, null, null),
      }
    },

  },

  {
    headerBackTitleVisible: false,
  }
)

export default createAppContainer(SketchRouter)