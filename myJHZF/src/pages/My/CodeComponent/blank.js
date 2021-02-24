import React,{Component} from "react"
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Image,Dimensions} from "react-native"
import Modules from "./modules"               //弹窗
import ModulesItems from "./modulesItem"               //弹窗
import {authConfig,Branchbank} from "../../http/urlApi"         //请求
import CityPicker from "../../../components/cityPicker"         //地址
var {height,width} =  Dimensions.get('window');

export default class Blank extends Component{
    constructor(props){
        super(props);
        this.state = {
            objData:{},
            alldata:{
                bankVal:'',             //银行卡号
                bank_name:"",             //开户银行
                sub_branch_name:"",             //开户支行
                province:"",               //开户地址 省 地区代码
                city:"",               //开户地址 市 地区代码
                area:"",               //开户地址 区 地区代码
            },
            cityName:"",             //城市数据
            seleed:["北京","北京市","东城区"],       //暂存的城市数据
            modelData:[],
            modelDataItem:[],
            moduleTitle:"开户银行",
            subbranchTitle:"开户支行",
            relationshipIndex:-1
        }
    }
    // 地址
    check(){           //打开选择地址弹窗
        this.childListss.openPicker(this.state.seleed) 
    }
    confirm(data,id){     //选中后的数据
        this.setState({
            seleed:data,
            cityName:data.join(",").replace(/,/g,"/"),
            alldata:{
                ...this.state.alldata,
                province:id[0],
                city:id[1],
                area:id[2]
            }
        })
        this.props.callBack(this.state.alldata);
    }
    UNSAFE_componentWillMount(){
        this.getBankData();
        
    }
    dataList(data){          //打开弹窗
        this.setState({
            alldata:data,
            seleed:data.arr,
            cityName:data.arr.join(",").replace(/,/g,"/"),
        })
        // console.log(this.state.alldata)
        // this.setState({subbranchVisible:true,check:sub_branch_name});
    }
    dtLists(data){          //打开弹窗
        this.setState({
            alldata:data,
            seleed:data.arr,
            cityName:data.arr.join(",").replace(/,/g,"/"),
        })
        // console.log(this.state.alldata)
        // this.setState({subbranchVisible:true,check:sub_branch_name});
    }
    // 开户银行
    getBankData(){
        authConfig('').then((res)=>{
            var data = JSON.parse(res)
            if(data.code==0){
                this.setState({
                    modelData:data.data.banks 
                })
            }
        })
    }
    checkBank(){           //打开开户银行弹窗
        this.childLists.childOpen(this.state.alldata.bank_name)          //传值是为了保留数据
    }
    checkType(item){         //选择开户银行
        this.setState({
            alldata:{
                ...this.state.alldata,
                bank_name:item.bank_name,
                bank_id:item.bank_id
            }
        })
        this.props.callBack(this.state.alldata);
    }
    // 开户支行
    getBranchData(name,province,city){
        Branchbank({bank_name:name,province:province,city:city,branch_name:''}).then((res)=>{
            res= JSON.parse(res)
            // console.log(res)
            if(res.code==0){
                this.setState({
                    objData:{
                        name:name,
                        province:province,
                        city:city,
                        modelDataItem:res.data 
                    },
                })
            }
        })
    }
    checkBankItems(){           //打开开户支行弹窗
        if(this.state.alldata.bank_name == ''){
            alert('请先选择开户银行')
        }else if(this.state.alldata.province == ''){
            alert('请先选择开户地址')
        }else{
            this.getBranchData(this.state.alldata.bank_name,this.state.seleed[0],this.state.seleed[1]);
            this.childListsItem.childOpen(this.state.alldata.sub_branch_name)          //传值是为了保留数据
        }
    }
    checkTypeItems(item){         //选择开户支行
        this.setState({
            alldata:{
                ...this.state.alldata,
                sub_branch_name:item.sub_branch_name,
                sub_branch_id:item.sub_branch_id
            }
        })
        this.props.callBack(this.state.alldata);
    }
    getVal(val){
        this.setState({
            alldata:{
                ...this.state.alldata,
                bankVal:val
            }
        })
        this.props.callBack(this.state.alldata)
    }
    sureNum(m){
        if(m == 111){
            this.props.callBack(this.state.alldata);
        }
    }
    render(){
        return(
            <View>
                <CityPicker
                    ref={(view)=>this.childListss=view}
                    confirm = {this.confirm.bind(this)}
                />
                <View style={[styles.center,styles.lists]}>
                    <Text style={styles.title}>银行卡号</Text>
                    <TextInput placeholder="输入卡号" style={styles.ipt} maxLength={10} value={this.state.alldata.bankVal} onChangeText={(value)=>{this.getVal(value);}}></TextInput>
                </View>
                <TouchableOpacity activeOpacity={0.6} onPress={this.checkBank.bind(this)}>
                    <View style={[styles.centers,styles.row,styles.border]}>
                        <Text style={styles.title}>开户银行</Text>
                            <View  style={[styles.centers]}>
                                <TextInput placeholder="选择银行" style={styles.ipt} editable={false}
                                multiline = {true}
                                keyboardType = {'default'}
                                value={this.state.alldata.bank_name}></TextInput>
                                <Image source={require("../../../images/ic_mores.png")} style={styles.rigIcon}></Image>
                            </View>
                    </View>
                </TouchableOpacity>
                <View style={[styles.centers,styles.row,styles.border]}>
                    <Text style={styles.title}>开户地址</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={this.check.bind(this)}>
                        <View  style={[styles.centers]}>
                            <TextInput placeholder="选择地址" style={styles.ipt} editable={false}
                            multiline = {true}
                            keyboardType = {'default'}
                            value={this.state.cityName}></TextInput>
                            <Image source={require("../../../images/ic_mores.png")} style={styles.rigIcon}></Image>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.6} onPress={this.checkBankItems.bind(this)}>
                    <View style={[styles.centers,styles.row,styles.border]}>
                        <Text style={styles.title}>开户支行</Text>
                            <View  style={[styles.centers]}>
                                <TextInput placeholder="开户支行" style={styles.ipt} editable={false}
                                multiline = {true}
                                keyboardType = {'default'}
                                value={this.state.alldata.sub_branch_name}></TextInput>
                                {/* <Image source={require("../../../images/ic_mores.png")} style={styles.rigIcon}></Image> */}
                            </View>
                    </View>
                </TouchableOpacity>
                <Modules title={this.state.moduleTitle} ref={(view)=>this.childLists=view} data={this.state.modelData} checkType={this.checkType.bind(this)}/>
                <ModulesItems title={this.state.subbranchTitle} ref={(view)=>this.childListsItem=view} callBack={(m)=>{this.sureNum(m);}} data={this.state.objData} checkType={this.checkTypeItems.bind(this)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    border:{
        borderBottomColor:"#E6E6E6",
        borderBottomWidth:1
    },
    rigIcon:{
        width:10.5,
        height:16
    },
    ipt:{
        fontSize:15,
        textAlign:"right",
        color:"#333",
        maxWidth:230
    },
    centers:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    row:{
        justifyContent:"space-between",
        paddingTop:5,
        paddingBottom:5
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
    lists:{
        justifyContent:"space-between",
        borderBottomColor:"#E5E5E5",
        borderBottomWidth:1,
        paddingTop:5,
        paddingBottom:5
    },
})