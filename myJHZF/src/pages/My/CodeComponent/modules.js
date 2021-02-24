import React, { Component } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Image,ScrollView} from "react-native"
import {
    Modal,
  } from '@ant-design/react-native';
  var {width} =  Dimensions.get('window');

class Moduless extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalVisible:false,
            arr:[],
            check:-1
        }
        this.getListView = this.getListView.bind(this)
    }
    check(item){
        this.setState({
            check:item.bank_name
        })
        this.props.checkType(item)
    }
    childOpen(bank_name){          //打开弹窗
        this.setState({modalVisible:true,check:bank_name});
    }
    getListView(){
        var list = [];
        this.props.data.map((item,index)=>{
            list.push(
                <TouchableOpacity activeOpacity={0.6}  key={index} onPress={this.check.bind(this,item)}>
                    <View style={[styles.centers,styles.list]}>
                        <Text style={styles.txt}>{item.bank_name}</Text>
                        {
                            this.state.check==item.bank_name?(
                                <Image source={require("../../../images/Icon_selected.png")} style={styles.icon}></Image>
                            ):(
                                <Image source={require("../../../images/Icon_notselected.png")} style={styles.icon}></Image>
                            )
                        }
                    </View>
                </TouchableOpacity>
            )
        });
        return list;
    }
    render() { 
        return (  
            <Modal
                    popup
                    visible={this.state.modalVisible}
                    animationType="slide-up"
                    style={styles.models}
                    >
                  <View style={styles.headers}>
                    <Text style={{width:20}}></Text>
                     <Text style={styles.texts}>{this.props.title}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.setState({modalVisible:false});}}>
                        <Image source={require("../../../images/payment_failed.png")} style={[styles.close]}></Image>
                    </TouchableOpacity>
                </View>
                <View style={[styles.boxs]}>
                    <ScrollView style={{maxHeight:300}}>
                        {this.getListView()}
                    </ScrollView>
                    <TouchableOpacity activeOpacity={0.5} style={{paddingRight:14,paddingLeft:14,paddingTop:4}}>
                        <Text style={styles.btns}  onPress={()=>{this.setState({modalVisible:false});}}>确定</Text>
                    </TouchableOpacity>
                </View>
             </Modal>
        );
    }
}
 
const styles = StyleSheet.create({
    btns:{
        height:44,
        backgroundColor:"#EE1122",
        borderRadius:8,
        textAlign:"center",
        lineHeight:44,
        fontSize:20,
        color:'#FFFFFF',
        marginTop:5
    },
    txt:{
        fontSize:15,
        color:'#434343'
    },
    list:{
        justifyContent:"space-between",
        marginBottom:38,
        paddingLeft:14,
        paddingRight:14
    },
    icon:{
        width:18,
        height:18
    },
    boxs:{
        marginTop:51.5
    },
    models:{
        width:width,
        maxHeight:503,
        backgroundColor:"#fff",
        position:"absolute",
        bottom:0,
        left:0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingBottom:14.5
    },
    headers:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingTop:12,
        paddingLeft:14,
        paddingRight:14
    },
    texts:{
        fontSize:18,
        color:"#333333"
    },
    close:{
        width:20,
        height:20
    },
    centers:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    }
})

export default Moduless;