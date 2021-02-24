import React, { Component } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Image,ScrollView,TextInput} from "react-native"
import {
    Modal,
  } from '@ant-design/react-native';
  import {Branchbank} from "../../http/urlApi"         //请求
  var {width} =  Dimensions.get('window');

class modulesItems extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            subbranchVisible:false,
            searchVal:'',
            arr:[],
            check:-1,
            dataList:this.props.data.modelDataItem
        }
        this.getListView = this.getListView.bind(this)
    }
    check(item){
        this.setState({
            check:item.sub_branch_name
        })
        this.props.checkType(item)
    }
    childOpen(sub_branch_name){          //打开弹窗
        this.setState({subbranchVisible:true,check:sub_branch_name});
    }
    searchBtn(){
        // console.log(this.state.searchVal)
        if(this.props.data.modelDataItem){
            Branchbank({bank_name:this.props.data.name,province:this.props.data.province,city:this.props.data.city,branch_name:this.state.searchVal}).then((res)=>{
                res= JSON.parse(res)
                // console.log(res)
                if(res.code==0){
                    this.setState({
                        dataList :res.data
                    })
                    this.getListView()
                }
            })
        }
    }
    getListView(){
        var list = [];
        if(this.props.data.modelDataItem){
            let arr = this.props.data.modelDataItem;
            if(this.state.dataList){
                arr = this.state.dataList;
            }
            if(arr.length > 0){
                arr.map((item,index)=>{
                    list.push(
                        <TouchableOpacity activeOpacity={0.6}  key={index} onPress={this.check.bind(this,item)}>
                            <View style={[styles.centers,styles.list]}>
                                <Text style={styles.txt}>{item.sub_branch_name}</Text>
                                {
                                    this.state.check==item.sub_branch_name?(
                                        <Image source={require("../../../images/Icon_selected.png")} style={styles.icon}></Image>
                                    ):(
                                        <Image source={require("../../../images/Icon_notselected.png")} style={styles.icon}></Image>
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    )
                });
            }else{
                list.push(
                    <TouchableOpacity activeOpacity={0.6}  key={-1}>
                        <View style={[styles.nullVal]}>
                            <Text style={styles.txt,styles.textNull}>暂无数据</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        }
        return list;
    }
    render() { 
        return (  
            <Modal
                popup
                visible={this.state.subbranchVisible}
                animationType="slide-up"
                style={styles.models}
                >
                <View style={styles.headers}>
                    <Text style={{width:20}}></Text>
                     <Text style={styles.texts}>{this.props.title}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.setState({subbranchVisible:false});}}>
                        <Image source={require("../../../images/payment_failed.png")} style={[styles.close]}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.search}>
                    <Text style={{width:20}}></Text>
                    <TextInput style={styles.inputMain} placeholder='请输入支行名称' onChangeText={(value)=>{this.setState({searchVal: value})}}></TextInput>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.searchBtn.bind(this)}>
                        <Text>搜索</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.boxs]}>
                    <ScrollView style={{maxHeight:200}}>
                        {this.getListView()}
                    </ScrollView>
                    <TouchableOpacity activeOpacity={0.5} style={{paddingRight:14,paddingLeft:14,paddingTop:4}}>
                        <Text style={styles.btns}  onPress={()=>{this.setState({subbranchVisible:false});this.props.callBack('111');}}>确定</Text>
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
        width:'80%',
        fontSize:14,
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
        marginTop:20
    },
    models:{
        width:width,
        maxHeight:400,
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
    search:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingTop:20,
        paddingRight:30
    },
    inputMain:{
        width:'70%',
        borderWidth:1,
        borderColor:'#eee',
        borderRadius:40,
        paddingLeft:20,
        paddingRight:20,
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
    },
    nullVal:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    textNull:{
        textAlign:'center',
        marginBottom:20
    }
})

export default modulesItems;