import React,{Component} from "react"
import {View,Text,StyleSheet,TouchableOpacity,Image} from "react-native"
import ImagePicker from "react-native-image-picker" 
import { imgUpload } from "../../http/urlApi";
import {Decrypt,Encrypt} from "../../http/util/secret"

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
export default class UploadCard extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            allData:{
                front_id_card:"",       //正面
                front_id_card_id:'',
                back_id_card:"",         //反面
                back_id_card_id:''
            },
        }
    }
    imgList(data){
        this.setState({
            allData:data
        })
    }
    imgLists(data){
        this.setState({
            allData:data
        })
    }
    upload(type){       //上传身份证
        this.props.callBack(this.state.allData);
        let formData = new FormData();
        ImagePicker.showImagePicker(photoOptions,(response)=>{
            if(response.didCancel){
                return
            }
            let file = {uri: response.uri, type: 'multipart/form-data', name: response.fileName};   //这里的key(uri和type和name)不能改变,
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
                    this.setState({
                        allData:{
                            ...this.state.allData,
                            [type+'_id']:res.data.id,
                            [type]:res.data.path
                        }
                    })
                    this.props.callBack(this.state.allData);
                })
                .catch((error)=>{error = JSON.parse(Decrypt(error));console.error('error',error)});
        })
    }
    deleImg(type){        //删除身份证
        this.setState({
            allData:{
                ...this.state.allData,
                [type+'_id']:'',
                [type]:""
            }
        })
        let obj = {
            ...this.state.allData,
            [type+'_id']:'',
            [type]:""
        }
        this.props.callBack(obj);
    }
    render(){
        return(
            <View>
                <View style={styles.cardBox}>
                        {/* <Text style={styles.card}>身份证照片</Text> onPress={this.dataCard.bind(this)} */}
                        <Text style={styles.card}>身份证照片</Text>
                        <View style={[styles.center,{justifyContent:"space-between"}]}>
                            {
                                this.state.allData.front_id_card==''?(
                                    <TouchableOpacity activeOpacity={0.6} onPress={this.upload.bind(this,'front_id_card')}>
                                            <Image source={require("../../../images/icon_card.png")} style={styles.cardImg}></Image>
                                    </TouchableOpacity>
                                ):(
                                    <View style={styles.cardImg}>
                                        <Image source={{uri:this.state.allData.front_id_card}} style={styles.cardImg}></Image>
                                        <TouchableOpacity activeOpacity={0.6} style={styles.dele}  onPress={this.deleImg.bind(this,'front_id_card')}>
                                            <Image source={require("../../../images/payment_failed.png")} style={styles.deles}></Image>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            {
                                this.state.allData.back_id_card==''?(
                                    <TouchableOpacity activeOpacity={0.6} onPress={this.upload.bind(this,'back_id_card')}>
                                            <Image source={require("../../../images/icon_card_back.png")} style={styles.cardImg}></Image>
                                    </TouchableOpacity>
                                ):(
                                    <View style={styles.cardImg}>
                                        <Image source={{uri:this.state.allData.back_id_card}} style={styles.cardImg}></Image>
                                        <TouchableOpacity activeOpacity={0.6} style={styles.dele}  onPress={this.deleImg.bind(this,'back_id_card')}>
                                            <Image source={require("../../../images/payment_failed.png")} style={styles.deles}></Image>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    dele:{
        position:'absolute',
        right:-5,
        top:-5,
        width:20,
        height:20
    },
    deles:{
        width:20,
        height:20.5
    },
    cardImg:{
        width:150.05,
        height:116,
        borderRadius:6,
        position:"relative"
    },
    card:{
        fontSize:15,
        color:'#333333',
        marginBottom:17
    },
    cardBox:{
        marginTop:24
    },
})