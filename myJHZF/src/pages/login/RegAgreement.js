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
     Alert,
     ScrollView
   } from "react-native";
   import { authConfig } from "../http/urlApi";
   import HTMLView from 'react-native-htmlview';
   export default class RegAgreement extends React.Component {
     constructor(props) {
       const { StatusBarManager } = NativeModules;
       const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
       super(props);
        this.state = {
            rule:''
        }
     }
     UNSAFE_componentWillMount(){
        this.agreement();
     }
     agreement(){
         authConfig("").then((res)=>{
            let data = JSON.parse(res)
            if(data.code==0){
              this.setState({
                rule:data.data.reg_protocol
              })
            }
         })
     }
     render() {
       return (
        <ScrollView style={{padding:20}}>
            <HTMLView
               style={{paddingBottom:30}}
               value={this.state.rule}
               stylesheet={styles}
            />
        </ScrollView>
       );
     }
   }
   const styles = StyleSheet.create({
       p:{
            padding:0,
            margin:0
       },
   });