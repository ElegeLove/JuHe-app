import React,{Component} from "react"
import {View,Text,StyleSheet,TouchableOpacity,TextInput,ScrollView} from "react-native"
import UploadCard from "./uploadCard"          //身份证
import Blank from "./blank"          //银行卡信息
import { Applymember,ApplymemberInfo } from "../../http/urlApi";
import AsyncStorage from '@react-native-community/async-storage';
import {
    Provider,
    Toast
  } from '@ant-design/react-native';

export default class Personal extends Component{
    constructor(props) {
        // const { StatusBarManager } = NativeModules;
        // const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
        super(props);
        this.state = {
            nameVal:'',
            cardId:'',
            phoneVal:'',
            cardImg:{},
            bankInfo:{}
        };
    }
    UNSAFE_componentWillMount(){
        AsyncStorage.getItem('token').then((item)=>{
            ApplymemberInfo({token:item}).then(res=>{
                res = JSON.parse(res)
                // console.log(res)
                if(res.code == 0){
                    if(res.data.info_type == 1){
                        this.setState({
                            nameVal:res.data.realname,
                            cardId:res.data.id_card,
                            phoneVal:res.data.phone,
                            bankInfo:{
                                bankVal:res.data.bank_number,             //银行卡号
                                bank_name:res.data.bank_name,             //开户银行
                                sub_branch_name:res.data.bank_branch_name,             //开户支行
                                province:res.data.province,               //开户地址 省 地区代码
                                city:res.data.city,               //开户地址 市 地区代码
                                area:res.data.area,               //开户地址 区 地区代码
                                arr:[res.data.province_text,res.data.city_text,res.data.area_text]
                            },
                            cardImg:{
                                front_id_card:res.data.id_card_face_icon_src,
                                front_id_card_id:res.data.id_card_face_icon,
                                back_id_card:res.data.id_card_country_icon_src,
                                back_id_card_id:res.data.id_card_country_icon,
                            }
                        })
                    }else{
                        this.setState({
                            nameVal:'',
                            cardId:'',
                            phoneVal:'',
                            bankInfo:{
                                bankVal:'',             //银行卡号
                                bank_name:'',             //开户银行
                                sub_branch_name:'',             //开户支行
                                province:'',               //开户地址 省 地区代码
                                city:'',               //开户地址 市 地区代码
                                area:'',               //开户地址 区 地区代码
                                arr:[]
                            },
                            cardImg:{
                                front_id_card:'',
                                front_id_card_id:'',
                                back_id_card:'',
                                back_id_card_id:'',
                            }
                        })

                    }
                    this.myCard.dataList(this.state.bankInfo);
                    this.myImgs.imgList(this.state.cardImg);
                }
            })
        })
    }
    imgCaedUpload(m){
        this.setState({
            cardImg: m
        })
    }
    bankCard(m){
        this.setState({
            bankInfo:m
        })
    }
    applyNowBtn(){
        let obj = {
            info_type:1,
            realname:this.state.nameVal,
            phone:this.state.phoneVal,
            id_card:this.state.cardId,
            id_card_face_icon:this.state.cardImg.front_id_card_id,
            id_card_country_icon:this.state.cardImg.back_id_card_id,
            bank_number:this.state.bankInfo.bankVal,
            bank_name:this.state.bankInfo.bank_name,
            province:this.state.bankInfo.province,
            city:this.state.bankInfo.city,
            area:this.state.bankInfo.area,
            bank_branch_name:this.state.bankInfo.sub_branch_name,
        }
        // console.log(obj)
        Applymember(obj).then(res=>{
            if(res.code == 0){
                this.props.callBack('222');
            }
        }).catch(err =>{
            alert(err)
        })
    }
    render(){
        return(
            <Provider>
            <View style={styles.box}>
                <ScrollView>
                    <Text style={[styles.titles,styles.padd]}>身份信息</Text>
                    <View style={styles.cotBox}>
                        <View style={[styles.center,styles.lists]}>
                            <Text style={styles.title}>申请人姓名</Text>
                            <TextInput placeholder="输入姓名" style={styles.ipt} maxLength={10} value={this.state.nameVal} onChangeText={(value)=>{this.setState({nameVal: value})}}></TextInput>
                        </View>
                        <View style={[styles.center,styles.lists]}>
                            <Text style={styles.title}>申请人身份证号</Text>
                            <TextInput placeholder="输入身份证号" style={styles.ipt} maxLength={18} value={this.state.cardId} onChangeText={(value)=>{this.setState({cardId: value})}} keyboardType="numeric"></TextInput>
                        </View>
                        <View style={[styles.center,styles.lists]}>
                            <Text style={styles.title}>联系电话</Text>
                            <TextInput placeholder="输入联系电话" style={styles.ipt} maxLength={11} value={this.state.phoneVal} onChangeText={(value)=>{this.setState({phoneVal: value})}} keyboardType="numeric"></TextInput>
                        </View>
                        <UploadCard ref={(view)=>this.myImgs=view} imgList={this.state.cardImg} callBack={(m)=>{this.imgCaedUpload(m);}}/>
                    </View>
                    <Text style={[styles.titles,styles.padd,{marginTop:22}]}>银行卡信息</Text>
                    <View style={styles.cotBox}>
                        <Blank ref={(view)=>this.myCard=view} dtList={this.state.bankInfo} callBack={(m)=>{this.bankCard(m);}}/>
                    </View>
                    <Text style={[styles.tsh,styles.cotBox]}>*为确保资金安全，银行账户开户名称需与申请人姓名一致</Text>
                    <View style={styles.btnbox}>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.applyNowBtn.bind(this)}>
                                <Text style={styles.btn}>立即申请</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    btnbox:{
        paddingLeft:15,
        paddingRight:15,
        marginTop:52
    },
    btn:{
        height:44,
        backgroundColor:"#EE1122",
        color:"#fff",
        fontSize:18,
        borderRadius:8,
        marginBottom:17,
        textAlign:"center",
        lineHeight:44
    },
    tsh:{
        fontSize:10,
        color:'#999999',
        paddingTop:10.5
    },
    cotBox:{
        paddingLeft:15,
        paddingRight:15
    },
    box:{
        flex:1,
        backgroundColor:"#fff",
    },
    padd:{
        paddingLeft:15,
        paddingRight:15
    },
    titles:{
        fontSize:12,
        color:'#999999',
        paddingTop:14,
        paddingBottom:14,
        backgroundColor:"#F5F5F5",
    },
    center:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    title:{
        fontSize:15,
        color:"#333333"
    },
    ipt:{
        fontSize:15,
        textAlign:"right"
    },
    lists:{
        justifyContent:"space-between",
        borderBottomColor:"#E5E5E5",
        borderBottomWidth:1,
        paddingTop:5,
        paddingBottom:5
    },
})