import React,{Component} from "react"
import {View,Text,StyleSheet,TouchableOpacity,TextInput,ScrollView,Image, Alert} from "react-native"
import UploadCard from "./uploadCard"          //身份证
import Blank from "./blank"          //银行卡信息
import ImagePicker from "react-native-image-picker"
import {Decrypt,Encrypt} from "../../http/util/secret"
import { Applymember,ApplymemberInfo } from "../../http/urlApi";
import AsyncStorage from '@react-native-community/async-storage';
import {
    Provider,
    Toast
  } from '@ant-design/react-native';

const photoOptions = {
    title: '请选择',
    takePhotoButtonTitle:"拍照",
    cancelButtonTitle:"取消",
    chooseFromLibraryButtonTitle:"选择相册",
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
export default class Merchant extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardImg:{},
            message:[{tit:"商户简称",type:"co_merch_simple_name",plader:"请输入简称（收款时展示的简称）"},{tit:"客服电话",type:"co_custom_phone",plader:"请填写客服或业务联系人手机号"},
                     {tit:"营业执照范围",type:"co_business_license_area",plader:"请按照营业执照经营范围准确填写"},{tit:"商户名称",type:"co_merch_name",plader:"请输入简称（与营业执照一致）"},
                     {tit:"注册地址",type:"co_merch_address",plader:"请输入地址（与营业执照一致）"}
                    ],            //商户信息视图数据
            mechatArr:[{tit:"店内内景照",id:"co_shop_inside_icon"},{tit:"收银台照",id:"co_shop_plat_icon"},{tit:"法人手持营业执照在门口的照片",id:"co_shop_legal_icon"},
                       {tit:"营业执照悬挂店内照",id:"co_shop_license_icon"}],   //商户信息上传图片视图数据
            bankType:["对公账户","个体或法人账户"],           //银行卡信息类型
            allData:{
                co_realname:"",                   //法人姓名
                co_id_card:"",                   //法人身份证号
                co_phone:"",                   //法人电话
                co_email:"",                   //法人邮箱
                co_merch_simple_name:"",         //商户简介
                co_custom_phone:"",              //客户电话
                co_business_license_area:"",           //经营范围
                co_merch_name:"",               //商户名称
                co_merch_address:"",              //注册地址

                co_business_license_icon:"",
                co_shop_head_icon:[],
                co_shop_head_icon_id:[],
                co_shop_inside_icon:"",        //风景照
                co_shop_plat_icon:"",          //收银台照
                co_shop_legal_icon:"",            //法人手持营业执照在门口的照片
                co_shop_license_icon:"",            //营业执照悬挂店内照
                co_account_type:0,             //银行卡账户类型
            },
            bankInfo:{}
        }
        this.getMessageView = this.getMessageView.bind(this)
        this.getMecharView = this.getMecharView.bind(this)
    }
    UNSAFE_componentWillMount(){
        AsyncStorage.getItem('token').then((item)=>{
            ApplymemberInfo({token:item}).then(res=>{
                res = JSON.parse(res)
                // console.log(res)
                if(res.code == 0){
                    if(res.data.info_type == 2){
                        let arr = [];
                        let arrId = [];
                        res.data.co_shop_head_icon_src.forEach(item => {
                            arr.push(item.icon_src);
                            arrId.push(item.icon);
                        });
                        this.setState({
                            allData:{
                                co_realname:res.data.co_realname,
                                co_id_card:res.data.co_id_card,
                                co_phone:res.data.co_phone,
                                co_email:res.data.co_email,
                                co_merch_simple_name:res.data.co_merch_simple_name,
                                co_custom_phone:res.data.co_custom_phone,
                                co_business_license_area:res.data.co_business_license_area,
                                co_merch_name:res.data.co_merch_name,
                                co_merch_address:res.data.co_merch_address,
                                co_business_license_icon:res.data.co_business_license_icon_src,
                                co_shop_head_icon:arr,
                                co_shop_head_icon_id:arrId,
                                co_shop_inside_icon:res.data.co_shop_inside_icon_src,
                                co_shop_plat_icon:res.data.co_shop_plat_icon_src,
                                co_shop_legal_icon:res.data.co_shop_legal_icon_src,
                                co_shop_license_icon:res.data.co_shop_license_icon_src,
                                co_account_type:res.data.co_account_type,
                            },

                            cardImg:{
                                front_id_card:res.data.id_card_face_icon_src,
                                front_id_card_id:res.data.id_card_face_icon,
                                back_id_card:res.data.id_card_country_icon_src,
                                back_id_card_id:res.data.id_card_country_icon,
                            },
                            bankInfo:{
                                bankVal:res.data.bank_number,             //银行卡号
                                bank_name:res.data.bank_name,             //开户银行
                                sub_branch_name:res.data.bank_branch_name,             //开户支行
                                province:res.data.province,               //开户地址 省 地区代码
                                city:res.data.city,               //开户地址 市 地区代码
                                area:res.data.area,               //开户地址 区 地区代码
                                arr:[res.data.province_text,res.data.city_text,res.data.area_text]
                            },
                        })
                    }else{
                        this.setState({
                            allData:{
                                co_realname:'',
                                co_id_card:'',
                                co_phone:'',
                                co_email:'',
                                co_merch_simple_name:'',
                                co_custom_phone:'',
                                co_business_license_area:'',
                                co_merch_name:'',
                                co_merch_address:'',
                                co_business_license_icon:'',
                                co_shop_head_icon:[],
                                co_shop_head_icon_id:[],
                                co_shop_inside_icon:'',
                                co_shop_plat_icon:'',
                                co_shop_legal_icon:'',
                                co_shop_license_icon:'',
                                co_account_type:0,
                            },
                            cardImg:{
                                front_id_card:'',
                                front_id_card_id:'',
                                back_id_card:'',
                                back_id_card_id:'',
                            },
                            bankInfo:{
                                bankVal:'',             //银行卡号
                                bank_name:'',             //开户银行
                                sub_branch_name:'',             //开户支行
                                province:'',               //开户地址 省 地区代码
                                city:'',               //开户地址 市 地区代码
                                area:'',               //开户地址 区 地区代码
                                arr:[]
                            },
                        })

                    }
                    this.myCard.dtLists(this.state.bankInfo);
                    this.myImgs.imgLists(this.state.cardImg);
                }
            })
        })
    }
    changeMoney(m){
        this.setState({
            cardImg: m
        })
    }
    bankCard(m){
        this.setState({
            bankInfo:m
        })
    }
    getMessageView(){       //商户信息视图渲染
        let arr = []
        this.state.message.map((item,index)=>{
            arr.push(
                <View style={[styles.center,styles.lists]} key={index}>
                     <Text style={styles.title}>{item.tit}</Text>
                    <TextInput placeholder={item.plader} style={styles.ipt} maxLength={10}
                        value={this.state.allData[item.type]}
                        onChangeText={this.inputValue.bind(this,item.type)}
                    ></TextInput>
                </View>
            )
        });
        return arr;
    }
    inputValue(type,value){            //所有input数据双向绑定
        this.setState({
            allData:{
                ...this.state.allData,
                [type]:value
            }
        })
    }
    getMecharView(){             //渲染商户信息后部分上传图片视图
        let arr = [];
        this.state.mechatArr.map((item,index)=>{
            arr.push(
                <View style={[styles.imgsList,index!==this.state.mechatArr.length-1?(styles.bofrs):null]} key={index}>
                    <Text style={styles.uploadTxt}>{item.tit}</Text>
                    <View style={[styles.centers]}>
                            <TouchableOpacity activeOpacity={0.6} onPress={this.updatesImg.bind(this,1,item.id)}>
                            <View style={styles.imgbox}>
                                <Image source={require("../../../images/Icon_upload.png")} style={styles.imgbox}></Image>
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.allData[item.id]!==''?(
                                <View style={styles.imgbox}>
                                    <Image source={{uri:this.state.allData[item.id]}} style={styles.imgh}></Image>
                                    <TouchableOpacity activeOpacity={0.6} onPress={this.deletes.bind(this,item.id)}  style={styles.delet}>
                                        <Image source={require("../../../images/payment_failed.png")} style={styles.deimg}></Image>
                                    </TouchableOpacity>
                                </View>
                            ):null
                        }
                    </View>
                </View>
            )
        });
        return arr;
    }
    getBankTypeView(){             //银行卡信息  账户类型选择
        let arr = [];
        this.state.bankType.map((item,index)=>{
            arr.push(
                <TouchableOpacity activeOpacity={0.5}  key={index} onPress={()=>{this.setState({allData:{...this.state.allData,co_account_type:index}})}}>
                    <View style={[styles.centers,{marginLeft:28}]}>
                        {
                            this.state.allData.co_account_type==index?(
                                <Image source={require("../../../images/Icon_selected.png")} style={styles.icons}></Image>
                            ):(
                                <Image source={require("../../../images/Icon_notselected.png")} style={styles.icons}></Image>
                            )
                        }
                        <Text style={styles.iconTxt}>{item}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
        return arr;
    }
    deletes(_type){        //删除营业执照
        this.setState({
            allData:{
                ...this.state.allData,
                [_type]:""
            }
        })
    }
    updatesImg(type,names){         //上传营业执照            --type表示：1只能传一张图片  2多张图片，    names：变量  后端的字段
        let formData = new FormData();
        ImagePicker.showImagePicker(photoOptions,(response)=>{
          if(response.didCancel){
              return
          }
          if(type==1){
            let file = {uri: response.uri, type: 'multipart/form-data', name: response.fileName};   //这里的key(uri和type和name)不能改变,
            formData.append("file",file);   //这里的files就是后台需要的key
            this.uploadImg(response.uri,response.fileName,formData,names,1)
            return;
          }else{
              if(this.state.allData.co_shop_head_icon.length<2){
                let file = {uri: response.uri, type: 'multipart/form-data', name: response.fileName};   //这里的key(uri和type和name)不能改变,
                formData.append("file",file);   //这里的files就是后台需要的key
                this.uploadImg(response.uri,response.fileName,formData,names,2)
                // this.setState({
                //     allData:{
                //         ...this.state.allData,
                //         [names]:this.state.allData[names].concat(response.uri)
                //     }
                // })
              }else{
                Toast.info("最多上传两张",1,'',false)
              }
              return;
          }
      })
    }
    uploadImg(uri,fileName,formData,names,num){
        let file = {uri: uri, type: 'multipart/form-data', name: fileName};   //这里的key(uri和type和name)不能改变,
            formData.append("file",file);   //这里的files就是后台需要的key
            fetch('https://juheapp.mx5918.com/api/auth/upload',{
                method:'POST',
                headers:{
                'Content-Type':'multipart/form-data',
                },
                body:formData,
                })
                .then((response) => response.text() )
                .then((res)=>{
                    res = JSON.parse(Decrypt(res));
                    // console.log(res)
                    if(num == 1){
                        this.setState({
                            allData:{
                                ...this.state.allData,
                                [names+'_id']:res.data.id,
                                [names]:res.data.path
                            }
                        })
                    }else{
                        this.setState({
                            allData:{
                                ...this.state.allData,
                                // [names+'_id']:res.data.id,
                                // [names]:res.data.path,
                                [names+'_id']:this.state.allData[names+'_id'].concat(res.data.id),
                                [names]:this.state.allData[names].concat(res.data.path)
                            }
                        })
                    }
                })
                .catch((error)=>{error = JSON.parse(Decrypt(error));console.error('error',error)});
    }
    deletOuthImg(index){          //删除其他图片
        const arrs= this.state.allData.co_shop_head_icon
        arrs.splice(index,1);
        this.setState({
            allData:{
                ...this.state.allData,
                co_shop_head_icon:arrs
            }
        });
    }
    applyNowBtn(){
        let obj = {
            info_type:2,
            co_realname:this.state.allData.co_realname,
            co_id_card:this.state.allData.co_id_card,
            co_phone:this.state.allData.co_phone,
            co_email:this.state.allData.co_email,
            id_card_face_icon:this.state.cardImg.front_id_card_id,
            id_card_country_icon:this.state.cardImg.back_id_card_id,
            co_merch_simple_name:this.state.allData.co_merch_simple_name,
            co_custom_phone:this.state.allData.co_custom_phone,
            co_business_license_area:this.state.allData.co_business_license_area,
            co_merch_name:this.state.allData.co_merch_name,
            co_merch_address:this.state.allData.co_merch_address,
            co_business_license_icon:this.state.allData.co_business_license_icon_id,
            co_shop_head_icon:this.state.allData.co_shop_head_icon_id.join(','),
            co_shop_inside_icon:this.state.allData.co_shop_inside_icon_id,
            co_shop_plat_icon:this.state.allData.co_shop_plat_icon_id,
            co_shop_legal_icon:this.state.allData.co_shop_legal_icon_id,
            co_shop_license_icon:this.state.allData.co_shop_license_icon_id,
            co_account_type:this.state.allData.co_account_type,
            bank_number:this.state.bankInfo.bankVal,
            bank_name:this.state.bankInfo.bank_name,
            province:this.state.bankInfo.province,
            city:this.state.bankInfo.city,
            area:this.state.bankInfo.area,
            bank_branch_name:this.state.bankInfo.sub_branch_name,
        }
        // console.log(obj)
        Applymember(obj).then(res=>{
            // console.log(res)
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
                            <Text style={styles.title}>法人姓名</Text>
                            <TextInput placeholder="输入姓名" style={styles.ipt} maxLength={10}
                                value={this.state.allData.co_realname}
                                onChangeText={this.inputValue.bind(this,"co_realname")}
                            ></TextInput>
                        </View>
                        <View style={[styles.center,styles.lists]}>
                            <Text style={styles.title}>法人身份证号</Text>
                            <TextInput placeholder="输入身份证号" style={styles.ipt} maxLength={18}
                                 keyboardType="numeric"
                                value={this.state.allData.co_id_card}
                                onChangeText={this.inputValue.bind(this,"co_id_card")}
                            ></TextInput>
                        </View>
                        <View style={[styles.center,styles.lists]}>
                            <Text style={styles.title}>联系电话</Text>
                            <TextInput placeholder="输入联系电话" style={styles.ipt} maxLength={11}
                                keyboardType="numeric"
                                value={this.state.allData.co_phone}
                                onChangeText={this.inputValue.bind(this,"co_phone")}
                            ></TextInput>
                        </View>
                        <View style={[styles.center,styles.lists]}>
                            <Text style={styles.title}>法人联系邮箱</Text>
                            <TextInput placeholder="输入联系邮箱" style={styles.ipt}
                                keyboardType="email-address"
                                value={this.state.allData.co_email}
                                onChangeText={this.inputValue.bind(this,"co_email")}
                            ></TextInput>
                        </View>
                        <UploadCard ref={(view)=>this.myImgs=view} imgLists={this.state.cardImg} callBack={(m)=>{this.changeMoney(m);}}/>
                    </View>
                    <Text style={[styles.titles,styles.padd,{marginTop:22}]}>商户信息</Text>
                    <View style={styles.cotBox}>
                        {this.getMessageView()}
                        <View style={styles.imgsList}>
                            <Text style={styles.uploadTxt}>营业执照</Text>
                            <View style={[styles.centers]}>
                                 <TouchableOpacity activeOpacity={0.6} onPress={this.updatesImg.bind(this,1,"co_business_license_icon")}>
                                    <View style={styles.imgbox}>
                                        <Image source={require("../../../images/Icon_upload.png")} style={styles.imgbox}></Image>
                                    </View>
                                </TouchableOpacity>
                                {
                                    this.state.allData.co_business_license_icon!==''?(
                                        <View style={styles.imgbox}>
                                            <Image source={{uri:this.state.allData.co_business_license_icon}} style={styles.imgh}></Image>
                                            <TouchableOpacity activeOpacity={0.6} onPress={this.deletes.bind(this,'co_business_license_icon')}  style={styles.delet}>
                                                <Image source={require("../../../images/payment_failed.png")} style={styles.deimg}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    ):null
                                }
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.titles,styles.padd]}>商户信息</Text>
                    <View style={styles.cotBox}>
                        <View style={[styles.imgsList,styles.bofrs]}>
                            <Text style={styles.uploadTxt}>门头照（2张，包含门牌号、店名）</Text>
                            <View style={[styles.centers]}>
                                <TouchableOpacity activeOpacity={0.6} onPress={this.updatesImg.bind(this,2,"co_shop_head_icon")}>
                                    <View style={styles.imgbox}>
                                        <Image source={require("../../../images/Icon_upload.png")} style={styles.imgbox}></Image>
                                    </View>
                                </TouchableOpacity>
                                {
                                    this.state.allData.co_shop_head_icon.length!==0?(
                                        this.state.allData.co_shop_head_icon.map((item,index)=>{
                                            return(
                                                <View style={[styles.imgbox]} key={index}>
                                                    <Image source={{uri:item}} style={styles.imgh}></Image>
                                                    <TouchableOpacity activeOpacity={0.6} onPress={this.deletOuthImg.bind(this,index)}  style={styles.delet}>
                                                        <Image source={require("../../../images/payment_failed.png")} style={styles.deimg}></Image>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    ):null
                                }
                            </View>
                        </View>
                        {this.getMecharView()}
                    </View>
                    <View style={[styles.padd,styles.bankBox,styles.centers,{justifyContent:"space-between"}]}>
                         <Text style={[styles.titlesTwo]}>银行卡信息</Text>
                         <View style={styles.centers}>
                            {this.getBankTypeView()}
                         </View>
                    </View>
                    <View style={styles.cotBox}>
                         <Blank ref={(view)=>this.myCard=view} dtLists={this.state.bankInfo} callBack={(m)=>{this.bankCard(m);}}/>
                    </View>
                    <Text style={[styles.tsh,styles.cotBox]}>*如您是企业只能提供您的对公账户；如您是个体工商户可提供对公或法人账户</Text>
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
        paddingTop:10.5,
        backgroundColor:"blue"
    },
    cotBox:{
        paddingLeft:15,
        paddingRight:15
    },
    iconTxt:{
        fontSize:12,
        color:"#999999"
    },
    icons:{
        width:12,
        height:12,
        marginRight:5.5   
    },
    bofrs:{
        borderBottomColor:"#EEEEEE",
        borderBottomWidth:1
    },
    centers:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        flexWrap:"wrap"
    },
    uploadTxt:{
        fontSize:15,
        color:'#333333',
        marginBottom:19
    },
    deimg:{
        width:16,
        height:16.5,
    },
    delet:{
        width:16,
        height:16,
        position:"absolute",
        right:-8,
        top:-8,
        zIndex:999
    },
    imgh:{
        width:70,
        height:70,
        borderRadius:6
    },
    imgbox:{
        width:70,
        height:70,
        borderRadius:6,
        marginRight:10,
        position:'relative'
    },
    imgsList:{
        paddingTop:20,
        paddingBottom:20
    },
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
    bankBox:{
        paddingTop:14,
        paddingBottom:14,
        backgroundColor:"#F5F5F5",
        marginTop:5
    },
    titlesTwo:{
        fontSize:12,
        color:'#999999',
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