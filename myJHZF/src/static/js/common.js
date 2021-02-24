import {View,Text,ActivityIndicator,PermissionsAndroid,NativeModules,Alert,Linking,Platform} from "react-native"
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
export default{
    ListFooterComponent(showFoot){             //上拉加载组件
        return(
            <View style={{ height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                {showFoot?(<ActivityIndicator size="small" color="#666666"/>):null}
                <Text style={{ fontSize: 15, marginLeft:5,color:"#999999"}}>{showFoot?'正在加载中...':"加载完毕啦"}</Text>
            </View>
        )
    },
    moneyReg(text){    //输入金额正则验证
        let newText = (text != '' && text.substr(0,1) == '.') ? '' : text;
        newText = newText.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        newText = newText.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
        newText  = newText.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        newText = newText.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
        return newText;
    },
}